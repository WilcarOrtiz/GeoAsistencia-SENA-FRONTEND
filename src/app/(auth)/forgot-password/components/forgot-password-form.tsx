"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { sendRecoveryEmail } from "@/actions/auth/auth";
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setLoading(true);

    const result = await sendRecoveryEmail(values);

    if (!result.success) {
      toast.error("Error", {
        description: result.message,
        position: "top-center",
      });
    } else {
      toast.success("Enlace enviado", {
        description: result.message,
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/login");
      }, 3500);
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="email">
          Dirección de correo electrónico*
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="Ingrese su correo"
          {...register("email")}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
      </Field>

      <Button className="w-full" type="submit" disabled={loading || !isValid}>
        {loading ? "Enviando..." : "Enviar enlace de reinicio"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
