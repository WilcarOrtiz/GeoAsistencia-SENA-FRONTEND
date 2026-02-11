"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) return { success: false, message: error.message };
  return { success: true, message: "Autenticaicon correcta" };
}

export async function sendRecoveryEmail(formData: { email: string }) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${origin}/confirm`,
  });

  if (error) return { success: false, message: error.message };

  return {
    success: true,
    message: "Revisa tu correo institucional para restablecer tu clave",
  };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { success: false, message: error.message };

  return { success: true };
}
