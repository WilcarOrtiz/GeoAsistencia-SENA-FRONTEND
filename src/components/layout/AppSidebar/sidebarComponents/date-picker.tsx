import { Calendar } from "@/components/ui/calendar";
import * as S from "@/components/ui/sidebar";

export function DatePicker() {
  return (
    <S.SidebarGroup className="group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0 transition-all duration-300 ease-in-out px-0">
      <S.SidebarGroupContent>
        <Calendar className="w-full flex justify-center [&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]" />
      </S.SidebarGroupContent>
    </S.SidebarGroup>
  );
}
