"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useSendEmail = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (formData: {
        firstName: string;
        email: string;
      }) => {   
        return await axiousResuest({
          url: `/api/send/`,
          method: "post",
          data: formData,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sendEmail"] });
      },
    });
  };