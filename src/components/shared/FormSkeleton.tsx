import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FormSkeletonProps {
  fields?: number;
}

export function FormSkeleton({ fields = 4 }: FormSkeletonProps) {
  return (
    <div className="space-y-6">
      <Card className="border border-muted-foreground/20">
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-full sm:w-[120px]" />
      </div>
    </div>
  );
}
