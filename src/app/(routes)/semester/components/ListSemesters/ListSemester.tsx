"use client";

import { Semester } from "@/features/semester/semester.type";
import { columns } from "./columns";
import { DataTable } from "./date-table";
import { apiClient } from "@/lib/api/api_client";
import { useEffect, useState } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { PaginatedData } from "@/types/api";

export default function ListSemesters() {
  const [data, setData] = useState<Semester[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiClient.get<PaginatedData<Semester>>(
          `/semester?page=${page}&limit=${limit}`,
        );

        console.log(data.data)
        setData(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (isLoading) return <TableSkeleton />;
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
