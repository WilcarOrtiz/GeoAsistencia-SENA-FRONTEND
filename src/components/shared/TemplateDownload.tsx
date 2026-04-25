"use client";

import { Download, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

type DownloadTemplateLinkProps = {
  endpoint: string;
  label: string;
};

export function DownloadTemplateLink({
  endpoint,
  label,
}: DownloadTemplateLinkProps) {
  const { mutate: download, isPending } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.getBlob(endpoint);
      return response;
    },
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob as Blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `plantilla_${label.toLowerCase().replace(/\s+/g, "_")}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error("No se pudo descargar la plantilla");
    },
  });

  return (
    <button
      onClick={() => download()}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Download className="h-3.5 w-3.5" />
      )}
      <span>
        Obtener plantilla:{" "}
        <span className="font-medium text-primary underline underline-offset-4">
          {label}
        </span>
      </span>
    </button>
  );
}
