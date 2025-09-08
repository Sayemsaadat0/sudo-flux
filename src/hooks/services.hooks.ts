"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface ServiceResponseType {
  _id?: string;
  title: string;
  subTitle: string;
  statsString: string;
  description: string;
  benefits: string[];
  category: {
    _id: string;
    name: string;
    status: 'active' | 'inactive';
  };
  createdAt?: string;
  updatedAt?: string;
}

interface ServiceQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;
  search?: string;
  category?: string;
  [key: string]: any;
}

export const useGetServiceList = (params: ServiceQueryParamsType = {}) => {
  const finalParams: ServiceQueryParamsType = {
    ordering: "-createdAt", 
    ...params,
  };

  return useQuery({
    queryKey: ["serviceList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/services/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useAddService = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (data: {
      title: string;
      subTitle: string;
      statsString: string;
      description: string;
      benefits: string[];
      category: string;
    }) => {
      return await axiousResuest({
        url: `/api/services/`,
        method: "post",
        data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceList"] });
    },
  });
};

export const useUpdateService = (id: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (data: {
      title: string;
      subTitle: string;
      statsString: string;
      description: string;
      benefits: string[];
      category: string;
    }) => {
      return await axiousResuest({
        url: `/api/services/${id}`,
        method: "patch",
        data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceList"] });
    },
  });
};

export const useDeleteService = (id: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/api/services/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceList"] });
    },
  });
};
