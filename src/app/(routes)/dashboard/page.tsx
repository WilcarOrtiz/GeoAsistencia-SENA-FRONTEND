"use client";

import { useDashboard } from "./hook/useDashboard";
import { DashboardCards } from "./components/DashboardCards";

import { SubjectsRankingTable } from "./components/SubjectsRankingTable";
import { StudentsAbsencesTable } from "./components/StudentsAbsencesTable";
import { AttendanceDonut } from "./components/AttendanceDonut";
import { DashboardFilters } from "./components/DashboardFilters";
import { AttendanceBarChart } from "./components/AttendanceBarChart";
import { PERMISSIONS } from "@/constants/permissions";
import { Can } from "@/components/shared/Can";
import { usePermissions } from "@/hooks/usePermission";
import { ROLES } from "@/features/roleAndPermission/role.constants";
import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";

export default function DashboardPage() {
  const { hasRole } = usePermissions();
  const isAdmin = hasRole(ROLES.ADMIN);
  const {
    overview,
    attendance,
    distribution,
    subjectsRanking,
    studentsAbsences,
    isLoading,
    handleSemesterFilter,
    handleTeacherFilter,
    handleSubjectFilter,
    resetFilters,
    filters,
  } = useDashboard(isAdmin);

  return (
    <Can permission={PERMISSIONS.VER_REPORTES}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {isAdmin && (
              <DashboardFilters
                filters={filters}
                onSemesterChange={handleSemesterFilter}
                onTeacherChange={handleTeacherFilter}
                onSubjectChange={handleSubjectFilter}
                onReset={resetFilters}
              />
            )}
            {isLoading ? (
              <DashboardSkeleton />
            ) : (
              <>
                <DashboardCards overview={overview} isLoading={false} />

                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <AttendanceBarChart data={attendance} isLoading={false} />
                  </div>
                  <div>
                    <AttendanceDonut data={distribution} isLoading={false} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-2">
                  <StudentsAbsencesTable
                    data={studentsAbsences}
                    isLoading={false}
                    isAdmin={isAdmin}
                  />
                  <SubjectsRankingTable
                    data={subjectsRanking}
                    isLoading={false}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Can>
  );
}
