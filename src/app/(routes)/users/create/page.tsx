import { PageHeader } from "@/components/shared/PageHeader";
import { Formuser } from "../components/FormUser";

export default function CreateUserPage() {
  return (
    <div className="container mx-auto pt-4">
      <PageHeader
        title="Registro de Usuarios"
        description="Registra la informacion basica de un usuario del sistema, no olvides asignarle un rol"
      />
      <div className="container mx-auto py-10 ">
        <Formuser />
      </div>
    </div>
  );
}
//TODO: hacer lo referente a crear la funcion de reenviar correo de recuperaicon de cuenta a Adminsitrador