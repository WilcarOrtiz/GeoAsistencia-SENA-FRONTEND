"use client";

import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormCreateSemesterProps } from "./FormCreateSemester.type";
import { DatePickerDemo } from "@/components/shared/datePickerDemo";
import { SelectDemo } from "@/components/shared/selectDemo";
import { api } from "@/lib/api";

const STATUS_OPTIONS = [
  { label: "Activo", value: "activo" },
  { label: "Inactivo", value: "inactivo" },
  { label: "Finalizado", value: "finalizado" },
];

const formSchema = z.object({
  name: z.string().min(2).optional(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["activo", "inactivo", "finalizado"]).optional(),
});

export function FormCreateSemester(props: FormCreateSemesterProps) {
  const { setOpenModalCreate } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      startDate: undefined,
      endDate: undefined,
      status: "activo",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Llamada al endpoint protegido
      const response = await api.get("/permissions");

      console.log("Permisos recibidos:", response.data);
    } catch (error) {
      console.error("Error al obtener permisos:", error);
    }
    console.log(values);
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
                  />
                </F.FormControl>
                <F.FormMessage />
              </F.FormItem>
            )}
          />

          <div className="sm:col-span-2">
            <F.FormField
              control={form.control}
              name="status"
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
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={!isValid}>
          Guardar
        </Button>
      </form>
    </F.Form>
  );
}
