import { RoleSystem } from "../roleAndPermission/role.constants";

export interface User {
  auth_id: string;
  ID_user: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  is_active: boolean;
  created_at: string;
  email: string;
  roles: { id: string; name: RoleSystem }[];
}
