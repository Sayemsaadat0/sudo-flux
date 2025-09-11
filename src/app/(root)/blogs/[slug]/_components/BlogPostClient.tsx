'use client'

import BlogDetails from '../../_components/BlogDetails';
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"

interface BlogPostClientProps {
  post: any;
}

const BlogPostClient = ({ post }: BlogPostClientProps) => {
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking(`blog-post-${post.slug}`, sessionId)

  return (
    <div ref={createSectionRef(`blog-post-${post.slug}-main`)}>
      <BlogDetails post={post} />
    </div>
  )
}

export default BlogPostClient;
