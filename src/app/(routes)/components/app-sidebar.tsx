"use client";

import * as React from "react";
import * as S from "@/components/ui/sidebar";
import { DatePicker, NavSettings, NavUser } from "./sidebarComponents";
import { useAuth } from "@/context/authContext";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof S.Sidebar>) {
  const { user, navigation } = useAuth();
  const userData = user
    ? {
        name: user.firstName,
        email: user.email || "",
        avatar: "/avatars/shadcn.jpg",
        roles: user.roles,
      }
    : null;

  return (
    <S.Sidebar collapsible="icon" {...props}>
      <S.SidebarHeader>
        <NavUser user={userData} />
      </S.SidebarHeader>
      <S.SidebarContent>
        <NavSettings items={navigation} />
      </S.SidebarContent>
      <S.SidebarFooter>
        <DatePicker />
      </S.SidebarFooter>
      <S.SidebarRail />
    </S.Sidebar>
  );
}
