"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

type HeaderSemesterProps = {
  onCreateClick: () => void;
};

export function HeaderSemester({ onCreateClick }: HeaderSemesterProps) {
  return (
    <div className="container mx-auto pt-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Gestion semestres"
          description="Crea, actualiza y cambia el estado a los semestres academicos"
        />
        <Button className="flex items-center gap-2" onClick={onCreateClick}>
          <CirclePlus className="h-5 w-5" />
          Registrar
        </Button>
      </div>
    </div>
  );
}
