"use client";

import * as C from "@/components/ui/collapsible";
import * as S from "@/components/ui/sidebar";
import { NavigationItem } from "@/types/user";
import { ChevronRight } from "lucide-react";
import { getIconByName } from "@/utils/icons";
import Link from "next/link";

export function NavSettings({ items }: { items: NavigationItem[] }) {
  items = [
    {
      id: "ade8d06f-02c9-4c4d-8cd7-d40a8779486f",
      name: "Planeación académica",
      route: "CalendarClock",
      icon: "BarChart3",
      order_index: 5,
      children: [
        {
          id: "55b1b23b-01d1-4984-888f-d839be357cfa",
          name: "Semestres",
          route: "/planning-academic/semester",
          icon: null,
          order_index: 1,
          children: [],
        },
        {
          id: "4c1d3f42-1530-4c71-ac25-2c744a7310f0",
          name: "Asignatura",
          route: "/planning-academic/subject",
          icon: null,
          order_index: 2,
          children: [],
        },
      ],
    },

    {
      id: "5ff8365a-15f8-49e3-8b5e-7018fd588952",
      name: "Roles y permisos",
      route: "/roles",
      icon: "ShieldUser",
      order_index: 5,
      children: [],
    },
  ];

  return (
    <S.SidebarGroup>
      <S.SidebarGroupLabel>Platform</S.SidebarGroupLabel>
      <S.SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const IconComponent = getIconByName(item.icon);
          if (!hasChildren) {
            return (
              <S.SidebarMenuItem key={item.id}>
                <S.SidebarMenuButton asChild tooltip={item.name}>
                  <Link href={item.route ?? "#"}>
                    <IconComponent size={18} />
                    <span>{item.name}</span>
                  </Link>
                </S.SidebarMenuButton>
              </S.SidebarMenuItem>
            );
          }

          return (
            <C.Collapsible key={item.id} asChild className="group/collapsible">
              <S.SidebarMenuItem>
                <C.CollapsibleTrigger asChild>
                  <S.SidebarMenuButton tooltip={item.name}>
                    <IconComponent size={18} />
                    <span>{item.name}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </S.SidebarMenuButton>
                </C.CollapsibleTrigger>

                <C.CollapsibleContent>
                  <S.SidebarMenuSub>
                    {item.children?.map((subItem) => (
                      <S.SidebarMenuSubItem key={subItem.id}>
                        <S.SidebarMenuSubButton asChild>
                          <Link href={subItem.route ?? "#"}>
                            <span>{subItem.name}</span>
                          </Link>
                        </S.SidebarMenuSubButton>
                      </S.SidebarMenuSubItem>
                    ))}
                  </S.SidebarMenuSub>
                </C.CollapsibleContent>
              </S.SidebarMenuItem>
            </C.Collapsible>
          );
        })}
      </S.SidebarMenu>
    </S.SidebarGroup>
  );
}

/*   */
