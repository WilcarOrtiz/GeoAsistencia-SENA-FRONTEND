"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import * as A from "@/components/ui/avatar";
import * as D from "@/components/ui/dropdown-menu";
import * as S from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = S.useSidebar();
  return (
    <S.SidebarMenu>
      <S.SidebarMenuItem>
        <D.DropdownMenu>
          <D.DropdownMenuTrigger asChild>
            <S.SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <A.Avatar className="h-8 w-8 rounded-lg">
                <A.AvatarImage src={user.avatar} alt={user.name} />
                <A.AvatarFallback className="rounded-lg">CN</A.AvatarFallback>
              </A.Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </S.SidebarMenuButton>
          </D.DropdownMenuTrigger>
          <D.DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <D.DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <A.Avatar className="h-8 w-8 rounded-lg">
                  <A.AvatarImage src={user.avatar} alt={user.name} />
                  <A.AvatarFallback className="rounded-lg">CN</A.AvatarFallback>
                </A.Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </D.DropdownMenuLabel>
            <D.DropdownMenuSeparator />
            <D.DropdownMenuGroup>
              <D.DropdownMenuItem>
                <BadgeCheck />
                Account
              </D.DropdownMenuItem>
            </D.DropdownMenuGroup>
            <D.DropdownMenuSeparator />
            <D.DropdownMenuItem>
              <LogOut />
              Log out
            </D.DropdownMenuItem>
          </D.DropdownMenuContent>
        </D.DropdownMenu>
      </S.SidebarMenuItem>
    </S.SidebarMenu>
  );
}
