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
import { FormCreateSemester } from "../FormCreateSemester";

export function HeaderSemester() {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  return (
    <div>
      <h1>Lista de semestres</h1>
      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Registrar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear un semestre</DialogTitle>
            <DialogDescription>
              Crea y configura un semestre academico
            </DialogDescription>
          </DialogHeader>

          <FormCreateSemester setOpenModalCreate={setOpenModalCreate} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
