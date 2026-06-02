"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as F from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "@/actions/auth/auth";
import { useAuth } from "@/context/authContext";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const { getUserData } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    const result = await login(values);

    if (!result.success) {
      toast.error("Credenciales incorrectas", {
        description: result.message,
      });
      setLoading(false);
      return;
    }
    await getUserData();
    toast.success(result.message);
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <F.FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-h1">Inicie sesión en su cuenta</h1>
          <p className="text-p text-balance">
            Ingrese su correo electrónico a continuación para iniciar sesión en
            su cuenta
          </p>
        </div>

        <F.Field>
          <F.FieldLabel htmlFor="email">Email</F.FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="usuario@gmail.com"
            {...register("email")}
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </F.Field>

        <F.Field>
          <div className="flex items-center">
            <F.FieldLabel htmlFor="password">Contraseña</F.FieldLabel>
            <Link href="/forgot-password" className="ml-auto text-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </F.Field>

        <F.Field>
          <Button type="submit" disabled={loading || !isValid}>
            {loading ? "Iniciando sesión..." : "Login"}
          </Button>
        </F.Field>

        <F.FieldSeparator>EduPin</F.FieldSeparator>

        <F.Field>
          <F.FieldDescription className="text-small px-6 text-center">
            Gestiona la asistencia, Toma mejores decisiones.
          </F.FieldDescription>
        </F.Field>
      </F.FieldGroup>
    </form>
  );
};

export default LoginForm;
