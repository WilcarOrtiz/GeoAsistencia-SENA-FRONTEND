import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEnrollments } from "@/app/(routes)/academic-groups/hook/useEnrollment";

export default function ListEnrollment({ id }: { id: string }) {
  const {
    students,
    isLoading,
    removeStudents,
    isRemoving,
    transferStudents,
    isTransferring,
  } = useEnrollments(id);

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
