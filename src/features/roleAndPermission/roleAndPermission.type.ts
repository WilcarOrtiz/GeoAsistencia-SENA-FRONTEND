import { RoleSystem } from "./role.constants";

export interface Role {
  id: string;
  name: RoleSystem;
  description: number;
  is_active: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  roles: Role[];
}
