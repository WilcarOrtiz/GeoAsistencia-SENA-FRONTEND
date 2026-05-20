"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api_client";

export interface SessionStudent {
  id: string;
  name: string;
}

export interface SessionAttendance {
  id: string;
  status: string;
  check_in_time: string | null;
  student: SessionStudent;
}

export function useSessionAttendances(sessionId?: string): {
  attendances: SessionAttendance[];
  isLoading: boolean;
  error: unknown;
} {
  const { data, isLoading, error } = useQuery<SessionAttendance[]>({
    queryKey: ["session-attendances", sessionId],

    queryFn: async () => {
      if (!sessionId) return [];

      const { data } = await apiClient.get<SessionAttendance[]>(
        `/class-sessions/${sessionId}/attendances`,
      );

      return data;
    },

    enabled: !!sessionId,
  });

  return {
    attendances: data ?? [],
    isLoading,
    error,
  };
}
