"use client";

import { HeaderAcademicGroups } from "./components/HeaderAcademicGroups";
import { useAcademicGroup } from "./hook/useClassGroups";

export default function AcademicGroupPage() {
  const { handleCreate } = useAcademicGroup();
  
  return (
    <div>
      <HeaderAcademicGroups onCreateClick={handleCreate} />
    </div>
  );
}

<div className="container mx-auto py-10"></div>;

/*useClassGroups.ts     → CRUD de grupos (listar, crear, editar, eliminar)
useEnrollments.ts     → matricular, dar de baja, transferir estudiantes
useClassSessions.ts   → sesiones de clase, abrir/cerrar asistencia*/
