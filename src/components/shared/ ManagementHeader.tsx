"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";

type ManagementHeaderProps = {
  title: string;
  description: string;

  backHref?: string;

  buttonLabel?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void;

  extraActions?: ReactNode;
};

export function ManagementHeader({
  title,
  description,
  backHref,

  buttonLabel,
  buttonIcon: Icon,
  onButtonClick,

  extraActions,
}: ManagementHeaderProps) {
  return (
    <div className="p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title={title}
          description={description}
          backHref={backHref}
        />

        {(extraActions || buttonLabel) && (
          <div className="flex flex-wrap justify-between gap-5">
            {extraActions}

            {buttonLabel && onButtonClick && (
              <Button
                className="flex items-center gap-2"
                onClick={onButtonClick}
              >
                {Icon && <Icon className="h-5 w-5" />}
                {buttonLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
