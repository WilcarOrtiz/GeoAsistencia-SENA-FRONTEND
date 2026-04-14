import { PageHeader } from "@/components/shared/PageHeader";
import { FormAcademicGroups } from "../components/FormAcademicGroup";

export default function CreateUserPage() {
  return (
    <div className="container mx-auto pt-4">
      <PageHeader
        title="Registro de Grupos academicos"
        description="Registra la informacion para crear un grupo de clase academico, no olvides asignar el horario de clase "
        backHref="/academic-groups"
      />
      <div className="container mx-auto py-10 ">
        <FormAcademicGroups />
      </div>
    </div>
  );
}
