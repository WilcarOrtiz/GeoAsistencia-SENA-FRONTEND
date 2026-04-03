import { ROlE_SYSTEM } from "./roleAndPermission.constants";

export type roleSystem = keyof typeof ROlE_SYSTEM;

export interface Role {
  id: string;
  name: roleSystem;
  description: number;
  is_active: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  roles: Role[];
}
