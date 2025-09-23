import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import axiousResuest from "@/lib/axiosRequest";

// ======================
// FAQ Types
// ======================
export interface FaqResponseType {
  _id: string;
  question: string;
  answer: string;
  category: "general" | "about-us" | "career";
  publish: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FaqQueryParamsType {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  publish?: string;
}

// ======================
// FAQ Hooks
// ======================

// Get FAQ List
export const useGetFaqList = (params: FaqQueryParamsType = {}) => {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ["faqList", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      
      if (params.page) searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());
      if (params.search) searchParams.append("search", params.search);
      if (params.category) searchParams.append("category", params.category);
      if (params.publish) searchParams.append("publish", params.publish);

      const queryString = searchParams.toString();
      const url = queryString ? `/api/faq?${queryString}` : "/api/faq";

      return await axiousResuest({
        url,
        method: "get",
        headers: user?.token ? {
          Authorization: `Bearer ${user?.token}`,
        } : {},
      });
    },
  });
};

// Get Single FAQ
export const useGetFaq = (id: string) => {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ["faq", id],
    queryFn: async () => {
      return await axiousResuest({
        url: `/api/faq/${id}`,
        method: "get",
        headers: user?.token ? {
          Authorization: `Bearer ${user?.token}`,
        } : {},
      });
    },
    enabled: !!id,
  });
};

// Add FAQ
export const useAddFaq = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/faq/`,
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
  });
};

// Update FAQ
export const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      return await axiousResuest({
        url: `/api/faq/${id}`,
        method: "patch",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
  });
};

// Delete FAQ
export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async (id: string) => {
      return await axiousResuest({
        url: `/api/faq/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
  });
};
