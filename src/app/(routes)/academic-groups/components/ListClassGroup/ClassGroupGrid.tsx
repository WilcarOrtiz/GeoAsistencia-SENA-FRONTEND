import { ClassGroup } from "@/features/classGroup/ClassGroup.type";
import { ClassGroupCard } from "../ClassGroupCard/ClassGroupCard";
import { ClassGroupCardSkeleton } from "@/components/shared/ClassGroupCardSkeleton";

type Props = {
  data: ClassGroup[];
  isLoading: boolean;
  onEditBasic: ((group: ClassGroup) => void) | undefined;
  onEditSchedule: ((group: ClassGroup) => void) | undefined;
  onDetails: (group: ClassGroup) => void;
};

const SKELETON_COUNT = 6;

export function ClassGroupGrid({
  data,
  isLoading,
  onEditBasic,
  onEditSchedule,
  onDetails,
}: Props) {
  if (isLoading && data.length === 0) {
    return (
      <>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ClassGroupCardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (data.length === 0) {
    return (
      <p className="text-center col-span-full text-muted-foreground">
        No hay resultados
      </p>
    );
  }

  return (
    <>
      {data.map((group) => (
        <ClassGroupCard
          key={group.id}
          total_sessions={group.total_sessions}
          id={group.id}
          code={group.code}
          name={group.name}
          subject={group.subject?.name ?? ""}
          semester={group.semester?.name ?? ""}
          teacher={group.teacher?.name ?? ""}
          total_students={group.total_students ?? 0}
          max_students={group.max_students ?? 0}
          is_active={group.is_active}
          onEditBasic={onEditBasic ? () => onEditBasic(group) : undefined}
          onEditSchedule={
            onEditSchedule ? () => onEditSchedule(group) : undefined
          }
          onDetails={() => onDetails(group)}
        />
      ))}
    </>
  );
}
