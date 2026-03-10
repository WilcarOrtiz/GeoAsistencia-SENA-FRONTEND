"use client";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";
import { createApiHelpers } from "./helper";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_API_URL,
});

api.interceptors.request.use(async (config) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export const apiClient = createApiHelpers(api);
