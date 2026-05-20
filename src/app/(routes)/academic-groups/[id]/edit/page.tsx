"use client";

import { FormAcademicGroups } from "../../components/FormAcademicGroup";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";
import { apiClient } from "@/lib/api/api_client";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FormSkeleton } from "@/components/shared/FormSkeleton";
import { ManagementHeader } from "@/components/shared/ ManagementHeader";

export default function UpdateAcademicGroupPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const { data: classGroup, isLoading } = useQuery<ClassGroup>({
    queryKey: ["class-group", id],
    queryFn: async () => {
      const { data } = await apiClient.get<ClassGroup>(`/class-groups/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) return <FormSkeleton fields={6} />;

  return (
    <div>
      <ManagementHeader
        title="Actualizar Grupo academico"
        description="Actualiza la informacion de un grupo de clase "
        backHref="/academic-groups"
      />

      <div className="pl-10 pr-10">
        <FormAcademicGroups classGroup={classGroup} mode={mode} />
      </div>
    </div>
  );
}
