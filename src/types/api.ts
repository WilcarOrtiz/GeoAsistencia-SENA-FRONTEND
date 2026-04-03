export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  data: T[];
  total: number;
  limit: number;
  page: number;
}
