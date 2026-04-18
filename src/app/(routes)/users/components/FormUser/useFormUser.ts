import { useRoles } from "@/hooks/ApiList";
import { FormUserProps } from "./FormUser.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";
import { mutate } from "swr";
import { useState } from "react";

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

export function useUserForm(user: FormUserProps["user"]) {
  const router = useRouter();
  const isEditing = !!user;

  const { data: roles, loading } = useRoles();

  const [roleIds, setRoleIds] = useState<string[]>(
    user?.roles?.map((r) => r.id) ?? [],
  );

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
      if (isEditing) {
        const promises: Promise<unknown>[] = [];

        promises.push(
          apiClient.patch(`/user/${user.auth_id}`, {
            ID: values.ID,
            first_name: values.first_name,
            middle_name: values.middle_name,
            last_name: values.last_name,
            second_last_name: values.second_last_name,
            email: values.email,
          }),
        );

        const originalRoleIds = user.roles.map((r) => r.id).sort();
        const newRoleIds = [...roleIds].sort();
        const rolesChanged =
          JSON.stringify(originalRoleIds) !== JSON.stringify(newRoleIds);

        if (rolesChanged) {
          promises.push(
            apiClient.patch(`/user/${user.auth_id}/roles`, {
              rolesID: roleIds,
            }),
          );
        }

        await Promise.all(promises);

        toast.success("Usuario actualizado correctamente", {
          position: "top-center",
        });
      } else {
        await apiClient.post("/user", values);
        toast.success("Usuario creado correctamente", {
          position: "top-center",
        });
      }

      mutate((key) => typeof key === "string" && key.startsWith("/user"));
      router.push("/users");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Opps, algo anda mal";
        toast.error(message, { position: "top-center" });
      }
    }
  };

  return { form, onSubmit, isEditing, roles, roleIds, setRoleIds };
}
