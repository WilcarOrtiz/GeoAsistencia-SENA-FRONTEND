"use server";
import { apiServer } from "@/lib/api/api_server";
import { UserProfile } from "@/types";

export const isUserActive = async (email: string): Promise<boolean> => {
  try {
    const response = await apiServer.get(`/user/is-active?email=${email}`);

    if (!response.ok || !response.data) return false;

    return response.data === true;
  } catch (error) {
    console.log("Error al validar si el usuario está activo:", error);
    return false;
  }
};

export const getProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await apiServer.get<UserProfile>("/user/me");

    if (!response.ok) {
      console.log("Error desde el Backend:", response.message);
      return null;
    }

    console.log("REPSUESTA DEL GET PROFILE", response.data);

    return response.data;
  } catch (error) {
    console.log("Error al obtener la informacion del usuario:", error);
    return null;
  }
};
