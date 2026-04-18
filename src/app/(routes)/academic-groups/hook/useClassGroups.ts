"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";

const fetcher = async (url: string) => {
  const { data } = await apiClient.get<PaginatedData<ClassGroup>>(url);
  return data;
};

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
      router.push(`/academic-groups/${group.id}/edit?mode=${type}`); // ← /edit
    },
    [router],
  );

  // URL dinámica
  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));

    if (term) params.set("term", term);
    if (semester) params.set("semester", semester);
    if (subject) params.set("subject", subject);
    return `/class-groups?${params.toString()}`;
  }, [page, limit, term, semester, subject]);

  const { data, isLoading, isValidating, mutate } = useSWR(url, fetcher);

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

      isLoading: !data && (isLoading || isValidating),
      isFetching: isValidating,
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
      isLoading,
      isValidating,
    ],
  );
}
