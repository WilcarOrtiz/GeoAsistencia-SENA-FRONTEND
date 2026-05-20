import { Formuser } from "../components/FormUser";
import { ManagementHeader } from "@/components/shared/ ManagementHeader";

export default function CreateUserPage() {
  return (
    <div className="">
      <ManagementHeader
        title="Registro de Usuarios"
        description="Registra la informacion basica de un usuario del sistema, no olvides asignarle un rol"
        backHref="/users"
      />
      <div className="pl-10 pr-10">
        <Formuser />
      </div>
    </div>
  );
}
