"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface CategoryResponseType {
  _id?: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;
  search?: string;
  status?: string;
  [key: string]: any;
}

export const useGetCategoryList = (params: CategoryQueryParamsType = {}) => {
  const finalParams: CategoryQueryParamsType = {
    ordering: "-createdAt", 
    ...params,
  };

  return useQuery({
    queryKey: ["categoryList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/categories/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useGetActiveCategories = () => {
  return useQuery({
    queryKey: ["activeCategories"],
    queryFn: () => {
      return axiousResuest({
        url: "/api/categories?status=active&per_page=100",
        method: "get",
      });
    },
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (data: { name: string; status?: 'active' | 'inactive' }) => {
      return await axiousResuest({
        url: `/api/categories/`,
        method: "post",
        data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      queryClient.invalidateQueries({ queryKey: ["activeCategories"] });
    },
  });
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (data: { name: string; status?: 'active' | 'inactive' }) => {
      return await axiousResuest({
        url: `/api/categories/${id}`,
        method: "patch",
        data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      queryClient.invalidateQueries({ queryKey: ["activeCategories"] });
    },
  });
};

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/api/categories/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      queryClient.invalidateQueries({ queryKey: ["activeCategories"] });
    },
  });
};
