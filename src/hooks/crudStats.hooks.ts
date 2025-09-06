import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import axiousResuest from "@/lib/axiosRequest";

// ======================
// CRUD Stats Types
// ======================
export interface CrudStatsResponseType {
  blogs: number;
  industries: number;
  contacts: number;
  faqs: number;
  total: number;
}

// ======================
// CRUD Stats Hooks
// ======================

// Get CRUD Length Stats
export const useGetCrudLengthStats = () => {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ["crudLengthStats"],
    queryFn: async () => {
      return await axiousResuest({
        url: "/api/crudLengthStats",
        method: "get",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    enabled: !!user?.token,
  });
};
