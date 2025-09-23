"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface LegalDocument {
  _id: string;
  type: "privacy" | "terms" | "license";
  title: string;
  content: string;
  version: string;
  isActive: boolean;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegalListResponse {
  success: boolean;
  message: string;
  results: LegalDocument[];
  total: number;
}

export interface LegalResponse {
  success: boolean;
  message: string;
  legal: LegalDocument;
}

export interface CreateLegalData {
  type: "privacy" | "terms" | "license";
  title: string;
  content: string;
  version?: string;
  isActive?: boolean;
}

export interface UpdateLegalData extends CreateLegalData {
  _id: string;
}

interface LegalQueryParamsType {
  type?: string;
  isActive?: boolean;
  [key: string]: any; // allow future extra params
}

export const useGetLegalList = (params: LegalQueryParamsType = {}) => {
  return useQuery({
    queryKey: ["legalList", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/legal/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useGetLegal = (id: string) => {
  return useQuery({
    queryKey: ["legal", id],
    queryFn: () => {
      return axiousResuest({
        url: `/api/legal/${id}`,
        method: "get",
      });
    },
    enabled: !!id,
  });
};

export const useGetActiveLegal = (type: "privacy" | "terms" | "license") => {
  return useQuery({
    queryKey: ["legalActive", type],
    queryFn: () => {
      return axiousResuest({
        url: `/api/legal?type=${type}&isActive=true`,
        method: "get",
      });
    },
  });
};

export const useAddLegal = () => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (data: CreateLegalData) => {
      return await axiousResuest({
        url: `/api/legal/`,
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legalList"] });
    },
  });
};

export const useUpdateLegal = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (data: UpdateLegalData) => {
      return await axiousResuest({
        url: `/api/legal/${id}`,
        method: "put",
        data: data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legalList"] });
    },
  });
};

export const useDeleteLegal = () => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (id: string) =>
      await axiousResuest({
        url: `/api/legal/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legalList"] });
    },
  });
};
