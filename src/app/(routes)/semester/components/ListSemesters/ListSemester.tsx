"use client"; // 👈

import { Semester } from "@/types/semester.type";
import { columns } from "./columns";
import { DataTable } from "./date-table";
import { apiClient } from "@/lib/api/api_client";
import { useEffect, useState } from "react";

type PaginatedSemesters = {
  data: Semester[];
  total: number;
  limit: number;
  page: number;
};

export default function ListSemesters() {
  const [data, setData] = useState<Semester[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); // 👈
  const [isLoading, setIsLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<PaginatedSemesters>(
          `/semester?page=${page}&limit=${limit}`,
        );
        setData(res.data.data);
        setTotal(res.data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (isLoading) return <div>Cargando...</div>;

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
