import { ApiResponse } from "@/types";
import { AxiosInstance, AxiosRequestConfig } from "axios";

export function createApiHelpers(axiosInstance: AxiosInstance) {
  return {
    get: async <T = unknown>(url: string) => {
      const response = await axiosInstance.get<ApiResponse<T>>(url);
      return response.data;
    },

    getBlob: async (url: string) => {
      const response = await axiosInstance.get(url, { responseType: "blob" });
      return response.data as Blob;
    },

    post: async <T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ) => {
      const response = await axiosInstance.post<ApiResponse<T>>(
        url,
        data,
        config,
      );
      return response.data;
    },

    patch: async <T = unknown>(url: string, data?: unknown) => {
      const response = await axiosInstance.patch<ApiResponse<T>>(url, data);
      return response.data;
    },

    delete: async <T = unknown>(url: string) => {
      const response = await axiosInstance.delete<ApiResponse<T>>(url);
      return response.data;
    },
  };
}
