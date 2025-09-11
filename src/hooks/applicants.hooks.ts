"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface ApplicantResponseType {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resumeFile: string;
  careerId: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt?: string;
  updatedAt?: string;
  career_details?: {
    _id: string;
    title: string;
    department?: string;
    location?: string;
    type?: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

interface ApplicantQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;   // 👈 allow override
  search?: string;
  status?: string;
  careerId?: string;
  [key: string]: any; // allow future extra params
}

export const useGetApplicantList = (params: ApplicantQueryParamsType = {}) => {
  // set default ordering
  const finalParams: ApplicantQueryParamsType = {
    ordering: "-createdAt", 
    ...params, // allow overrides
  };

  return useQuery({
    queryKey: ["applicantList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/applicants/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useGetApplicant = (id: string) => {
  return useQuery({
    queryKey: ["applicant", id],
    queryFn: () => {
      return axiousResuest({
        url: `/api/applicants/${id}`,
        method: "get",
      });
    },
    enabled: !!id,
  });
};

export const useAddApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/applicants/`,
        method: "post",
        data: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicantList"] });
    },
  });
};

export const useUpdateApplicant = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (data: Partial<ApplicantResponseType>) => {
      return await axiousResuest({
        url: `/api/applicants/${id}`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicantList"] });
      queryClient.invalidateQueries({ queryKey: ["applicant", id] });
    },
  });
};

export const useDeleteApplicant = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/api/applicants/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicantList"] });
    },
  });
};
