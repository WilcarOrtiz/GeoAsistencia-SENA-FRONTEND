"use client";

import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";
import { FormSubjectProps } from "./FormSubject.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(3).max(30),
  code: z.string().min(2).max(10),
});

export function FormSubject({ subject, onSuccess, onClose }: FormSubjectProps) {
  const isEditing = !!subject;
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subject?.name ?? "",
      code: subject?.code ?? "",
    },
  });

  const { mutate: submitSubject, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      isEditing
        ? apiClient.patch(`/subjects/${subject.id}`, values)
        : apiClient.post("/subjects", values),

    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      onSuccess?.();
      onClose();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Opps, algo anda mal");
      }
    },
  });

  return (
    <F.Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => submitSubject(values))}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <F.FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Código</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="Ej: SSS103" {...field} />
                  </F.FormControl>
                  <F.FormDescription>
                    Ingrese el codigo de la materia
                  </F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <F.FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Nombre</F.FormLabel>
                  <F.FormControl>
                    <Input
                      placeholder="Ej: Ingenieria de software I"
                      {...field}
                    />
                  </F.FormControl>
                  <F.FormDescription>
                    Ingrese el nombre de la materia.
                  </F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
          </div>
        </div>

        {/* isPending deshabilita el botón mientras guarda */}
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </F.Form>
  );
}
