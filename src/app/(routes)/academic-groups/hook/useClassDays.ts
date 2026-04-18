import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/api_client";
import { ClassDay } from "@/features/classGroup/ClassGroup.type";

export function useClassSchedules(grupoId: string) {
  const [schedules, setSchedules] = useState<ClassDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<ClassDay[]>(`/class-days/group/${grupoId}`)
      .then((res) => setSchedules(res.data))
      .finally(() => setLoading(false));
  }, [grupoId]);

  return { schedules, loading };
}
