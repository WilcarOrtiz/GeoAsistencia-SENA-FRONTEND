"use client";

import { useDashboard } from "./hook/useDashboard";
import { DashboardCards } from "./components/DashboardCards";

import { SubjectsRankingTable } from "./components/SubjectsRankingTable";
import { StudentsAbsencesTable } from "./components/StudentsAbsencesTable";
import { AttendanceDonut } from "./components/AttendanceDonut";
import { DashboardFilters } from "./components/DashboardFilters";
import { AttendanceBarChart } from "./components/AttendanceBarChart";

const ROLE = "ADMIN"; // o "TEACHER"

export default function DashboardPage() {
  const {
    overview,
    attendance,
    distribution,
    subjectsRanking,
    studentsAbsences,
    isLoading,
    isAdmin,
    handleSemesterFilter,
    handleTeacherFilter,
    handleSubjectFilter,
    resetFilters,
  } = useDashboard(ROLE);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Filtros — solo admin */}
          {isAdmin && (
            <DashboardFilters
              onSemesterChange={handleSemesterFilter}
              onTeacherChange={handleTeacherFilter}
              onSubjectChange={handleSubjectFilter}
              onReset={resetFilters}
            />
          )}

          {/* Cards */}
          <DashboardCards overview={overview} isLoading={isLoading} />

          {/* Gráficas */}
          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AttendanceBarChart data={attendance} isLoading={isLoading} />
            </div>
            <div>
              <AttendanceDonut data={distribution} isLoading={isLoading} />
            </div>
          </div>

          {/* Tablas */}
          <div
            className={`grid grid-cols-1 gap-4 px-4 lg:px-6 ${isAdmin ? "lg:grid-cols-2" : ""}`}
          >
            <StudentsAbsencesTable
              data={studentsAbsences}
              isLoading={isLoading}
              isAdmin={isAdmin}
            />
            {isAdmin && (
              <SubjectsRankingTable
                data={subjectsRanking}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
