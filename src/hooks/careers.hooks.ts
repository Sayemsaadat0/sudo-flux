"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface CareerResponseType {
  _id?: string;
  title: string;
  department?: string;
  location?: string;
  type?: "full_time" | "part_time" | "contract" | "internship";
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  status: "open" | "closed";
  createdAt?: string;
  updatedAt?: string;
}

interface CareerQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;   // 👈 allow override
  search?: string;
  department?: string;
  location?: string;
  type?: string;
  status?: string;
  [key: string]: any; // allow future extra params
}

export const useGetCareerList = (params: CareerQueryParamsType = {}) => {
  // set default ordering
  const finalParams: CareerQueryParamsType = {
    ordering: "-createdAt", 
    ...params, // allow overrides
  };

  return useQuery({
    queryKey: ["careerList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/careers/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useGetCareer = (id: string) => {
  return useQuery({
    queryKey: ["career", id],
    queryFn: () => {
      return axiousResuest({
        url: `/api/careers/${id}`,
        method: "get",
      });
    },
    enabled: !!id,
  });
};

export const useAddCareer = () => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (data: CareerResponseType) => {
      return await axiousResuest({
        url: `/api/careers/`,
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careerList"] });
    },
  });
};

export const useUpdateCareer = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (data: CareerResponseType) => {
      return await axiousResuest({
        url: `/api/careers/${id}`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careerList"] });
      queryClient.invalidateQueries({ queryKey: ["career", id] });
    },
  });
};

export const useDeleteCareer = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/api/careers/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careerList"] });
    },
  });
};
