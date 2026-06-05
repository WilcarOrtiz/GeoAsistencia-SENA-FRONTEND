"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import * as Dl from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as F from "@/components/ui/field";

const schema = z
  .object({
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirma tu contraseña"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdatePasswordDialog({ open, onOpenChange }: Props) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      toast.error("Error al actualizar", { description: error.message });
      setLoading(false);
      return;
    }

    await supabase.auth.refreshSession();

    toast.success("Contraseña actualizada correctamente");
    reset();
    onOpenChange(false);
    setLoading(false);
  };

  return (
    <Dl.Dialog open={open} onOpenChange={onOpenChange}>
      <Dl.DialogContent className="sm:max-w-md">
        <Dl.DialogHeader>
          <Dl.DialogTitle>Actualizar contraseña</Dl.DialogTitle>
          <Dl.DialogDescription>
            Ingresa tu nueva contraseña para actualizar la seguridad de tu
            cuenta.
          </Dl.DialogDescription>
        </Dl.DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-2"
        >
          <F.FieldGroup>
            {/* NUEVA CONTRASEÑA */}
            <F.Field>
              <F.FieldLabel htmlFor="password">Nueva contraseña</F.FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-9"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-error">{errors.password.message}</p>
              )}
            </F.Field>

            {/* CONFIRMAR CONTRASEÑA */}
            <F.Field>
              <F.FieldLabel htmlFor="confirmPassword">
                Confirmar contraseña
              </F.FieldLabel>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-9"
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0"
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-error">{errors.confirmPassword.message}</p>
              )}
            </F.Field>
          </F.FieldGroup>

          <Dl.DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || !isValid}>
              {loading ? "Actualizando..." : "Guardar cambios"}
            </Button>
          </Dl.DialogFooter>
        </form>
      </Dl.DialogContent>
    </Dl.Dialog>
  );
}
