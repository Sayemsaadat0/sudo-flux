'use client'

import { useParams, useRouter } from 'next/navigation'
import { useGetVisitorById, useDeleteVisitor } from '@/hooks/visitor.hooks'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import VisitorAnalyticsTable from './_components/VisitorAnalyticsTable'
import VisitorDetailsCard from './_components/VisitorDetailsCard'
import Button from '@/components/ui/button'

const VisitorDetailsPage = () => {
  const params = useParams()
  const router = useRouter()
  const visitorId = params.id as string

  const { data: visitor, isLoading, error } = useGetVisitorById(visitorId)
  const deleteVisitorMutation = useDeleteVisitor()

  const handleDelete = async () => {
    if (!visitor) return

    if (confirm('Are you sure you want to delete this visitor? This action cannot be undone.')) {
      try {
        await deleteVisitorMutation.mutateAsync(visitorId)
        toast.success('Visitor deleted successfully')
        router.push('/admin/visitors')
      } catch (error) {
        toast.error('Failed to delete visitor')
        console.error('Delete error:', error)
      }
    }
  }


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-500 text-lg">Error loading visitor details</div>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  if (!visitor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-gray-500 text-lg">Visitor not found</div>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outlineBtn"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Visitor Details</h1>
            <p className="text-gray-600">Session ID: {visitor.session_id}</p>
          </div>
        </div>
        
        <Button
          variant="primarybtn"
          size="sm"
          onClick={handleDelete}
          disabled={deleteVisitorMutation.isPending}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Visitor
        </Button>
      </div>

      {/* Visitor Details Card */}
      <VisitorDetailsCard visitor={visitor} />

      {/* Analytics Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Analytics Data</h2>
          <p className="text-sm text-gray-600">
            Complete tracking data for this visitor session
          </p>
        </div>
        <div className="p-6">
          <VisitorAnalyticsTable analytics={visitor.analytics} />
        </div>
      </div>
    </div>
  )
}

export default VisitorDetailsPage