"use client";

import * as React from "react";
import * as S from "@/components/ui/sidebar";
import { DatePicker, NavSettings, NavUser } from "./sidebarComponents";
import { useAuth } from "@/context/authContext";
import Image from "next/image";

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
        <div className="flex items-center justify-center pt-3">
          <Image
            src="/assets/logotipo.png"
            alt="EduPin logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </div>
      </S.SidebarHeader>
      <S.SidebarContent>
        <NavSettings items={navigation} />
      </S.SidebarContent>
      <S.SidebarFooter>
        <DatePicker /> <NavUser user={userData} />
      </S.SidebarFooter>
      <S.SidebarRail />
    </S.Sidebar>
  );
}
