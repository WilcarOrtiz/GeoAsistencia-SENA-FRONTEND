"use client";

import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";
import { FormUserProps } from "./FormUser.type";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { useRoles } from "@/hooks/userRoles";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  ROLE_LABELS,
  RoleSystem,
} from "@/features/roleAndPermission/role.constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  ID: z
    .string()
    .regex(
      /^\d{8,11}$/,
      "El ID debe ser numérico y tener entre 8 y 11 dígitos",
    ),
  first_name: z.string().min(1, "Requerido").max(15),
  middle_name: z.string().max(15).optional().or(z.literal("")),
  last_name: z.string().min(1, "Requerido").max(15),
  second_last_name: z.string().max(15).optional().or(z.literal("")),
  email: z.string().email("Correo inválido"),
  rolesID: z.array(z.string()),
});

export function Formuser({ user }: FormUserProps) {
  const isEditing = !!user;
  const { roles, loading: loadingRoles } = useRoles();

  const [roleIds, setRoleIds] = useState<string[]>(
    user?.roles?.map((r) => r.id) ?? [],
  );
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: user?.ID_user ?? "",
      first_name: user?.first_name ?? "",
      middle_name: user?.middle_name ?? "",
      last_name: user?.last_name ?? "",
      second_last_name: user?.second_last_name ?? "",
      email: user?.email ?? "",
      rolesID: user?.roles?.map((r) => r.id) ?? [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = isEditing
        ? await apiClient.patch(`/users/${user.auth_id}`, values)
        : await apiClient.post("/user", values);

      if (res.ok) {
        toast.success(res.message);
        mutate((key) => typeof key === "string" && key.startsWith("/user"));
        router.push("/users");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(values);
        const message = error.response?.data?.message ?? "Opps, algo anda mal";
        toast.error(message, { position: "top-center" });
      }
    }
  };

  return (
    <F.Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Card className="border border-muted-foreground/20">
              <CardHeader>
                <CardTitle>Información del usuario</CardTitle>
                <CardDescription>
                  Completa los datos del usuario
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {" "}
                  <F.FormField
                    control={form.control}
                    name="ID"
                    render={({ field }) => (
                      <F.FormItem>
                        <F.FormLabel>Identificación</F.FormLabel>
                        <F.FormControl>
                          <Input placeholder="Ej: 12345678" {...field} />
                        </F.FormControl>
                        <F.FormDescription>
                          Ingrese el número de identificación del usuario
                        </F.FormDescription>
                        <F.FormMessage />
                      </F.FormItem>
                    )}
                  />
                </div>

                <F.FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormLabel>Primer nombre</F.FormLabel>
                      <F.FormControl>
                        <Input placeholder="Ej: Juan" {...field} />
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />

                <F.FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormLabel>
                        Segundo nombre{" "}
                        <span className="text-muted-foreground">
                          (opcional)
                        </span>
                      </F.FormLabel>
                      <F.FormControl>
                        <Input placeholder="Ej: Carlos" {...field} />
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />

                <F.FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormLabel>Primer apellido</F.FormLabel>
                      <F.FormControl>
                        <Input placeholder="Ej: García" {...field} />
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />

                <F.FormField
                  control={form.control}
                  name="second_last_name"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormLabel>
                        Segundo apellido{" "}
                        <span className="text-muted-foreground">
                          (opcional)
                        </span>
                      </F.FormLabel>
                      <F.FormControl>
                        <Input placeholder="Ej: López" {...field} />
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />
                <div className="sm:col-span-2">
                  {" "}
                  <F.FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <F.FormItem>
                        <F.FormLabel>Correo electrónico</F.FormLabel>
                        <F.FormControl>
                          <Input
                            placeholder="Ej: juan@correo.com"
                            type="email"
                            {...field}
                          />
                        </F.FormControl>
                        <F.FormMessage />
                      </F.FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="sm:col-span-2">
            <Card className="border border-muted-foreground/20">
              <CardHeader>
                <CardTitle>Roles</CardTitle>
                <CardDescription>
                  Asígnale uno o varios roles al usuario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {roles.map((role) => {
                    const checked = roleIds.includes(role.id);
                    return (
                      <label
                        key={role.id}
                        className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 border transition
                ${checked ? "bg-primary/10 border-primary" : "hover:bg-muted"}`}
                      >
                        <Checkbox
                          checked={roleIds.includes(role.id)}
                          onCheckedChange={(value) => {
                            let newRoleIds: string[];
                            if (value) {
                              newRoleIds = [...roleIds, role.id];
                            } else {
                              newRoleIds = roleIds.filter(
                                (id) => id !== role.id,
                              );
                            }
                            setRoleIds(newRoleIds);

                            form.setValue("rolesID", newRoleIds);
                          }}
                        />
                        <span className="text-sm">
                          {ROLE_LABELS[role.name as RoleSystem]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botón centrado y más ancho */}
        <div className="flex justify-center mt-6">
          <Button type="submit" className="w-full sm:w-auto">
            Guardar
          </Button>
        </div>
      </form>
    </F.Form>
  );
}

//TODO: Agregar el action para activar o desactivar user.
//  agregar para envioar correo de recuperacion de cuenta.
