"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  id: string;
  code: string;
  name: string;
  subject: string;
  semester: string;
  teacher: string;
  total_students: number;
  max_students: number;
  is_active: boolean;
};

export function ClassGroupCard({
  id,
  code,
  name,
  subject,
  semester,
  teacher,
  total_students,
  max_students,
  is_active,
}: Props) {
  const percentage = (total_students / max_students) * 100;

  return (
    <Card className="rounded-2xl shadow-sm border p-4 space-y-4">
      <CardContent className="p-0 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground">ID: #{id}</p>
            <h2 className="text-xl font-semibold leading-tight">{name}</h2>
          </div>

          <div className="text-right space-y-1">
            <Badge
              variant="secondary"
              className={
                is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }
            >
              {is_active ? "ACTIVE" : "INACTIVE"}
            </Badge>

            <p className="text-primary font-semibold">{code}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">{subject}</Badge>
          <Badge variant="outline">{semester}</Badge>
        </div>

        {/* Instructor + Enrollment */}
        <div className="flex justify-between items-center bg-muted p-3 rounded-xl">
          <div>
            <p className="text-xs text-muted-foreground">INSTRUCTOR</p>
            <p className="font-medium">{teacher}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">ENROLLMENT</p>
            <p className="font-semibold">
              {total_students} / {max_students}
            </p>
          </div>
        </div>

        {/* Progress bar */}
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
