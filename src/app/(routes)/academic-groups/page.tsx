"use client";

import { ManagementHeader } from "@/components/shared/ ManagementHeader";
import { ClassGroupList } from "./components/ListClassGroup/ClassGroupList";
import { useAcademicGroup } from "./hook/useClassGroups";
import { UsersRound } from "lucide-react";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermission";

export default function AcademicGroupPage() {
  const { can } = usePermissions();

  const {
    groups,
    total,
    page,
    limit,
    setPage,
    isLoading,
    termInput,
    semester,
    subject,
    handleSearch,
    handleSemesterFilter,
    handleSubjectFilter,
    handleEdit,
    handleDetails,
    handleCreate,
  } = useAcademicGroup();

  return (
    <div className="">
      <ManagementHeader
        title="Gestión de grupos academicos"
        description="Registra, elimina, actualiza los grupos de clase por semestre"
        buttonLabel={
          can(PERMISSIONS.CREAR_GRUPO) ? "Registrar grupo academico" : undefined
        }
        buttonIcon={UsersRound}
        onButtonClick={handleCreate}
      />

      <div className="pl-10 pr-10">
        <ClassGroupList
          isLoading={isLoading}
          data={groups}
          total={total}
          page={page}
          limit={limit}
          onPageChange={setPage}
          termInput={termInput}
          semester={semester}
          subject={subject}
          onSearch={handleSearch}
          onSemesterChange={handleSemesterFilter}
          onSubjectChange={handleSubjectFilter}
          onEditBasic={
            can(PERMISSIONS.EDITAR_GRUPO)
              ? (g) => handleEdit(g, "basic")
              : undefined
          }
          onEditSchedule={
            can(PERMISSIONS.GESTIONAR_HORARIOS)
              ? (g) => handleEdit(g, "schedule")
              : undefined
          }
          onDetails={handleDetails}
        />
      </div>
    </div>
  );
}
