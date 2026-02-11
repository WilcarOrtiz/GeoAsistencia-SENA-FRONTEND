"use server";
import { api } from "@/lib/api";
import { ApiResponse, UserProfile } from "@/types";

export const getProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await api.get<ApiResponse<UserProfile>>("/user/me");

    const { ok, data, message } = response.data;
    if (!ok) {
      console.error("Error desde el Backend:", message);
      return null;
    }
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error al obtener la informacion del usuario:", error);
    return null;
  }
};
