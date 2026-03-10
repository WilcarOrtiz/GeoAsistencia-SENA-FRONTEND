import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { FC } from "react";

export type IconName = keyof typeof LucideIcons;

export const getIconByName = (name?: string | null): FC<LucideProps> => {
  if (!name) {
    return LucideIcons.HelpCircle;
  }

  const Icon = (LucideIcons as unknown as Record<string, FC<LucideProps>>)[
    name
  ];

  return Icon ?? LucideIcons.HelpCircle;
};
