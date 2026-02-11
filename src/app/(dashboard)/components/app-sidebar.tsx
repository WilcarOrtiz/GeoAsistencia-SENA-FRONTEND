"use client";

import * as React from "react";
import * as S from "@/components/ui/sidebar";
import * as Icons from "lucide-react";
import { DatePicker, NavSettings, NavUser } from "./sidebarComponents";
import { useAuth } from "@/context/authContext";

const data = {
  navSettings: [
    {
      title: "settings",
      url: "#",
      icon: Icons.Cog,
      items: [
        {
          title: "Semestre",
          url: "/semester",
        },
        {
          title: "clases",
          url: "#",
        },
        {
          title: "foco",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof S.Sidebar>) {
  const { user } = useAuth();
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
        <NavSettings items={data.navSettings} />
      </S.SidebarContent>
      <S.SidebarFooter>
        <DatePicker />
      </S.SidebarFooter>
      <S.SidebarRail />
    </S.Sidebar>
  );
}
