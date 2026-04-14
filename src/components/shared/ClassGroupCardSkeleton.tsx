"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ClassGroupCardSkeleton() {
  return (
    <Card className="rounded-2xl shadow-sm border p-4 space-y-4">
      <CardContent className="p-0 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-40" />
          </div>

          <div className="space-y-2 flex flex-col items-end">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        {/* Instructor + Enrollment */}
        <div className="flex justify-between items-center bg-muted p-3 rounded-xl">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="space-y-2 text-right">
            <Skeleton className="h-3 w-24 ml-auto" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        </div>

        {/* Progress bar */}
        <Skeleton className="h-2 w-full rounded-full" />
      </CardContent>
    </Card>
  );
}
