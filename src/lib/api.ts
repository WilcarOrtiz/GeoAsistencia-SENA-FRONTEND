import { createClient } from "@/utils/supabase/client";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    console.log(session.access_token);
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //TODO: Si el backend (NestJS) responde 401, limpiamos y redirigimos
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
