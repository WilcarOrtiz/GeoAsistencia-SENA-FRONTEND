import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api_client";
import { SemesterBasic } from "@/features/semester/semester.type";
import { Subject } from "@/features/subject/subject.type";
import { teacher } from "@/features/User/user.type";
import { Role } from "@/features/roleAndPermission/roleAndPermission.type";
import { ClassGroupOption } from "@/features/classGroup/ClassGroup.type";

const fetcher = <T>(url: string): Promise<T> =>
  apiClient.get<T>(url).then((res) => res.data);

export function useApiList<T>(url: string) {
  const { data, error, isLoading } = useQuery<T[]>({
    queryKey: [url],
    queryFn: () => fetcher<T[]>(url),
  });

  return {
    data: data ?? [],
    loading: isLoading,
    error,
  };
}

export const useSemesters = (type: "select" | "filter" = "select") =>
  useApiList<SemesterBasic>(`/semester/all?type=${type}`);

export const useSubject = () => useApiList<Subject>("/subjects/all");

export const useTeacher = () => useApiList<teacher>("/teacher/all-active");

export const useRoles = () => useApiList<Role>("/role");

export const useClassGroupTransferOptions = (id: string) =>
  useApiList<ClassGroupOption>(`/class-groups/${id}/transfer-options`);
