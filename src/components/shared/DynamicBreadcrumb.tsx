"use client";

import { usePathname } from "next/navigation";
import * as B from "@/components/ui/breadcrumb";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  roles: "Roles",
  semesters: "Semestres",
  semester: "Semestre",
  students: "Estudiantes",
  subject: "Asignaturas",
  edit: "Editar",
  create: "Crear",
  "planning-academic": "Planeación Académica",
};

function isId(segment: string) {
  const uuidRegex = /^[0-9a-f-]{36}$/i;
  const numberRegex = /^\d+$/;
  return uuidRegex.test(segment) || numberRegex.test(segment);
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => !isId(s));

  return (
    <B.Breadcrumb>
      <B.BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          return (
            <span key={segment} className="flex items-center gap-2">
              <B.BreadcrumbItem>
                {isLast ? (
                  <B.BreadcrumbPage>
                    {LABELS[segment] ?? segment}
                  </B.BreadcrumbPage>
                ) : (
                  <B.BreadcrumbLink
                    href={`/${segments.slice(0, index + 1).join("/")}`}
                  >
                    {LABELS[segment] ?? segment}
                  </B.BreadcrumbLink>
                )}
              </B.BreadcrumbItem>
              {!isLast && <B.BreadcrumbSeparator />}
            </span>
          );
        })}
      </B.BreadcrumbList>
    </B.Breadcrumb>
  );
}
