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
    name: string;
    description: string;
  }[];
  permissions: string[];
  navigation: NavigationItem[];
}
