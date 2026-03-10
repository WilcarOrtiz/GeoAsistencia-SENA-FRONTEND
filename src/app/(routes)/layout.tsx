import * as B from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "./components/app-sidebar";
import * as S from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <S.SidebarProvider>
      <AppSidebar />
      <S.SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 ...">
          <div className="flex items-center gap-2 px-4">
            <S.SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <B.Breadcrumb>
              <B.BreadcrumbList>
                <B.BreadcrumbItem>
                  <B.BreadcrumbPage>GeoAsistencia</B.BreadcrumbPage>
                </B.BreadcrumbItem>
              </B.BreadcrumbList>
            </B.Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </S.SidebarInset>
    </S.SidebarProvider>
  );
}
