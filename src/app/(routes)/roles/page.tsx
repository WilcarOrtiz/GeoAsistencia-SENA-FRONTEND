import ListRolesAndPermission from "./components/ListRolesAndPermission/ListRolesAndPermission";
import { ManagementHeader } from "@/components/shared/ ManagementHeader";
import { Can } from "../../../components/shared/Can";
import { PERMISSIONS } from "@/constants/permissions";

export default function RoleAndPermissionPage() {
  return (
    <div>
      <Can permission={PERMISSIONS.MANAGE_ROLE}>
        <ManagementHeader
          title="Roles & Permisos"
          description="Gestion que pueden hacer los usuarios en el sistema"
        />
        <div className="pl-10 pr-10">
          <ListRolesAndPermission />
        </div>
      </Can>
    </div>
  );
}
