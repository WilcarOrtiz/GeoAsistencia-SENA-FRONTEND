"use client";

import * as C from "@/components/ui/collapsible";
import * as S from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";

export function NavSettings({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <S.SidebarGroup>
      <S.SidebarGroupLabel>Platform</S.SidebarGroupLabel>
      <S.SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0;

          if (!hasChildren) {
            return (
              <S.SidebarMenuItem key={item.title}>
                <S.SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </S.SidebarMenuButton>
              </S.SidebarMenuItem>
            );
          }

          return (
            <C.Collapsible
              key={item.title}
              asChild
              className="group/collapsible"
            >
              <S.SidebarMenuItem>
                <C.CollapsibleTrigger asChild>
                  <S.SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </S.SidebarMenuButton>
                </C.CollapsibleTrigger>

                <C.CollapsibleContent>
                  <S.SidebarMenuSub>
                    {item.items!.map((subItem) => (
                      <S.SidebarMenuSubItem key={subItem.title}>
                        <S.SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
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
