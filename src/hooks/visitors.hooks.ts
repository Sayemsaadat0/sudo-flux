import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Session, SessionDetails, PageAnalytics } from '@/models/Visitor';

// Types for API responses
interface VisitorResponse {
  success: boolean;
  data: Session;
}

interface VisitorsListResponse {
  success: boolean;
  message: string;
  results: Session[];
  pagination: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total_count: number;
  };
}

// Hook for creating or updating a visitor session
export const useCreateOrUpdateVisitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (visitorData: {
      session_id?: string;
      session_details?: SessionDetails;
      analytics: PageAnalytics[];
    }) => {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create/update visitor session');
      }

      return response.json() as Promise<VisitorResponse>;
    },
    onSuccess: () => {
      // Invalidate and refetch visitor queries
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
    },
  });
};

// Hook for getting a specific visitor session by session_id
export const useGetVisitor = (sessionId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['visitor', sessionId],
    queryFn: async (): Promise<VisitorResponse> => {
      const response = await fetch(`/api/visitors?session_id=${sessionId}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch visitor session');
      }

      return response.json();
    },
    enabled: enabled && !!sessionId,
  });
};

// Hook for getting paginated list of visitor sessions
export const useGetVisitors = (page: number = 1, per_page: number = 10) => {
  return useQuery({
    queryKey: ['visitors', page, per_page],
    queryFn: async (): Promise<VisitorsListResponse> => {
      const response = await fetch(`/api/visitors?page=${page}&per_page=${per_page}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch visitor sessions');
      }

      return response.json();
    },
  });
};

// Utility hook for tracking page analytics
export const usePageAnalytics = () => {
  const createOrUpdateVisitor = useCreateOrUpdateVisitor();

  const trackPageView = async (
    sessionId: string | undefined,
    sessionDetails: SessionDetails,
    pageAnalytics: PageAnalytics[]
  ) => {
    try {
      await createOrUpdateVisitor.mutateAsync({
        session_id: sessionId,
        session_details: sessionDetails,
        analytics: pageAnalytics,
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  const trackSectionView = async (
    sessionId: string | undefined,
    sessionDetails: SessionDetails,
    currentPageName: string,
    currentSection: string,
    previousSection: string | null,
    duration: number
  ) => {
    try {
      // This would typically be called when a user leaves a section
      // You might want to implement more sophisticated tracking logic here
      const pageAnalytics: PageAnalytics[] = [{
        page_name: currentPageName,
        previous_page: null, // You might want to track this as well
        page_sections: [{
          name: currentSection,
          previous_section: previousSection,
          duration: duration
        }]
      }];

      await createOrUpdateVisitor.mutateAsync({
        session_id: sessionId,
        session_details: sessionDetails,
        analytics: pageAnalytics,
      });
    } catch (error) {
      console.error('Failed to track section view:', error);
    }
  };

  return {
    trackPageView,
    trackSectionView,
    isLoading: createOrUpdateVisitor.isPending,
    error: createOrUpdateVisitor.error,
  };
};

// Hook for deleting a specific visitor session
export const useDeleteVisitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await fetch(`/api/visitors/${sessionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete visitor session');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch visitor queries
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
    },
  });
};

// Hook for deleting all visitor sessions
export const useDeleteAllVisitors = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/visitors/delete-all', {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete all visitor sessions');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch visitor queries
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
    },
  });
};

// Hook for getting visitor statistics
export const useVisitorStats = () => {
  const { data: visitorsData } = useGetVisitors(1, 1000); // Get all visitors for stats

  const stats = visitorsData ? {
    totalVisitors: visitorsData.pagination.total_count,
    totalSessions: visitorsData.results.length,
    deviceTypes: visitorsData.results.reduce((acc, visitor) => {
      const deviceType = visitor.session_details.device_type;
      acc[deviceType] = (acc[deviceType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    browserTypes: visitorsData.results.reduce((acc, visitor) => {
      const browserType = visitor.session_details.browser_type;
      acc[browserType] = (acc[browserType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    locations: visitorsData.results.reduce((acc, visitor) => {
      const location = visitor.session_details.location;
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  } : null;

  return {
    stats,
    isLoading: !visitorsData,
  };
};
