import { PageHeader } from "@/components/shared/PageHeader";
import ListRolesAndPermission from "./components/ListRolesAndPermission/ListRolesAndPermission";
import { Can } from "@/components/shared/Can";

export default function RoleAndPermissionPage() {
  return (
    <Can permission="gestionar_roles">
      <div className="container mx-auto pt-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <PageHeader
            title="Roles & Permisos"
            description="Gestion que pueden hacer los usuarios en el sistema"
          />
        </div>
        <ListRolesAndPermission />
      </div>
    </Can>
  );
}
