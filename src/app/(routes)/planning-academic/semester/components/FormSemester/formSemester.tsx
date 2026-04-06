"use client";

import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DatePickerDemo } from "@/components/shared/datePickerDemo";
import { SelectDemo } from "@/components/shared/selectDemo";
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

export function FormSemester(props: FormSemesterProps) {
  const { setOpenModalCreate } = props;
  const isEditing = !!props.semester;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.semester?.name ?? "",
      startDate: props.semester?.startDate
        ? new Date(props.semester.startDate)
        : undefined,
      endDate: props.semester?.endDate
        ? new Date(props.semester.endDate)
        : undefined,
      state: props.semester?.state ?? "active",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = isEditing
        ? await apiClient.patch(`/semester/${props.semester!.id}`, values)
        : await apiClient.post("/semester", values);

      if (res.ok) {
        toast.success(res.message);
        props.onSuccess?.();
        setOpenModalCreate(false);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <DatePickerDemo
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                <F.FormLabel>Fecha de Finalización</F.FormLabel>
                <F.FormControl>
                  <DatePickerDemo
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
                      <SelectDemo
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
