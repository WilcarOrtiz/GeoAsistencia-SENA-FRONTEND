"use client";

import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DatePicker } from "@/components/shared/DatePicker";
import { SelectField } from "@/components/shared/SelectField";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";
import {
  SEMESTER_STATES,
  STATE_LABELS,
} from "@/features/semester/semester.constants";
import { FormSemesterProps } from "./FormSemester.type";

const STATUS_OPTIONS = SEMESTER_STATES.map((state) => ({
  value: state,
  label: STATE_LABELS[state],
}));

const formSchema = z.object({
  name: z.string().min(2),
  startDate: z.date(),
  endDate: z.date(),
  state: z.enum(SEMESTER_STATES),
});

export function FormSemester({
  semester,
  onSuccess,
  onClose,
}: FormSemesterProps) {
  const isEditing = !!semester;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: semester?.name ?? "",
      startDate: semester?.startDate ? new Date(semester.startDate) : undefined,
      endDate: semester?.endDate ? new Date(semester.endDate) : undefined,
      state: semester?.state ?? "active",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = isEditing
        ? await apiClient.patch(`/semester/${semester.id}`, {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
          })
        : await apiClient.post("/semester", values);

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
              name="name"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Semestre</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="Ej: Semestre 2026-1" {...field} />
                  </F.FormControl>
                  <F.FormDescription>
                    Ingrese un nombre descriptivo del semestre
                  </F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
          </div>

          <F.FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <F.FormItem className="flex flex-col">
                <F.FormLabel>Fecha de Inicio</F.FormLabel>
                <F.FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </F.FormControl>
                <F.FormMessage />
              </F.FormItem>
            )}
          />

          <F.FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <F.FormItem className="flex flex-col">
                <F.FormLabel>Fecha de Finalizacion</F.FormLabel>
                <F.FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    minDate={form.watch("startDate")}
                  />
                </F.FormControl>
                <F.FormMessage />
              </F.FormItem>
            )}
          />

          <div className="sm:col-span-2">
            {!isEditing && (
              <F.FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <F.FormItem>
                    <F.FormLabel>Estado</F.FormLabel>
                    <F.FormControl>
                      <SelectField
                        options={STATUS_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecciona el estado"
                      />
                    </F.FormControl>
                    <F.FormMessage />
                  </F.FormItem>
                )}
              />
            )}
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={!isValid}>
          Guardar
        </Button>
      </form>
    </F.Form>
  );
}
