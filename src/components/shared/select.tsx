"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SemesterBasic } from "@/features/semester/semester.type";
import { Subject } from "@/features/subject/subject.type";
import { teacher } from "@/features/User/user.type";
import { Role } from "@/features/roleAndPermission/roleAndPermission.type";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface SelectOption {
  value: string;
  label: string;
}

export interface GenericSelectProps {
  options: SelectOption[];
  onSelect: (value: string) => void;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function GenericSelect({
  options,
  onSelect,
  value: controlledValue,
  defaultValue,
  placeholder = "Seleccioná una opción…",
  searchPlaceholder = "Buscar…",
  emptyMessage = "Sin resultados.",
  loading = false,
  disabled = false,
  className,
}: GenericSelectProps) {
  const isControlled = controlledValue !== undefined;

  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue ?? "",
  );

  const value = isControlled ? controlledValue : internalValue;

  React.useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue ?? "");
    }
  }, [defaultValue, isControlled]);

  const selectedLabel = React.useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value],
  );

  function handleSelect(currentValue: string) {
    const next = currentValue === value ? "" : currentValue;
    if (!isControlled) {
      setInternalValue(next);
    }
    onSelect(next);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || loading}
          className={cn("w-full justify-between font-normal", className)}
        >
          {loading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando…
            </span>
          ) : (
            <span className={cn(!selectedLabel && "text-muted-foreground")}>
              {selectedLabel || placeholder}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const semestersToOptions = (items: SemesterBasic[]): SelectOption[] =>
  items.map((s) => ({ value: s.id, label: `${s.code}` }));

export const subjectsToOptions = (items: Subject[]): SelectOption[] =>
  items.map((s) => ({ value: s.id, label: `${s.code} – ${s.name}` }));

export const teachersToOptions = (items: teacher[]): SelectOption[] =>
  items.map((t) => ({ value: t.id, label: `${t.name} (${t.document})` }));

export const rolesToOptions = (items: Role[]): SelectOption[] =>
  items.filter((r) => r.is_active).map((r) => ({ value: r.id, label: r.name }));
