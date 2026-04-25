"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useClassGroupTransferOptions } from "@/hooks/ApiList";

interface TransferModalProps {
  open: boolean;
  onClose: () => void;
  selectedCount: number;
  currentGroupId: string;
  onConfirm: (toGroupId: string) => Promise<void>;
  isLoading: boolean;
}

export function TransferModal({
  open,
  onClose,
  selectedCount,
  currentGroupId,
  onConfirm,
  isLoading,
}: TransferModalProps) {
  const [targetGroupId, setTargetGroupId] = useState("");
  const { data: groups, loading } =
    useClassGroupTransferOptions(currentGroupId);

  const availableGroups = groups.filter((g) => g.id !== currentGroupId);

  const handleConfirm = async () => {
    if (!targetGroupId) return;
    await onConfirm(targetGroupId);
    setTargetGroupId("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transferir estudiantes</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Se transferirán{" "}
          <span className="font-semibold text-foreground">{selectedCount}</span>{" "}
          estudiante(s) al grupo seleccionado.
        </p>

        <Select value={targetGroupId} onValueChange={setTargetGroupId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona grupo destino" />
          </SelectTrigger>
          <SelectContent>
            {availableGroups.map((g) => (
              <SelectItem key={g.id} value={g.id}>
                {g.name} ({g.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!targetGroupId || isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
