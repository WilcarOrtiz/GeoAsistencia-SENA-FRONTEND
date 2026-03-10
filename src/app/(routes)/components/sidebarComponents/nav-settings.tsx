"use client";

import * as C from "@/components/ui/collapsible";
import * as S from "@/components/ui/sidebar";
import { NavigationItem } from "@/types/user";
import { ChevronRight } from "lucide-react";
import { getIconByName } from "@/lib/icons";
import Link from "next/link";

export function NavSettings({ items }: { items: NavigationItem[] }) {
  items = [
    {
      id: "5ff8365a-15f8-49e3-8b5e-7018fd588959",
      name: "Panel Principal",
      route: "/dashboard",
      icon: "LayoutDashboard",
      order_index: 1,
      children: [],
    },
    {
      id: "7e64143e-c29b-4f55-80d5-0c7a58824771",
      name: "Usuarios",
      route: null,
      icon: "Users",
      order_index: 2,
      children: [
        {
          id: "e95d59f1-8657-4322-81be-1150f24e2749",
          name: "Nuevo Usuario",
          route: "/semester",
          icon: null,
          order_index: 2,
          children: [],
        },
        {
          id: "1e2d14c9-a4bd-4149-b389-c90226cf2ca3",
          name: "Lista de Usuarios",
          route: "/dashboard/usuarios",
          icon: null,
          order_index: 1,
          children: [],
        },
      ],
    },
    {
      id: "3176ede3-03af-4c6c-9f50-052829e3a56e",
      name: "Académico",
      route: null,
      icon: "BookOpen",
      order_index: 3,
      children: [
        {
          id: "310f3f0f-fc11-48e9-89da-88ab21d7f237",
          name: "Asignaturas",
          route: "/dashboard/academico/asignaturas",
          icon: null,
          order_index: 1,
          children: [],
        },
        {
          id: "a2555f17-d6ba-465e-9ae9-59f4ea3375f6",
          name: "Gestión de Grupos",
          route: "/dashboard/academico/grupos",
          icon: null,
          order_index: 2,
          children: [],
        },
      ],
    },
    {
      id: "ade8d06f-02c9-4c4d-8cd7-d40a8779486f",
      name: "Reportes",
      route: null,
      icon: "BarChart3",
      order_index: 4,
      children: [
        {
          id: "55b1b23b-01d1-4984-888f-d839be357cfa",
          name: "Estadísticas Globales",
          route: "/dashboard/reportes/stats",
          icon: null,
          order_index: 1,
          children: [],
        },
        {
          id: "4c1d3f42-1530-4c71-ac25-2c744a7310f0",
          name: "Descargas",
          route: "/dashboard/reportes/descargas",
          icon: null,
          order_index: 2,
          children: [],
        },
      ],
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
