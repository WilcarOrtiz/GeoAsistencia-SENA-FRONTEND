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

  // ── Selección múltiple ──────────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Estados de carga para acciones masivas
  const [isSendingEmails, setIsSendingEmails] = useState(false);
  const [isChangingState, setIsChangingState] = useState(false);
  const [isResettingDevices, setIsResettingDevices] = useState(false);

  // ── Query params ────────────────────────────────────────────────────────────
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

  // ── Filtros ─────────────────────────────────────────────────────────────────
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

  // ── Navegación ──────────────────────────────────────────────────────────────
  const handleCreate = useCallback(() => {
    router.push("/users/create");
  }, [router]);

  const handleEdit = useCallback(
    (user: User) => {
      router.push(`/users/${user.auth_id}`);
    },
    [router],
  );

  // ── Acciones individuales ───────────────────────────────────────────────────
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
        const endpoint = user.is_active ? "deactivate" : "activate";
        // apiClient.patch devuelve response.data; Axios lanza en 4xx/5xx.
        await apiClient.patch(`/user/${user.auth_id}/${endpoint}`);
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      } catch (error) {
        console.error("Error cambiando estado:", error);
      }
    },
    [queryClient],
  );

  // ── Acciones masivas ────────────────────────────────────────────────────────
  const handleBulkSendRecoveryEmail = useCallback(async () => {
    if (!selectedIds.length) return;
    setIsSendingEmails(true);
    try {
      const users =
        data?.data.filter((u) => selectedIds.includes(u.auth_id)) ?? [];
      const results = await Promise.allSettled(
        users.map((u) => sendRecoveryEmail({ email: u.email })),
      );
      const failed = results.filter((r) => r.status === "rejected").length;
      if (failed === 0) {
        toast.success(`Correos enviados a ${users.length} usuario(s)`);
      } else {
        toast.warning(`${users.length - failed} enviados, ${failed} fallidos`);
      }
      setSelectedIds([]);
    } catch {
      toast.error("Error enviando correos masivos");
    } finally {
      setIsSendingEmails(false);
    }
  }, [selectedIds, data]);

  const handleBulkChangeState = useCallback(
    async (activate: boolean) => {
      if (!selectedIds.length) return;
      setIsChangingState(true);
      try {
        const endpoint = activate ? "activate" : "deactivate";
        await Promise.all(
          selectedIds.map((id) => apiClient.patch(`/user/${id}/${endpoint}`)),
        );
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success(
          `${selectedIds.length} usuario(s) ${activate ? "habilitados" : "inhabilitados"} correctamente`,
        );
        setSelectedIds([]);
      } catch {
        toast.error("Error al cambiar estado de usuarios");
      } finally {
        setIsChangingState(false);
      }
    },
    [selectedIds, queryClient],
  );

  const handleBulkResetDevices = useCallback(async () => {
    if (!selectedIds.length) return;
    setIsResettingDevices(true);
    try {
      // apiClient.patch devuelve response.data (ApiResponse), no el Response nativo.
      // Axios lanza excepción ante 4xx/5xx, así que si llega aquí es éxito.
      await apiClient.patch("/user/reset-devices", { userIds: selectedIds });
      toast.success(
        `Dispositivos restablecidos para ${selectedIds.length} usuario(s)`,
      );
      setSelectedIds([]);
    } catch (error: unknown) {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Error al restablecer dispositivos";
      toast.error(msg);
    } finally {
      setIsResettingDevices(false);
    }
  }, [selectedIds]);

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
      // selección múltiple
      selectedIds,
      setSelectedIds,
      // acciones masivas
      handleBulkSendRecoveryEmail,
      handleBulkChangeState,
      handleBulkResetDevices,
      isSendingEmails,
      isChangingState,
      isResettingDevices,
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
      selectedIds,
      handleBulkSendRecoveryEmail,
      handleBulkChangeState,
      handleBulkResetDevices,
      isSendingEmails,
      isChangingState,
      isResettingDevices,
    ],
  );
}
