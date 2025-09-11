"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface TeamResponseType {
  _id?: string;
  name: string;
  title: string;
  image: string;
  bio?: string;
  socials: {
    name: string;
    url: string;
  }[];
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TeamQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;   // 👈 allow override
  search?: string;
  isActive?: boolean;
  [key: string]: any; // allow future extra params
}

export const useGetTeamList = (params: TeamQueryParamsType = {}) => {
  // set default ordering
  const finalParams: TeamQueryParamsType = {
    ordering: "order", 
    isActive: true,
    ...params, // allow overrides
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
      const url = `/api/teams${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useAddTeam = () => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
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
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/teams/${id}`,
        method: "put",
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

export const useDeleteTeam = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (body: TeamResponseType) =>
      await axiousResuest({
        url: `/api/teams/${id}/`,
        method: "delete",
        data: body,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamList"] });
    },
  });
};
