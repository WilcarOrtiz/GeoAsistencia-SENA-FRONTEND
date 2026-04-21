"use client";

import { Formuser } from "../components/FormUser";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api/api_client";
import { User } from "@/features/User/user.type";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormSkeleton } from "@/components/shared/FormSkeleton";

export default function UpdateUserPage() {
  const { id } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/user/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) return <FormSkeleton fields={6} />;

  return (
    <div className="container mx-auto pt-4">
      <PageHeader
        title="Edicion de Usuarios"
        description="Actualiza la informacion de un usuario del sistema, incluyendo sus roles"
        backHref="/users"
      />
      <div className="container mx-auto py-10">
        <Formuser user={user} />
      </div>
    </div>
  );
}
