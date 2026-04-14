"use client";

import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

type HeaderSubjectProps = {
  onCreateClick: () => void;
};

export function HeaderAcademicGroups({ onCreateClick }: HeaderSubjectProps) {
  return (
    <div className="container mx-auto pt-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Gestión de grupos academicos"
          description="Registra, elimina, actualiza los grupos de clase por semestre"
        />

        <div className="flex flex-wrap justify-between gap-5">
          <Button className="flex items-center gap-2" onClick={onCreateClick}>
            <UserRoundPlus className="h-5 w-5" />
            Registrar Grupo
          </Button>
        </div>
      </div>
    </div>
  );
}

//TODO: debo revisar lo del condicional segun el usuario
