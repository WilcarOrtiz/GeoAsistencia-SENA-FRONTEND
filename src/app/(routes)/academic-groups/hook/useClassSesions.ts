"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api_client";

export interface ClassSession {
  id: string;
  class_topic: string;
  date: string;
  is_open: boolean;
  attendance_opened_at: string;
  attendance_closed_at: string;
  total_students: number;
  total_present: number;
}

export function useClassSessions(groupId?: string): {
  sessions: ClassSession[];
  isLoading: boolean;
  error: unknown;
} {
  const { data, isLoading, error } = useQuery<ClassSession[]>({
    queryKey: ["class-sessions", groupId],
    queryFn: async () => {
      if (!groupId) return [];
      const { data } = await apiClient.get<ClassSession[]>(
        `/class-sessions/group/${groupId}`,
      );
      return data;
    },
    enabled: !!groupId,
  });

  return {
    sessions: data ?? [],
    isLoading,
    error,
  };
}
