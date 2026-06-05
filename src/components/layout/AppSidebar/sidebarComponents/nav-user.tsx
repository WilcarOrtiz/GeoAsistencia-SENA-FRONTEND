"use client";

import { useState } from "react"; // ✅ agregar
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import * as D from "@/components/ui/dropdown-menu";
import * as S from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { signOut } from "@/actions/auth/auth";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { UpdatePasswordDialog } from "@/components/shared/UpdatePasswordDialog";

export function NavUser({
  user,
}: {
  user: { name: string; email: string } | null;
}) {
  const router = useRouter();
  const { isMobile } = S.useSidebar();
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false); // ✅ aquí arriba

  if (!user) {
    return (
      <S.SidebarMenu>
        <S.SidebarMenuItem>
          <S.SidebarMenuButton size="lg" className="animate-pulse">
            <div className="h-8 w-8 rounded-lg bg-sidebar-accent" />
            <div className="grid flex-1 gap-1">
              <div className="h-3 w-20 rounded bg-sidebar-accent" />
              <div className="h-2 w-32 rounded bg-sidebar-accent" />
            </div>
          </S.SidebarMenuButton>
        </S.SidebarMenuItem>
      </S.SidebarMenu>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const handleUpdatePassword = () => {
    // ✅ solo uno, sin router.push
    setUpdatePasswordOpen(true);
  };

  return (
    <S.SidebarMenu>
      <S.SidebarMenuItem>
        <D.DropdownMenu>
          <D.DropdownMenuTrigger asChild>
            <S.SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar name={user.name} />
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
                <UserAvatar name={user.name} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </D.DropdownMenuLabel>

            <D.DropdownMenuSeparator />
            <D.DropdownMenuGroup>
              <D.DropdownMenuItem onClick={handleUpdatePassword}>
                <BadgeCheck />
                Actualizar Contraseña
              </D.DropdownMenuItem>
            </D.DropdownMenuGroup>

            <D.DropdownMenuSeparator />
            <D.DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Cerrar Sesión
            </D.DropdownMenuItem>
          </D.DropdownMenuContent>
        </D.DropdownMenu>
      </S.SidebarMenuItem>

      <UpdatePasswordDialog
        open={updatePasswordOpen}
        onOpenChange={setUpdatePasswordOpen}
      />
    </S.SidebarMenu>
  );
}
