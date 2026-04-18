"use client";

import * as F from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormClassGroupProps } from "./FormAcademicGroup.type";
import { AcademicGroupFields } from "./AcademicGroupFields";
import { useFormAcademicGroups } from "./ useFormAcademicGroups";
import { FormClassSchedules } from "../Schedules/FormClassSchedules";

export function FormAcademicGroups({ classGroup, mode }: FormClassGroupProps) {
  const { form, grupoId, onSubmit } = useFormAcademicGroups(classGroup);

  const isEditing = !!classGroup;
  const isBasicMode = mode === "basic";
  const isScheduleMode = mode === "schedule";

  return (
    <div>
      <F.Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <fieldset disabled={isScheduleMode || (!!grupoId && !isEditing)}>
            <Card className="border border-muted-foreground/20">
              <CardHeader>
                <CardTitle>Información del grupo</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AcademicGroupFields form={form} isEditing={isEditing} />
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 mb-6">
              {(!isEditing || isBasicMode) && (
                <Button type="submit" className="w-full sm:w-auto">
                  Guardar
                </Button>
              )}
            </div>
          </fieldset>
        </form>
      </F.Form>

      <Separator />

      <div className="pt-5">
        {grupoId && (
          <FormClassSchedules grupoId={grupoId} disabled={isBasicMode} />
        )}
      </div>
    </div>
  );
}
