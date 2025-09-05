'use client';
import {Trash2, Eye, Calendar, User } from 'lucide-react';
import BlogForm from './_components/BlogForm'
// import { getBaseUrl } from '@/utils/getBaseUrl'
import { BlogResponseType, useGetBlogList } from '@/hooks/blogs.hooks'
import { getBaseUrl } from '@/utils/getBaseUrl';
import Image from 'next/image';
// import { Blog } from '@/models/Blog';

export default function BlogsManagementPage() {


  const baseUrl = getBaseUrl()

  console.log(baseUrl)

  const { data, isLoading } = useGetBlogList()
  console.log(data)
  return (
    <div className="p-4">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-sudo-neutral-5 mb-1">
                Blog Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage blog posts, categories, and content
              </p>
            </div>
            <BlogForm />
          </div>
        </div>


        {/* Table */}

        <div className="bg-white rounded-lg shadow-sm border border-sudo-white-2 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              // Loading state
              <div className="text-center py-10">
                <span className="text-sudo-neutral-4 text-sm">Loading...</span>
              </div>
            ) : !data?.results || data.results.length === 0 ? (
              // No data state
              <div className="text-center py-10">
                <span className="text-sudo-neutral-4 text-sm">No data found</span>
              </div>
            ) : (
              // Table when data is available
              <table className="w-full">
                <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Banner</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Author</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Published</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Created At</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.results.map((post: BlogResponseType, index: number) => (
                    <tr
                      key={post._id}
                      className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-sudo-white-1/30"
                        }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-4 font-medium text-sm">
                          {index + 1}
                        </span>
                      </td>

                      {/* Banner */}
                      <td className="py-3 px-4">
                        {post.banner_image ? (
                          <div className="w-16 h-16 relative rounded overflow-hidden">
                            <Image
                              src={typeof post.banner_image === 'string' && post.banner_image.startsWith('http') ? post.banner_image : `${baseUrl}${post.banner_image}`}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <span className="text-sudo-neutral-3 text-xs">No Image</span>
                        )}
                      </td>

                      {/* Title + Tags */}
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-sudo-neutral-5 text-sm">
                            {post.title}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {post?.tags?.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-0.5 bg-sudo-white-2 text-sudo-neutral-4 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {post?.tags && post.tags.length > 2 && (
                              <span className="text-sudo-neutral-3 text-xs">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <User size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">{post.author}</span>
                        </div>
                      </td>

                      {/* Published */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${post.published
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                            }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {post?.createdAt
                              ? new Date(post.createdAt).toLocaleDateString()
                              : "-"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-sudo-blue-6 hover:bg-sudo-blue-1 rounded transition-colors">
                            <Eye size={14} />
                          </button>

                          <BlogForm instance={post} />
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>


        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            {/* Showing {filteredAndSortedPosts.length} of {mockBlogPosts.length} posts */}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-sudo-white-3 rounded-lg text-sudo-neutral-3 hover:bg-sudo-white-1 transition-colors text-sm">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-sudo-purple-6 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1.5 border border-sudo-white-3 rounded-lg text-sudo-neutral-3 hover:bg-sudo-white-1 transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}