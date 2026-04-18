"use client";

import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormUserProps } from "./FormUser.type";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useUserForm } from "./useFormUser";

export function Formuser({ user }: FormUserProps) {
  const { form, onSubmit, roles, roleIds, setRoleIds } = useUserForm(user);
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
