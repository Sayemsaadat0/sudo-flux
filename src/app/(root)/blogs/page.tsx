'use client'

import BlogCard from "@/components/core/cards/BlogCard"
import LineAnimation from "@/components/animations/LineAnimation"
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"
import { useGetBlogList } from "@/hooks/blogs.hooks"
import { formatDatestamp } from "@/lib/timeStamp"
import { useState } from "react"

const Blogs = () => {
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking('blogs-page', sessionId)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(12)

  // Fetch blogs from API
  const { data: blogData, isLoading, error, isFetching } = useGetBlogList({
    page: currentPage,
    per_page: perPage,
    published: true,
    ordering: "-createdAt"
  })

  const blogs = blogData?.results || []
  const totalPages = blogData?.totalPages || 1

  // Map API data to card format
  const mappedBlogs = blogs.map((blog : any) => ({
    id: blog._id,
    thumbnailUrl: blog.banner_image || "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
    title: blog.title,
    description: blog.metaDescription || blog.content?.slice(0, 140) + "...",
    link: blog.slug ? `/blogs/${blog.slug}` : "#",
    category: blog.tags?.[0] || "General",
    date: blog.createdAt ? formatDatestamp(blog.createdAt) : "",
    readTime: "5 min read", // You can calculate this based on content length
    author: blog.author || "Admin"
  }))

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        {/* Header Section */}
        <div ref={createSectionRef('blogs-header-section')} className="text-center space-y-5 mb-10 ">
          {/* Subtitle with Line Animation */}
          <div className="flex justify-center ">
            <div className="space-y-5 gap-3">
              <h4 className="uppercase font-bold text-sm sm:text-base text-sudo-neutral-4">
                Our Blog
              </h4>
              <div className="w-16 sm:w-20">
                <LineAnimation />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6 ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-sudo-header-56 xl:text-sudo-header-60 font-heading font-bold leading-tight tracking-tight">
              <span className="text-sudo-neutral-6">Insights &</span>
              <br />
              <span className="gradient-text-static bg-gradient-to-r from-sudo-purple-3 via-sudo-blue-3 to-sudo-purple-3 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-sudo-paragraph-20 text-sudo-neutral-5 max-w-3xl mx-auto leading-relaxed font-light">
              Discover the latest trends, insights, and stories from our team of experts. 
              From technology to design, we share knowledge that drives innovation.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div ref={createSectionRef('blogs-grid-section')} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-sudo-white-2 rounded-2xl p-6 animate-pulse">
                <div className="w-full h-48 bg-sudo-white-3 rounded-xl mb-4"></div>
                <div className="h-4 bg-sudo-white-3 rounded mb-2"></div>
                <div className="h-4 bg-sudo-white-3 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-sudo-white-3 rounded w-1/2"></div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 mb-4">Failed to load blogs</p>
              <p className="text-sudo-neutral-4">Please try again later</p>
            </div>
          ) : mappedBlogs.length > 0 ? (
            mappedBlogs.map((post : any) => (
              <BlogCard
                key={post.id}
                thumbnailUrl={post.thumbnailUrl}
                title={post.title}
                description={post.description}
                link={post.link}
                category={post.category}
                date={post.date}
                readTime={post.readTime}
                author={post.author}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-sudo-neutral-4">No blogs available at the moment.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {mappedBlogs.length > 0 && currentPage < totalPages && (
          <div ref={createSectionRef('blogs-load-more-section')} className="text-center mt-16 sm:mt-20">
            <button 
              onClick={handleLoadMore}
              disabled={isFetching}
              className="inline-flex items-center gap-2 bg-sudo-blue-6 text-white px-8 py-4 rounded-full font-semibold hover:bg-sudo-blue-7 transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isFetching ? 'Loading...' : 'Load More Articles'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs