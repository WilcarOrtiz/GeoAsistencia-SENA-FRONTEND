"use client";

import { ManagementHeader } from "@/components/shared/ ManagementHeader";
import { ClassGroupList } from "./components/ListClassGroup/ClassGroupList";
import { useAcademicGroup } from "./hook/useClassGroups";
import { UsersRound } from "lucide-react";

export default function AcademicGroupPage() {
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
        buttonLabel="Registrar Grupo"
        buttonIcon={UsersRound}
        onButtonClick={handleCreate}
      />

      <div className="pl-10 pr-10">
        {" "}
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
          onEdit={handleEdit}
          onDetails={handleDetails}
        />
      </div>
    </div>
  );
}
