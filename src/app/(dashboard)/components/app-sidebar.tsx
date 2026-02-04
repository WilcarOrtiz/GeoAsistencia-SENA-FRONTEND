"use client";

import * as React from "react";
import * as S from "@/components/ui/sidebar";
import * as Icons from "lucide-react";

import { DatePicker, NavSettings, NavUser } from "./sidebarComponents";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  return (
    <S.Sidebar collapsible="icon" {...props}>
      <S.SidebarHeader>
        <NavUser user={data.user} />
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
