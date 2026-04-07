"use client";

import { Button } from "@/components/ui/button";
import { Upload, UserRoundPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

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
          
          <Button
            variant="success"
            className="flex items-center gap-2"
            onClick={onCreateClick}
          >
            <Upload className="h-5 w-5" />
            Importar CSV/Excel
          </Button>
          <Button className="flex items-center gap-2" onClick={onCreateClick}>
            <UserRoundPlus className="h-5 w-5" />
            Agregar nuevo usuario
          </Button>
        </div>
      </div>
    </div>
  );
}
