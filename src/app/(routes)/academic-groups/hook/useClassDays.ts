import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api_client";
import { ClassDay } from "@/features/classGroup/ClassGroup.type";

export function useClassSchedules(grupoId: string) {
  const { data, isLoading } = useQuery<ClassDay[]>({
    queryKey: ["class-days", grupoId],
    queryFn: async () => {
      const res = await apiClient.get<ClassDay[]>(
        `/class-days/group/${grupoId}`,
      );
      return res.data;
    },
    enabled: !!grupoId,
  });

  return {
    schedules: data ?? [],
    loading: isLoading,
  };
}
