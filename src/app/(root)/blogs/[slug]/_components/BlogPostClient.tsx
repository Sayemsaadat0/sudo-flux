'use client'

import BlogDetails from '../../_components/BlogDetails';
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"

interface BlogPostClientProps {
  post?: any; // Make optional since we'll use API
  slug: string; // Add slug prop
}

const BlogPostClient = ({ post, slug }: BlogPostClientProps) => {
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking(`blog-post-${slug}`, sessionId)

  return (
    <div ref={createSectionRef(`blog-post-${slug}-main`)}>
      <BlogDetails post={post} slug={slug} />
    </div>
  )
}

export default BlogPostClient;
