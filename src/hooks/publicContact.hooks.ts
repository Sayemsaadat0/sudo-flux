"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useMutation } from "@tanstack/react-query";

export interface PublicContactFormData {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export const useSubmitPublicContact = () => {
  return useMutation({
    mutationFn: async (data: PublicContactFormData) => {
      return await axiousResuest({
        url: `/api/contact/`,
        method: "post",
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  });
};
