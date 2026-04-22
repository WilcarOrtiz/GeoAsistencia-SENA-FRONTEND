"use client";

import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { BulkImportButton } from "@/components/shared/Bulkimportbutton";

type HeaderSubjectProps = {
  onCreateClick: () => void;
};

export function HeaderUserManagement({ onCreateClick }: HeaderSubjectProps) {
  return (
    <div className="container mx-auto pt-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Gestión Usuario"
          description="Gestiona todo lo referente a los usuarios, incluyendo la asignacion de roles"
        />

        <div className="flex flex-wrap justify-between gap-5">
          <BulkImportButton endpoint="/user/bulk/import" queryKey="users" />

          <Button className="flex items-center gap-2" onClick={onCreateClick}>
            <UserRoundPlus className="h-5 w-5" />
            Agregar nuevo usuario
          </Button>
        </div>
      </div>
    </div>
  );
}
