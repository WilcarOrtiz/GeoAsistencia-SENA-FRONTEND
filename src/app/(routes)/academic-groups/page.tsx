"use client";

import { HeaderAcademicGroups } from "./components/HeaderAcademicGroups";
import { ClassGroupList } from "./components/ListClassGroup/ClassGroupList";
import { useAcademicGroup } from "./hook/useClassGroups";

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

    handleCreate,
  } = useAcademicGroup();

  return (
    <div className="">
      <HeaderAcademicGroups onCreateClick={handleCreate} />

      <div className="container mx-auto py-10">
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
        />
      </div>
    </div>
  );
}

/*useClassGroups.ts     → CRUD de grupos (listar, crear, editar, eliminar)
useEnrollments.ts     → matricular, dar de baja, transferir estudiantes
useClassSessions.ts   → sesiones de clase, abrir/cerrar asistencia*/
