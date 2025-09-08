"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface ConsultationResponseType {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

interface ConsultationQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;
  search?: string;
  status?: string;
  projectType?: string;
  [key: string]: any;
}

export const useGetConsultationList = (params: ConsultationQueryParamsType = {}) => {
  const finalParams: ConsultationQueryParamsType = {
    ordering: "-createdAt", 
    ...params,
  };

  return useQuery({
    queryKey: ["consultationList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/consultations/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useSubmitPublicConsultation = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      company?: string;
      projectType: string;
      budget: string;
      timeline: string;
      description: string;
    }) => {
      return await axiousResuest({
        url: `/api/consultations/`,
        method: "post",
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  });
};

export const useAddConsultation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      company?: string;
      projectType: string;
      budget: string;
      timeline: string;
      description: string;
      status?: 'new' | 'in-progress' | 'completed' | 'cancelled';
    }) => {
      return await axiousResuest({
        url: `/api/consultations/`,
        method: "post",
        data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationList"] });
    },
  });
};

export const useUpdateConsultation = (id: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      company?: string;
      projectType: string;
      budget: string;
      timeline: string;
      description: string;
      status?: 'new' | 'in-progress' | 'completed' | 'cancelled';
    }) => {
      return await axiousResuest({
        url: `/api/consultations/${id}`,
        method: "patch",
        data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationList"] });
    },
  });
};

export const useDeleteConsultation = (id: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/api/consultations/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationList"] });
    },
  });
};
