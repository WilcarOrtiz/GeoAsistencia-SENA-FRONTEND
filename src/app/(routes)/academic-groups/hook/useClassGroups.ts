"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";

export function useAcademicGroup(limit = 10) {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [termInput, setTermInput] = useState("");
  const [term, setTerm] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setTerm(value.trim());
    setPage(1);
  }, 500);

  const handleSearch = useCallback(
    (value: string) => {
      setTermInput(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleSemesterFilter = useCallback((value: string) => {
    setSemester(value === "all" ? "" : value);
    setPage(1);
  }, []);

  const handleSubjectFilter = useCallback((value: string) => {
    setSubject(value === "all" ? "" : value);
    setPage(1);
  }, []);

  const handleEdit = useCallback(
    (group: ClassGroup, type: "basic" | "schedule") => {
      router.push(`/academic-groups/${group.id}/edit?mode=${type}`);
    },
    [router],
  );

  const handleDetails = useCallback(
    (group: ClassGroup) => {
      router.push(`/academic-groups/${group.id}/details`);
    },
    [router],
  );

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (term) params.set("term", term);
    if (semester) params.set("semester", semester);
    if (subject) params.set("subject", subject);
    return params;
  }, [page, limit, term, semester, subject]);

  const { data, isLoading, isFetching } = useQuery<PaginatedData<ClassGroup>>({
    queryKey: ["academic-groups", page, limit, term, semester, subject],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedData<ClassGroup>>(
        `/class-groups?${queryParams.toString()}`,
      );
      return data;
    },
  });

  const handleCreate = useCallback(() => {
    router.push("/academic-groups/create");
  }, [router]);

  return useMemo(
    () => ({
      groups: data?.data ?? [],
      total: data?.total ?? 0,

      page,
      limit,
      setPage,

      termInput,
      semester,
      subject,
      handleSearch,
      handleSemesterFilter,
      handleSubjectFilter,

      handleCreate,
      handleEdit,
      handleDetails,

      isLoading: isLoading && !data,
      isFetching,
    }),
    [
      data,
      page,
      limit,
      termInput,
      semester,
      subject,
      handleSearch,
      handleSemesterFilter,
      handleSubjectFilter,
      handleCreate,
      handleEdit,
      handleDetails,
      isLoading,
      isFetching,
    ],
  );
}
