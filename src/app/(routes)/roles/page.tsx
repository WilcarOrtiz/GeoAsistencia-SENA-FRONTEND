import { PageHeader } from "@/components/shared/PageHeader";
import ListRolesAndPermission from "./components/ListRolesAndPermission/ListRolesAndPermission";
import { Can } from "@/components/shared/Can";
import { ManagementHeader } from "@/components/shared/ ManagementHeader";

export default function RoleAndPermissionPage() {
  return (
    <Can permission="">
      <ManagementHeader
        title="Roles & Permisos"
        description="Gestion que pueden hacer los usuarios en el sistema"
      />

      <div className="pl-10 pr-10">
        <ListRolesAndPermission />
      </div>
    </Can>
  );
}
