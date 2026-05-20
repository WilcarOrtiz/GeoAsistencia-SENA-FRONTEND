"use client";

import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/shared/Pagination";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";
import { ClassGroupFilters } from "./ClassGroupFilters";
import { ClassGroupGrid } from "./ClassGroupGrid";

interface Props {
  data: ClassGroup[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  termInput: string;
  semester: string;
  subject: string;
  onSearch: (value: string) => void;
  onSemesterChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  isLoading: boolean;
  onEdit: (group: ClassGroup, type: "basic" | "schedule") => void;
  onDetails: (group: ClassGroup) => void;
}

export function ClassGroupList({
  data,
  total,
  page,
  limit,
  onPageChange,
  ...filterProps
}: Props) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <ClassGroupFilters
        termInput={filterProps.termInput}
        semester={filterProps.semester}
        subject={filterProps.subject}
        onSearch={filterProps.onSearch}
        onSemesterChange={filterProps.onSemesterChange}
        onSubjectChange={filterProps.onSubjectChange}
      />

      <Separator />

      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ClassGroupGrid
          onDetails={filterProps.onDetails}
          data={data}
          isLoading={filterProps.isLoading}
          onEdit={filterProps.onEdit}
        />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
