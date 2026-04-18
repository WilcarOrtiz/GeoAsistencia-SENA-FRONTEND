"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GenericSelect } from "@/components/shared/select";
import {
  ROLE_LABELS,
  ROLE_SYSTEM_KEYS,
} from "@/features/roleAndPermission/role.constants";

type Props = {
  emailInput: string;
  role: string;
  isActive: string;
  onEmailChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onIsActiveChange: (value: string) => void;
};

export function UserTableFilters({
  emailInput,
  role,
  isActive,
  onEmailChange,
  onRoleChange,
  onIsActiveChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-3 py-4">
      {/* EMAIL */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Correo</span>
        <Input
          placeholder="Filtrar correo..."
          value={emailInput}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full sm:w-[240px]"
        />
      </div>

      <div className="flex gap-3 flex-col xs:flex-row sm:flex-row">
        {/* ROL */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Rol</span>

          <GenericSelect
            options={[
              { label: "Todos", value: "all" },
              ...ROLE_SYSTEM_KEYS.map((roleKey) => ({
                label: ROLE_LABELS[roleKey],
                value: roleKey,
              })),
            ]}
            defaultValue={role || "all"}
            onSelect={onRoleChange}
            placeholder="Todos los roles"
          />
        </div>

        {/* ESTADO */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Estado</span>

          <Select value={isActive || "all"} onValueChange={onIsActiveChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Activos</SelectItem>
              <SelectItem value="false">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
