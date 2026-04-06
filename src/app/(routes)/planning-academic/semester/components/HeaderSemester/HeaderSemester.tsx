"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormSemester } from "../FormSemester";

export function HeaderSemester() {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  return (
    <div className="container mx-auto pt-4">
      {" "}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <PageHeader
          title="Gestión semestres"
          description="Crea, actualiza y cambia el estado a los semestres académicos"
        />
        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <CirclePlus className="w-5 h-5" />
              Registrar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Crear un semestre</DialogTitle>
              <DialogDescription>
                Crea y configura un semestre academico
              </DialogDescription>
            </DialogHeader>

            <FormSemester setOpenModalCreate={setOpenModalCreate} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
