"use client";

import axiousResuest from "@/lib/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { SessionDetails, PageAnalytics } from "@/models/Visitor";

export interface VisitorResponseType {
  _id?: string;
  session_id: string;
  session_details: SessionDetails;
  analytics: PageAnalytics[];
  created_at?: string;
  updated_at?: string;
}

interface VisitorQueryParamsType {
  page?: number;
  per_page?: number;
  ordering?: string;
  search?: string;
  session_id?: string;
  [key: string]: any; // allow future extra params
}

// Hook to get paginated list of visitors
export const useGetVisitorList = (params: VisitorQueryParamsType = {}) => {
  // set default ordering
  const finalParams: VisitorQueryParamsType = {
    ordering: "-created_at", 
    ...params, // allow overrides
  };

  return useQuery({
    queryKey: ["visitorList", finalParams],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      const url = `/api/visitors${queryString ? `?${queryString}` : ""}`;

      return axiousResuest({
        url,
        method: "get",
      });
    },
  });
};

// Hook to get visitor by session_id
export const useGetVisitorBySessionId = (sessionId: string) => {
  return useQuery({
    queryKey: ["visitor", sessionId],
    queryFn: () => {
      return axiousResuest({
        url: `/api/visitors?session_id=${sessionId}`,
        method: "get",
      });
    },
    enabled: !!sessionId,
  });
};

// Hook to get visitor by MongoDB _id
export const useGetVisitorById = (id: string) => {
  return useQuery({
    queryKey: ["visitor", id],
    queryFn: () => {
      return axiousResuest({
        url: `/api/visitors/${id}`,
        method: "get",
      });
    },
    enabled: !!id,
  });
};

// Hook to create or update visitor session
export const useCreateOrUpdateVisitor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (visitorData: {
      session_id?: string;
      session_details?: SessionDetails;
      analytics: PageAnalytics[];
    }) => {
      return await axiousResuest({
        url: `/api/visitors`,
        method: "post",
        data: visitorData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorList"] });
      queryClient.invalidateQueries({ queryKey: ["visitor"] });
    },
  });
};

// Hook to update visitor session details
export const useUpdateVisitorDetails = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      session_id: string;
      session_details: SessionDetails;
      analytics?: PageAnalytics[];
    }) => {
      console.log('🔧 useUpdateVisitorDetails - mutationFn called with data:', data);
      
      try {
        console.log('📡 Making API call to /api/visitors/details-update');
        const result = await axiousResuest({
          url: `/api/visitors/details-update`,
          method: "post",
          data,
        });
        
        console.log('✅ useUpdateVisitorDetails - API call successful:', result);
        return result;
      } catch (error) {
        console.error('❌ useUpdateVisitorDetails - API call failed:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('🎉 useUpdateVisitorDetails - onSuccess triggered:', data);
      queryClient.invalidateQueries({ queryKey: ["visitorList"] });
      queryClient.invalidateQueries({ queryKey: ["visitor"] });
      console.log('🔄 useUpdateVisitorDetails - Cache invalidated');
    },
    onError: (error) => {
      console.error('💥 useUpdateVisitorDetails - onError triggered:', error);
    },
  });
};

// Hook to update visitor by session_id
export const useUpdateVisitor = (sessionId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<VisitorResponseType>) => {
      return await axiousResuest({
        url: `/api/visitors/${sessionId}`,
        method: "put",
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorList"] });
      queryClient.invalidateQueries({ queryKey: ["visitor", sessionId] });
    },
  });
};

// Hook to delete visitor by session_id
export const useDeleteVisitor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sessionId: string) => {
      return await axiousResuest({
        url: `/api/visitors/${sessionId}`,
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorList"] });
    },
  });
};

// Hook to delete all visitors (admin only)
export const useDeleteAllVisitors = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: async () => {
      return await axiousResuest({
        url: `/api/visitors/delete-all`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorList"] });
    },
  });
};

// Hook to update section tracking
export const useUpdateVisitorSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      session_id: string;
      page_name: string;
      section_name: string;
      previous_section: string | null;
      duration: number;
    }) => {
      return await axiousResuest({
        url: `/api/visitors/update-section`,
        method: "post",
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitor"] });
    },
  });
};

// Hook to get visitor statistics
export const useVisitorStats = () => {
  const { data: visitorsData, isLoading } = useGetVisitorList({ per_page: 1000 });

  const stats = visitorsData?.results ? {
    totalVisitors: visitorsData.pagination?.total_count || 0,
    totalSessions: visitorsData.results.length,
    deviceTypes: visitorsData.results.reduce((acc: Record<string, number>, visitor: any) => {
      const deviceType = visitor.session_details?.device_type || 'Unknown';
      acc[deviceType] = (acc[deviceType] || 0) + 1;
      return acc;
    }, {}),
    browserTypes: visitorsData.results.reduce((acc: Record<string, number>, visitor: any) => {
      const browserType = visitor.session_details?.browser_type || 'Unknown';
      acc[browserType] = (acc[browserType] || 0) + 1;
      return acc;
    }, {}),
    locations: visitorsData.results.reduce((acc: Record<string, number>, visitor: any) => {
      const location = visitor.session_details?.location || 'Unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {}),
  } : null;

  return {
    stats,
    isLoading,
  };
};