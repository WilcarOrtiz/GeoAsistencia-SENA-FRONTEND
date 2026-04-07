"use client";

import * as S from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface SelectSharedProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
}

export function SelectField({
  value,
  onChange,
  placeholder = "Selecciona una opción",
  options,
}: SelectSharedProps) {
  return (
    <S.Select onValueChange={onChange} defaultValue={value} value={value}>
      <S.SelectTrigger>
        <S.SelectValue placeholder={placeholder} />
      </S.SelectTrigger>
      <S.SelectContent>
        {options.map((option) => (
          <S.SelectItem key={option.value} value={option.value}>
            {option.label}
          </S.SelectItem>
        ))}
      </S.SelectContent>
    </S.Select>
  );
}
