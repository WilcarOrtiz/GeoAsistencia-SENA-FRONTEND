"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api_client";
import {
  AttendanceDistribution,
  DashboardFilters,
  DashboardOverview,
  GroupAttendance,
  StudentAbsence,
  SubjectRanking,
} from "@/features/dashboard/dashboard.types";

function buildParams(filters: DashboardFilters) {
  const params = new URLSearchParams();

  if (filters.semesterId) params.set("semesterId", filters.semesterId);
  if (filters.teacherId) params.set("teacherId", filters.teacherId);
  if (filters.subjectId) params.set("subjectId", filters.subjectId);
  if (filters.limit) params.set("limit", String(filters.limit));

  return params.toString();
}

export function useDashboard(isAdmin: boolean) {
  const [filters, setFilters] = useState<DashboardFilters>({});

  const handleSemesterFilter = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      semesterId: value === "all" ? undefined : value,
    }));
  }, []);

  const handleTeacherFilter = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      teacherId: value === "all" ? undefined : value,
    }));
  }, []);

  const handleSubjectFilter = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      subjectId: value === "all" ? undefined : value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Overview
  const overviewQuery = useQuery<DashboardOverview>({
    queryKey: ["dashboard", "overview", isAdmin, filters],
    queryFn: async () => {
      const path = isAdmin
        ? `/dashboard/admin/overview?${buildParams(filters)}`
        : "/dashboard/teacher/overview";

      const { data } = await apiClient.get<DashboardOverview>(path);

      return data;
    },
  });

  // Asistencia por grupo
  const attendanceQuery = useQuery<GroupAttendance[]>({
    queryKey: ["dashboard", "attendance", isAdmin, filters],
    queryFn: async () => {
      const path = isAdmin
        ? `/dashboard/admin/attendance?${buildParams(filters)}`
        : "/dashboard/teacher/attendance";

      const { data } = await apiClient.get<GroupAttendance[]>(path);

      return data;
    },
  });

  // Distribución de asistencia
  const distributionQuery = useQuery<AttendanceDistribution[]>({
    queryKey: ["dashboard", "distribution", isAdmin, filters],
    queryFn: async () => {
      const path = isAdmin
        ? `/dashboard/admin/distribution?${buildParams(filters)}`
        : "/dashboard/teacher/distribution";

      const { data } = await apiClient.get<AttendanceDistribution[]>(path);

      return data;
    },
  });

  // Ranking (admin -> materias, docente -> grupos)
  const subjectsRankingQuery = useQuery<SubjectRanking[]>({
    queryKey: ["dashboard", "ranking", isAdmin, filters],
    queryFn: async () => {
      const path = isAdmin
        ? `/dashboard/admin/subjects-ranking?${buildParams(filters)}`
        : "/dashboard/teacher/groups-ranking";

      const { data } = await apiClient.get<SubjectRanking[]>(path);

      return data;
    },
  });

  // Estudiantes con más ausencias
  const studentsAbsencesQuery = useQuery<StudentAbsence[]>({
    queryKey: ["dashboard", "students-absences", isAdmin, filters],
    queryFn: async () => {
      const path = isAdmin
        ? `/dashboard/admin/students-absences?${buildParams(filters)}`
        : "/dashboard/teacher/students-absences";

      const { data } = await apiClient.get<StudentAbsence[]>(path);

      return data;
    },
  });

  const isLoading =
    overviewQuery.isLoading ||
    attendanceQuery.isLoading ||
    distributionQuery.isLoading ||
    subjectsRankingQuery.isLoading ||
    studentsAbsencesQuery.isLoading;

  return useMemo(
    () => ({
      overview: overviewQuery.data,
      attendance: attendanceQuery.data ?? [],
      distribution: distributionQuery.data ?? [],
      subjectsRanking: subjectsRankingQuery.data ?? [],
      studentsAbsences: studentsAbsencesQuery.data ?? [],

      isLoading,

      filters,
      handleSemesterFilter,
      handleTeacherFilter,
      handleSubjectFilter,
      resetFilters,
    }),
    [
      overviewQuery.data,
      attendanceQuery.data,
      distributionQuery.data,
      subjectsRankingQuery.data,
      studentsAbsencesQuery.data,
      isLoading,
      filters,
      handleSemesterFilter,
      handleTeacherFilter,
      handleSubjectFilter,
      resetFilters,
    ],
  );
}
