import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "../../components/layout/AppSidebar/app-sidebar";
import * as S from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "../../components/shared/DynamicBreadcrumb";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <S.SidebarProvider>
      <AppSidebar />
      <S.SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center justify-between w-full px-4">
            {/* Izquierda */}
            <div className="flex items-center gap-2">
              <S.SidebarTrigger />
              <Separator orientation="vertical" className="h-4" />
              <DynamicBreadcrumb />
            </div>
            {/* Derecha */}
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </S.SidebarInset>
    </S.SidebarProvider>
  );
}
