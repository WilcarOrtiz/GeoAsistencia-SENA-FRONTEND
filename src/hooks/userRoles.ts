import useSWR from "swr";
import { apiClient } from "@/lib/api/api_client";
import { Role } from "@/features/roleAndPermission/roleAndPermission.type";

const fetcher = (url: string): Promise<Role[]> =>
  apiClient.get<Role[]>(url).then((res) => res.data);

export function useRoles() {
  const { data, error, isLoading } = useSWR<Role[]>("/role", fetcher);

  return {
    roles: data || [],
    loading: isLoading,
    error,
  };
}
