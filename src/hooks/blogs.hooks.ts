"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface BlogResponseType {
  _id?: string;
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  banner_image: string | File | null;
  createdAt?: string;
  updatedAt?: string;
}




interface BlogQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;   // 👈 allow override
  search?: string;
  author?: string;
  tag?: string;
  published?: boolean;
  [key: string]: any; // allow future extra params
}

export const useGetBlogList = (params: BlogQueryParamsType = {}) => {
  // set default ordering
  const finalParams: BlogQueryParamsType = {
    ordering: "-createdAt", 
    ...params, // allow overrides
  };

  return useQuery({
    queryKey: ["blogList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/blogs/${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

export const useGetBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => {
      return axiousResuest({
        url: `/api/blogs?slug=${slug}&published=true`,
        method: "get",
      });
    },
    enabled: !!slug,
  });
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/blogs/`,
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
    },
  });
};

export const useUpdateBlog = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiousResuest({
        url: `/api/blogs/${id}`,
        method: "patch",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
    },
  });
};

export const useDeleteBlog = (id: string) => {
  const queryClient = useQueryClient();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (body: BlogResponseType) =>
      await axiousResuest({
        url: `/api/blog/${id}/`,
        method: "delete",
        data: body,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
    },
  });
};
