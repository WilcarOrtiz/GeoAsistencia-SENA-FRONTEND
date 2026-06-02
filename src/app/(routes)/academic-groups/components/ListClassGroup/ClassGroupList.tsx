"use client";

import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/shared/Pagination";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";
import { ClassGroupFilters } from "./ClassGroupFilters";
import { ClassGroupGrid } from "./ClassGroupGrid";
import { Can } from "../../../../../components/shared/Can";
import { PERMISSIONS } from "@/constants/permissions";
import { ROLES } from "@/features/roleAndPermission/role.constants";

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
  onEditBasic: ((group: ClassGroup) => void) | undefined;
  onEditSchedule: ((group: ClassGroup) => void) | undefined;
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
      <Can role={ROLES.ADMIN}>
        <ClassGroupFilters
          termInput={filterProps.termInput}
          semester={filterProps.semester}
          subject={filterProps.subject}
          onSearch={filterProps.onSearch}
          onSemesterChange={filterProps.onSemesterChange}
          onSubjectChange={filterProps.onSubjectChange}
        />
      </Can>

      <Separator />
      <Can permission={PERMISSIONS.VER_GRUPOS}>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ClassGroupGrid
            data={data}
            isLoading={filterProps.isLoading}
            onEditBasic={filterProps.onEditBasic}
            onEditSchedule={filterProps.onEditSchedule}
            onDetails={filterProps.onDetails}
          />
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Can>
    </div>
  );
}
