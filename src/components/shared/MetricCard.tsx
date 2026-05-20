// components/shared/MetricCard.tsx

import { LucideIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface MetricCardProps {
  title: string;
  value: string | number;

  icon?: LucideIcon;

  badge?: string;

  description?: string;

  footerTitle?: string;
  footerSubtitle?: string;

  extra?: string;

  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  badge,
  description,
  footerTitle,
  footerSubtitle,
  extra,
  className,
}: MetricCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        {description ? (
          <CardDescription>{description}</CardDescription>
        ) : (
          <CardTitle className="text-xs uppercase flex justify-between">
            {title}

            {Icon && <Icon className="w-4 h-4" />}
          </CardTitle>
        )}

        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {value}
          </CardTitle>

          {badge && Icon && (
            <CardAction>
              <Badge variant="outline">
                <Icon className="size-3 mr-1" />
                {badge}
              </Badge>
            </CardAction>
          )}
        </div>
      </CardHeader>

      {extra && (
        <CardContent>
          <span className="text-sm text-muted-foreground">{extra}</span>
        </CardContent>
      )}

      {(footerTitle || footerSubtitle) && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {footerTitle && (
            <div className="line-clamp-1 flex gap-2 font-medium">
              {footerTitle}
            </div>
          )}

          {footerSubtitle && (
            <div className="text-muted-foreground">{footerSubtitle}</div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
