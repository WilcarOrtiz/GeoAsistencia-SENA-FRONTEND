"use client";

import { ChevronLeftIcon } from "lucide-react";
import * as C from "@/components/ui/card";
import AuthBackgroundShape from "../../../../../public/assets/svg/auth-background-shape";
import Logo from "../../../../../public/assets/svg/logo";
import Link from "next/link";
import ForgotPasswordForm from "./forgot-password-form";

const ForgotPassword = () => {
  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute">
        <AuthBackgroundShape />
      </div>

      <C.Card className="z-1 w-full border-none shadow-md sm:max-w-md">
        <C.CardHeader className="gap-6">
          <Logo className="gap-3" />

          <div>
            <C.CardTitle className="text-h1 mb-2">
              ¿Olvidaste tu contraseña?
            </C.CardTitle>
            <C.CardDescription className="text-p">
              Ingrese su correo electrónico y le enviaremos instrucciones para
              restablecer tu contraseña
            </C.CardDescription>
          </div>
        </C.CardHeader>

        <C.CardContent className="space-y-4">
          {/* ForgotPassword Form */}
          <ForgotPasswordForm />
          <Link
            href="/login"
            className="group mx-auto flex w-fit items-center gap-2 "
          >
            <ChevronLeftIcon className="size-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Volver a iniciar sesión</span>
          </Link>
        </C.CardContent>
      </C.Card>
    </div>
  );
};

export default ForgotPassword;
