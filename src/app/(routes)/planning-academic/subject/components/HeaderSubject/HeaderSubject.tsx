"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { BulkImportButton } from "@/components/shared/Bulkimportbutton";

type HeaderSubjectProps = {
  onCreateClick: () => void;
};

export function HeaderSubject({ onCreateClick }: HeaderSubjectProps) {
  return (
    <div className="container mx-auto pt-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Gestion Asignatura"
          description="Crea, actualiza y elimina las materias academicas."
        />
        <div className="flex gap-3">
          <Button className="flex items-center gap-2" onClick={onCreateClick}>
            <CirclePlus className="h-5 w-5" />
            Registrar
          </Button>
          <BulkImportButton
            endpoint="/subjects/bulk/import"
            queryKey="subjects"
          />
        </div>
      </div>
    </div>
  );
}
