"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface IndustryResponseType {
  _id?: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IndustryQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;   // 👈 allow override
  search?: string;
  [key: string]: any; // allow future extra params
}

export const useGetIndustryList = (params: IndustryQueryParamsType = {}) => {
  // set default ordering
  const finalParams: IndustryQueryParamsType = {
    ordering: "-createdAt", 
    ...params, // allow overrides
  };

  return useQuery({
    queryKey: ["industryList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/industries/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useAddIndustry = () => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/industries/`,
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industryList"] });
    },
  });
};

export const useUpdateIndustry = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/industries/${id}`,
        method: "patch",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industryList"] });
    },
  });
};

export const useDeleteIndustry = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (body: IndustryResponseType) =>
      await axiousResuest({
        url: `/api/industries/${id}/`,
        method: "delete",
        data: body,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industryList"] });
    },
  });
};
