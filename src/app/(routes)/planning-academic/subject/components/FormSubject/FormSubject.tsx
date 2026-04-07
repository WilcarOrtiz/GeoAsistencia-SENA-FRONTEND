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

const formSchema = z.object({
  name: z.string().min(3).max(30),
  code: z.string().min(2).max(10),
});

export function FormSubject({ subject, onSuccess, onClose }: FormSubjectProps) {
  const isEditing = !!subject;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subject?.name ?? "",
      code: subject?.code ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = isEditing
        ? await apiClient.patch(`/subjects/${subject.id}`, values)
        : await apiClient.post("/subjects", values);

      if (res.ok) {
        toast.success(res.message);
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Opps, algo anda mal";
        toast.error(message, { position: "top-center" });
      }
    }
  };

  return (
    <F.Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      placeholder="Ej: Ingenieria de sotware I"
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

        <Button type="submit" className="w-full sm:w-auto">
          Guardar
        </Button>
      </form>
    </F.Form>
  );
}
