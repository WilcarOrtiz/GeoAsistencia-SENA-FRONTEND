"use client";

import { Button } from "@/components/ui/button";
import { ClassSchedulesField } from "../ClassSchedulesField/ClassSchedulesField";
import { useFormClassSchedules } from "./useFormClassSchedules";

type Props = {
  grupoId: string;
  disabled?: boolean;
};

export function FormClassSchedules({ grupoId, disabled }: Props) {
  const { form, fields, handleAppend, handleRemove, onSubmit } =
    useFormClassSchedules(grupoId);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {!disabled && (
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base">Horarios de clase</h3>
          <Button type="button" onClick={handleAppend}>
            Agregar horario
          </Button>
        </div>
      )}

      <fieldset disabled={disabled}>
        <ClassSchedulesField
          form={form}
          fields={fields}
          onRemove={handleRemove}
          disabled={disabled}
        />

        {!disabled && (
          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-full sm:w-auto">
              Guardar horarios
            </Button>
          </div>
        )}
      </fieldset>
    </form>
  );
}
