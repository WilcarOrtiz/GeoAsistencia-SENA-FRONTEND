import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { DataTable } from "./data-table";
import { columns, Enrollment } from "./columns";

interface ListEnrollmentProps {
  id: string;
  students: Enrollment[];
  isLoading: boolean;
  removeStudents: (ids: string[]) => Promise<void>;
  isRemoving: boolean;
  transferStudents: (ids: string[], toGroupId: string) => Promise<void>;
  isTransferring: boolean;
}

export default function ListEnrollment({
  id,
  students,
  isLoading,
  removeStudents,
  isRemoving,
  transferStudents,
  isTransferring,
}: ListEnrollmentProps) {
  if (isLoading) return <TableSkeleton />;

  return (
    <DataTable
      columns={columns}
      data={students}
      groupId={id}
      onTransfer={transferStudents}
      onRemove={removeStudents}
      isTransferring={isTransferring}
      isRemoving={isRemoving}
    />
  );
}
