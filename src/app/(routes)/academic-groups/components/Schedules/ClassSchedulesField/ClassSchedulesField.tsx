"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Props } from "./ClassSchedulesField.type";
import { days, WeekDayLabel } from "@/types/weekDay";

export function ClassSchedulesField({
  form,
  fields,
  onRemove,
  disabled,
}: Props) {
  const { setValue, watch } = form;

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        const path = `schedules.${index}` as const;

        const item = watch(path);
        const isExisting = !!item?.id;

        const currentDays = watch(`${path}.days`) ?? [];
        const currentStart = watch(`${path}.start_time`) ?? "";
        const currentEnd = watch(`${path}.end_time`) ?? "";

        return (
          <Card key={field.id} className="p-4 space-y-4 flex flex-wrap">
            <div className="flex flex-wrap justify-between w-full gap-4">
              {/* DÍAS */}
              <div>
                <p className="text-sm font-medium mb-2">Días</p>

                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={currentDays.map(String)}
                  onValueChange={(values) =>
                    setValue(`${path}.days`, values.map(Number), {
                      shouldValidate: true,
                    })
                  }
                  disabled={disabled || isExisting}
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
                    value={currentStart}
                    onChange={(e) =>
                      setValue(
                        `${path}.start_time`,
                        e.target.value.slice(0, 5),
                        { shouldValidate: true },
                      )
                    }
                    disabled={disabled || isExisting}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">
                    Hora fin
                  </label>

                  <Input
                    type="time"
                    value={currentEnd}
                    onChange={(e) =>
                      setValue(`${path}.end_time`, e.target.value.slice(0, 5), {
                        shouldValidate: true,
                      })
                    }
                    disabled={disabled || isExisting}
                  />
                </div>
              </div>

              {/* DELETE */}
              {!disabled && (
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => onRemove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
