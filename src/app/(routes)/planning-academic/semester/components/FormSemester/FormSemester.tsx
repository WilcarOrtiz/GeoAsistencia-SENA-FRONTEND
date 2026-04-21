"use client";

import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/shared/DatePicker";
import { SelectField } from "@/components/shared/SelectField";
import { FormSemesterProps, STATUS_OPTIONS } from "./FormSemester.type";
import { useFormSemester } from "./useFormSemester";

export function FormSemester({
  semester,
  onSuccess,
  onClose,
}: FormSemesterProps) {
  const { form, isEditing, isValid, onSubmit } = useFormSemester(
    semester,
    onSuccess,
    onClose,
  );

  return (
    <F.Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
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
