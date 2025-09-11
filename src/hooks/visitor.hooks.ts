import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// Types for visitor details
export interface VisitorDetails {
  _id: string
  session_id: string
  session_details: {
    ip_address: string
    location: string
    browser_type: string
    device_type: 'Desktop' | 'Mobile' | 'Tablet'
  }
  analytics: Array<{
    page_name: string
    previous_page: string | null
    page_sections: Array<{
      name: string
      previous_section: string | null
      duration: number
    }>
  }>
  created_at: string
  updated_at: string
}

// Hook to get visitor by ID
export const useGetVisitorById = (id: string) => {
  return useQuery({
    queryKey: ['visitor', id],
    queryFn: async (): Promise<VisitorDetails> => {
      const response = await axios.get(`/api/visitors/${id}`)
      return response.data.data
    },
    enabled: !!id, // Only run query if id exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to update visitor by ID
export const useUpdateVisitor = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ 
      visitorId, 
      data 
    }: { 
      visitorId: string
      data: Partial<VisitorDetails> 
    }) => {
      const response = await axios.put(`/api/visitors/${visitorId}`, data)
      return response.data
    },
    onSuccess: (_, { visitorId }) => {
      // Invalidate and refetch visitor data
      queryClient.invalidateQueries({ queryKey: ['visitor', visitorId] })
      queryClient.invalidateQueries({ queryKey: ['visitors'] })
    },
  })
}

// Hook to delete visitor by ID
export const useDeleteVisitor = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/visitors/${id}`)
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch visitors list
      queryClient.invalidateQueries({ queryKey: ['visitors'] })
    },
  })
}
