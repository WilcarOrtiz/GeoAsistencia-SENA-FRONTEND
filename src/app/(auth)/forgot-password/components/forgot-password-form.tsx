"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Tu cliente de browser
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error("Error", {
        description: "No se pudo enviar el correo: " + error.message,
        position: "top-center",
      });
    } else {
      toast.success("Enlace enviado", {
        description:
          "Revisa tu correo institucional para restablecer tu clave.",
        position: "top-center",
      });
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleResetPassword}>
      <div className="space-y-1">
        <Field>
          <FieldLabel htmlFor="email">Email address*</FieldLabel>
          <Input
            id="email"
            name="email" // Importante: añadí el atributo name
            type="email"
            placeholder="Enter your email address"
            required
          />
        </Field>
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
