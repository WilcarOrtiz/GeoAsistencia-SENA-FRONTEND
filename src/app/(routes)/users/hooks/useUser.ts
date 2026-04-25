"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/features/User/user.type";
import { useDebouncedCallback } from "use-debounce";
import { sendRecoveryEmail } from "@/actions/auth/auth";
import { toast } from "sonner";

export function useUsers(limit = 10) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const [emailInput, setEmailInput] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (email) params.set("email", email);
    if (role) params.set("role", role);
    if (isActive) params.set("is_active", isActive);
    return params;
  }, [page, limit, email, role, isActive]);

  const url = `/user?${queryParams.toString()}`;

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, limit, email, role, isActive],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedData<User>>(url);
      return data;
    },
  });

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
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
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
          await queryClient.invalidateQueries({ queryKey: ["users"] });
        }
      } catch (error) {
        console.error("Error cambiando estado:", error);
      }
    },
    [queryClient],
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
