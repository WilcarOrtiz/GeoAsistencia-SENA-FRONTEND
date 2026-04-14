"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { WeekDay, WeekDayLabel } from "@/types/weekDay";
import { FormValues } from "../FormAcademicGroup";

type Props = {
  form: UseFormReturn<FormValues>;
};

const days = Object.values(WeekDay).filter(
  (v) => typeof v === "number",
) as WeekDay[];

export function ClassSchedulesField({ form }: Props) {
  const { control, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-base">Horarios de clase</h3>

        <Button
          type="button"
          className="flex items-center gap-2"
          onClick={() =>
            append({
              days: [],
              start_time: "",
              end_time: "",
            })
          }
        >
          <Plus className="h-4 w-4" />
          Agregar horario
        </Button>
      </div>

      {/* LISTA DE HORARIOS */}
      <div className="">
        {fields.map((field, index) => (
          <Card key={field.id} className="p-4 space-y-4 flex flex-wrap">
            {/* DÍAS */}
            <div className="flex flex-wrap justify-between">
              <div>
                <p className="text-sm font-medium mb-2">Días</p>

                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  onValueChange={(values) =>
                    setValue(`schedules.${index}.days`, values.map(Number), {
                      shouldValidate: true,
                    })
                  }
                >
                  {days.map((day) => (
                    <ToggleGroupItem key={day} value={String(day)}>
                      {WeekDayLabel[day]}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              {/* HORAS */}
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">
                    Hora inicio
                  </label>

                  <Input
                    type="time"
                    id="time-picker-optional"
                    defaultValue="00:00:00"
                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={(e) =>
                      setValue(
                        `schedules.${index}.start_time`,
                        e.target.value.slice(0, 5),
                      )
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">
                    Hora fin
                  </label>

                  <Input
                    type="time"
                    id="time-picker-optional"
                    defaultValue="00:00:00"
                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={(e) =>
                      setValue(
                        `schedules.${index}.end_time`,
                        e.target.value.slice(0, 5),
                      )
                    }
                  />
                </div>
              </div>
              {/* ACCIONES */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
