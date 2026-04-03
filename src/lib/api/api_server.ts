import { createClient } from "@/lib/supabase/server";
import axios from "axios";
import { createApiHelpers } from "./helper";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_API_URL,
});

api.interceptors.request.use(async (config) => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export const apiServer = createApiHelpers(api);
