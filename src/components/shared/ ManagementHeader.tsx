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

  secondaryButtonLabel?: string;
  secondaryButtonIcon?: LucideIcon;
  onSecondaryButtonClick?: () => void;

  extraActions?: ReactNode;
};

export function ManagementHeader({
  title,
  description,
  backHref,

  buttonLabel,
  buttonIcon: PrimaryIcon,
  onButtonClick,

  secondaryButtonLabel,
  secondaryButtonIcon: SecondaryIcon,
  onSecondaryButtonClick,

  extraActions,
}: ManagementHeaderProps) {
  return (
    <div className="p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* HEADER INFO */}
        <PageHeader
          title={title}
          description={description}
          backHref={backHref}
        />

        {/* ACTIONS */}
        {(extraActions || buttonLabel || secondaryButtonLabel) && (
          <div className="flex flex-wrap items-center gap-3">
            {extraActions}

            {/* SECONDARY BUTTON */}
            {secondaryButtonLabel && onSecondaryButtonClick && (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={onSecondaryButtonClick}
              >
                {SecondaryIcon && <SecondaryIcon className="h-4 w-4" />}
                {secondaryButtonLabel}
              </Button>
            )}

            {/* PRIMARY BUTTON */}
            {buttonLabel && onButtonClick && (
              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={onButtonClick}
              >
                {PrimaryIcon && <PrimaryIcon className="h-4 w-4" />}
                {buttonLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
