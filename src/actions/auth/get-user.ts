"use server";

import { apiServer } from "@/lib/api/api_server";
import { UserProfile } from "@/types";

export const isUserActive = async (email: string): Promise<boolean> => {
  try {
    const response = await apiServer.get(`/user/is-active?email=${email}`);

    if (!response.ok || !response.data) {
      return false;
    }

    return response.data === true;
  } catch (error) {
    console.error("Error al validar si el usuario está activo:", error);

    return false;
  }
};

export const getProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await apiServer.get<UserProfile>("/user/me");

    if (!response.ok) {
      console.error("Error desde el backend:", response.message);

      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);

    return null;
  }
};
