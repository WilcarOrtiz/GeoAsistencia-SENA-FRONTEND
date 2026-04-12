import { ROLE_SYSTEM } from "@/features/roleAndPermission/role.constants";

export type roleSystem = keyof typeof ROLE_SYSTEM;

export interface NavigationItem {
  id: string;
  name: string;
  route: string | null;
  icon: string | null;
  order_index: number;
  children: NavigationItem[];
}

export interface UserProfile {
  user: {
    id: string;
    authId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    isActive: boolean;
  };
  roles: {
    id: string;
    name: roleSystem;
    description: string;
  }[];
  permissions: string[];
  navigation: NavigationItem[];
}
