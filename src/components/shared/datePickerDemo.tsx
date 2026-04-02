"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DatePickerDemo({
  value,
  onChange,
  minDate,
}: {
  value?: Date;
  onChange: (date?: Date) => void;
  minDate?: Date;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          {value ? format(value, "PPP") : <span>Selecciona una fecha</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={
            (date) =>
              date < new Date("1900-01-01") ||
              (minDate ? date <= minDate : false) // 👈 deshabilita fechas menores o iguales al startDate
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
