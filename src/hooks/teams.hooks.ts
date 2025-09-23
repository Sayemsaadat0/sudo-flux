"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface TeamResponseType {
  _id?: string;
  name: string;
  image?: string;
  title: string;
  linkedin?: string;
  status: "current" | "former";
  createdAt?: string;
  updatedAt?: string;
}

interface TeamQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;
  search?: string;
  title?: string;
  status?: string;
  [key: string]: any;
}

export const useGetTeamList = (params: TeamQueryParamsType = {}) => {
  const finalParams: TeamQueryParamsType = {
    ordering: "-createdAt", 
    ...params,
  };

  return useQuery({
    queryKey: ["teamList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/teams/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useGetTeam = (id: string) => {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => {
      return axiousResuest({
        url: `/api/teams/${id}`,
        method: "get",
      });
    },
    enabled: !!id,
  });
};

export const useAddTeam = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/teams/`,
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamList"] });
    },
  });
};

export const useUpdateTeam = (id: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/teams/${id}`,
        method: "patch",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamList"] });
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (id: string) => {
      return await axiousResuest({
        url: `/api/teams/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamList"] });
    },
  });
};