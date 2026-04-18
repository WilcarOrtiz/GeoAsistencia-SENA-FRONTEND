"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { FormAcademicGroups } from "../../components/FormAcademicGroup";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";
import { apiClient } from "@/lib/api/api_client";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { FormSkeleton } from "@/components/shared/FormSkeleton";

const fetcher = async (url: string) => {
  const { data } = await apiClient.get<ClassGroup>(url);
  return data;
};

export default function UpdateAcademicGroupPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { data: classGroup, isLoading } = useSWR(
    `/class-groups/${id}`,
    fetcher,
  );

  if (isLoading) return <FormSkeleton fields={6} />;

  return (
    <div className="container mx-auto pt-4">
      <PageHeader
        title="Actualizar Grupo academico"
        description="Actualiza la informacion de un grupo de clase "
        backHref="/academic-groups"
      />
      <div className="container mx-auto py-10 ">
        <FormAcademicGroups classGroup={classGroup} mode={mode} />
      </div>
    </div>
  );
}
