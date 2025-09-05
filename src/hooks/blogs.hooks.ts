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

export const useGetBlogList = () => {
  return useQuery({
    queryKey: ["blogList"],
    queryFn: () =>
      axiousResuest({
        url: `/api/blogs/`,
        method: "get",
      }),
  });
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  // const { data: session }: any = useSession();
  const {user} = useAuthStore()
  return useMutation({
    mutationFn: async (body: BlogResponseType) => {
      // Create FormData object for multipart/form-data
      const formData = new FormData();
      
      // Add all text fields
      formData.append('title', body.title);
      formData.append('content', body.content);
      if (body.author) formData.append('author', body.author);
      if (body.tags && body.tags.length > 0) {
        formData.append('tags', JSON.stringify(body.tags));
      }
      formData.append('published', body.published.toString());
      if (body.metaTitle) formData.append('metaTitle', body.metaTitle);
      if (body.metaDescription) formData.append('metaDescription', body.metaDescription);
      if (body.slug) formData.append('slug', body.slug);
      
      // Add banner image if it's a File object
      if (body.banner_image && body.banner_image instanceof File) {
        formData.append('banner_image', body.banner_image);
      }
      
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
    mutationFn: async (body: BlogResponseType) => {
      // Create FormData object for multipart/form-data
      const formData = new FormData();
      
      // Add all text fields
      formData.append('title', body.title);
      formData.append('content', body.content);
      if (body.author) formData.append('author', body.author);
      if (body.tags && body.tags.length > 0) {
        formData.append('tags', JSON.stringify(body.tags));
      }
      formData.append('published', body.published.toString());
      if (body.metaTitle) formData.append('metaTitle', body.metaTitle);
      if (body.metaDescription) formData.append('metaDescription', body.metaDescription);
      if (body.slug) formData.append('slug', body.slug);
      
      // Add banner image if it's a File object
      if (body.banner_image && body.banner_image instanceof File) {
        formData.append('banner_image', body.banner_image);
      }
      
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
