"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  backHref?: string;
};

export const PageHeader = ({
  title,
  description,
  backHref,
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div>
      {backHref && (
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 -ml-2"
          onClick={() => router.push(backHref)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
      )}
      <h1 className="text-h1">{title}</h1>
      {description && <p className="text-p">{description}</p>}
    </div>
  );
};
