"use server";
import { apiServer } from "@/lib/api/api_server";
import { UserProfile } from "@/types";

export const getProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await apiServer.get<UserProfile>("/user/me");

    if (!response.ok) {
      console.log("Error desde el Backend:", response.message);
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("Error al obtener la informacion del usuario:", error);
    return null;
  }
};
