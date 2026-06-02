"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as DM from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, RefreshCw } from "lucide-react";
import { Props } from "./ClassGroupCard.type";

export function ClassGroupCard({
  id,
  code,
  name,
  subject,
  semester,
  teacher,
  total_students,
  max_students,
  total_sessions,
  is_active,
  onEditBasic,
  onEditSchedule,
  onDetails,
}: Props) {
  const percentage = (total_students / max_students) * 100;

  return (
    <Card
      onDoubleClick={() => onDetails()}
      className="rounded-2xl shadow-sm border p-4 space-y-4"
    >
      <CardContent className="p-0 space-y-4">
        <div className="flex justify-between items-start relative">
          <div>
            <p className="text-xs text-muted-foreground">
              {total_sessions} sesiones
            </p>
            <h2 className="text-xl font-semibold leading-tight">{name}</h2>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Badge
              className={
                is_active
                  ? "border border-green-500/30 bg-green-500/10 text-green-700"
                  : "border border-muted bg-muted text-muted-foreground"
              }
            >
              {is_active ? "ACTIVE" : "INACTIVE"}
            </Badge>

            {(onEditBasic || onEditSchedule) && (
              <DM.DropdownMenu>
                <DM.DropdownMenuTrigger
                  onClick={(e) => e.stopPropagation()}
                  asChild
                >
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DM.DropdownMenuTrigger>
                <DM.DropdownMenuContent align="end">
                  <DM.DropdownMenuLabel>Acciones</DM.DropdownMenuLabel>

                  {onEditBasic && (
                    <DM.DropdownMenuItem onClick={onEditBasic}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar información
                    </DM.DropdownMenuItem>
                  )}

                  {onEditSchedule && (
                    <DM.DropdownMenuItem onClick={onEditSchedule}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Editar horarios
                    </DM.DropdownMenuItem>
                  )}
                </DM.DropdownMenuContent>
              </DM.DropdownMenu>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">{subject}</Badge>
          <Badge variant="outline">{semester}</Badge>
        </div>

        <div className="flex justify-between items-center bg-muted p-3 rounded-xl">
          <div>
            <p className="text-xs text-muted-foreground">INSTRUCTOR</p>
            <p className="font-medium">{teacher}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              Alumnos Matriculados
            </p>
            <p className="font-semibold">
              {total_students} / {max_students}
            </p>
          </div>
        </div>

        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
