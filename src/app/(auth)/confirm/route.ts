import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;

  const token_hash =
    searchParams.get("token_hash") || searchParams.get("token");
  const type = searchParams.get("type") as EmailOtpType | null;

  const redirectTo = request.nextUrl.clone();
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      if (type === "recovery") {
        redirectTo.pathname = "/reset-password";
      } else {
        redirectTo.pathname = "/home";
      }
      return NextResponse.redirect(redirectTo);
    } else {
      console.error("Error de verificación:", error.message);
      redirectTo.pathname = "/login";
      return NextResponse.redirect(redirectTo);
    }
  }

  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
