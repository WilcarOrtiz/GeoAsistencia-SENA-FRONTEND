import { FormAcademicGroups } from "../components/FormAcademicGroup";
import { ManagementHeader } from "@/components/shared/ ManagementHeader";

export default function CreateAcademicGroupPage() {
  return (
    <div>
      <ManagementHeader
        title="Registro de Grupos academicos"
        description="Registra la informacion para crear un grupo de clase academico, no olvides asignar el horario de clase"
        backHref="/academic-groups"
      />

      <div className="pl-10 pr-10 ">
        <FormAcademicGroups />
      </div>
    </div>
  );
}
