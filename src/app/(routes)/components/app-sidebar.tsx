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
        name: user.fullName,
        email: user.email || "",
      }
    : null;

  return (
    <S.Sidebar collapsible="icon" {...props}>
      <S.SidebarHeader>
        <S.SidebarHeader>
          <div className="flex items-center gap-3 px-3 py-2">
            <img
              src="/assets/logo.png"
              alt="EduPin logo"
              className="w-8 h-8 object-contain shrink-0"
            />
            <span className="font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden">
              EduPin
            </span>
          </div>
        </S.SidebarHeader>
      </S.SidebarHeader>
      <S.SidebarContent>
        <NavSettings items={navigation} />
      </S.SidebarContent>
      <S.SidebarFooter>
        <DatePicker />
        <NavUser user={userData} />
      </S.SidebarFooter>
      <S.SidebarRail />
    </S.Sidebar>
  );
}
