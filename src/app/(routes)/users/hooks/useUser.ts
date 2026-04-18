"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import useSWR from "swr";
import { User } from "@/features/User/user.type";
import { useDebouncedCallback } from "use-debounce";
import { sendRecoveryEmail } from "@/actions/auth/auth";
import { toast } from "sonner";

const fetcher = async (url: string) => {
  const { data } = await apiClient.get<PaginatedData<User>>(url);
  return data;
};

export function useUsers(limit = 10) {
  const router = useRouter();
  const [page, setPage] = useState(1);

  //  Estados de filtros
  const [emailInput, setEmailInput] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");

  //  URL dinámica con los filtros
  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (email) params.set("email", email);
    if (role) params.set("role", role);
    if (isActive) params.set("is_active", isActive);
    const built = `/user?${params.toString()}`;
    console.log("URL generada:", built);
    return `/user?${params.toString()}`;
  }, [page, limit, email, role, isActive]);

  const { data, isLoading, mutate } = useSWR(url, fetcher);

  //  Debounce solo para el email
  const debouncedEmail = useDebouncedCallback((value: string) => {
    setEmail(value);
    setPage(1);
  }, 500);

  const handleEmailSearch = useCallback(
    (value: string) => {
      setEmailInput(value);
      debouncedEmail(value);
    },
    [debouncedEmail],
  );

  // 👇 Rol y estado cambian inmediato (son selects, no hay que debouncear)
  const handleRoleFilter = useCallback((value: string) => {
    setRole(value === "all" ? "" : value);
    setPage(1);
  }, []);

  const handleIsActiveFilter = useCallback((value: string) => {
    setIsActive(value === "all" ? "" : value);
    setPage(1);
  }, []);

  const handleCreate = useCallback(() => {
    router.push("/users/create");
  }, [router]);

  const handleEdit = useCallback(
    (user: User) => {
      router.push(`/users/${user.auth_id}`);
    },
    [router],
  );

  const handleSendRecoveryEmail = useCallback(async (user: User) => {
    try {
      const res = await sendRecoveryEmail({ email: user.email });
      if (res.success) {
        toast.success(res.message, { position: "top-center" });
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("No se pudo enviar el correo de recuperación");
    }
  }, []);

  const handleChangeState = useCallback(
    async (user: User) => {
      try {
        const res = user.is_active
          ? await apiClient.patch(`/user/${user.auth_id}/deactivate`)
          : await apiClient.patch(`/user/${user.auth_id}/activate`);

        if (res.ok) {
          await mutate();
        }
      } catch (error) {
        console.error("Error cambiando estado:", error);
      }
    },
    [mutate],
  );

  return useMemo(
    () => ({
      users: data?.data ?? [],
      total: data?.total ?? 0,
      isLoading,
      page,
      limit,
      setPage,
      handleCreate,
      handleSendRecoveryEmail,
      handleEdit,
      handleChangeState,
      // 👇 Filtros
      emailInput,
      role,
      isActive,
      handleEmailSearch,
      handleRoleFilter,
      handleIsActiveFilter,
    }),
    [
      data,
      isLoading,
      page,
      limit,
      handleCreate,
      handleSendRecoveryEmail,
      handleEdit,
      handleChangeState,
      emailInput,
      role,
      isActive,
      handleEmailSearch,
      handleRoleFilter,
      handleIsActiveFilter,
    ],
  );
}
