"use client";

import { ChevronLeftIcon } from "lucide-react";

import * as C from "@/components/ui/card";
import AuthBackgroundShape from "../../../../public/assets/svg/auth-background-shape";
import Logo from "../../../../public/assets/svg/logo";
import ResetPasswordForm from "./components/reset-password-form";
import Link from "next/link";

const ResetPassword = () => {
  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute">
        <AuthBackgroundShape />
      </div>

      <C.Card className="z-1 w-full border-none shadow-md sm:max-w-md">
        <C.CardHeader className="gap-6">
          <Logo className="gap-3" />

          <div>
            <C.CardTitle className="mb-1.5 text-h1">
              Restablecer contraseña
            </C.CardTitle>
            <C.CardDescription className="text-p">
              Ingrese una nueva contraseña para actualice la seguridad de su
              cuenta.
            </C.CardDescription>
          </div>
        </C.CardHeader>

        <C.CardContent className="space-y-4">
          {/* ResetPassword Form */}
          <ResetPasswordForm />

          <Link
            href="/login"
            className="group mx-auto flex w-fit items-center gap-2"
          >
            <ChevronLeftIcon className="size-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Volver a iniciar sesión</span>
          </Link>
        </C.CardContent>
      </C.Card>
    </div>
  );
};

export default ResetPassword;
