'use client';

import { Calendar, Clock, ArrowLeft, Tag, BookOpen, User } from 'lucide-react';
import Link from 'next/link';
import AnimatedImage from '@/components/animations/AnimatedImage';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnailUrl: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorAvatar: string;
  tags: string[];
}

interface BlogDetailsProps {
  post: BlogPost;
}

const BlogDetails = ({ post }: BlogDetailsProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sudo-white-1 via-sudo-white-2 to-sudo-white-1">
      {/* Hero Section */}
      <div className="relative bg-sudo-neutral-6">
        {/* Backdrop Image */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedImage
            src={post.thumbnailUrl}
            alt={post.title}
            width={1920}
            height={600}
            className="w-full h-full object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sudo-neutral-6/90 via-sudo-neutral-6/95 to-sudo-neutral-6"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 sudo-container pt-24 pb-20">
          {/* Back Button */}
          <div className="mb-12">
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-3 text-sudo-white-3 hover:text-white transition-all duration-300 group"
            >
              <div className="p-2 rounded-full bg-sudo-neutral-5/20 group-hover:bg-sudo-blue-6 transition-colors duration-300">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-medium">Back to Blog</span>
            </Link>
          </div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Category Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-sudo-blue-6 text-white text-sm font-semibold rounded-full shadow-lg">
                <BookOpen className="w-4 h-4" />
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-8 text-white">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sudo-white-3 text-base">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-sudo-neutral-5/20">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-sudo-neutral-5/20">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="font-medium">{post.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-sudo-neutral-5/20">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-medium">{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="sudo-container py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-12">
                <article className="prose prose-lg max-w-none">
                  <div 
                    className="text-sudo-neutral-5 leading-relaxed space-y-8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </article>
              </div>

              {/* Tags Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-sudo-blue-1">
                    <Tag className="w-5 h-5 text-sudo-blue-6" />
                  </div>
                  <h3 className="text-xl font-bold text-sudo-neutral-6">Article Tags</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-sudo-white-2 text-sudo-neutral-6 text-sm font-medium rounded-full hover:bg-sudo-blue-6 hover:text-white transition-all duration-300 cursor-pointer border border-sudo-white-3"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

                         {/* Sidebar */}
             <div className="lg:col-span-1">
               {/* Related Articles Card */}
               <div className="bg-white rounded-3xl shadow-xl p-8">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-full bg-sudo-neutral-1">
                     <BookOpen className="w-5 h-5 text-sudo-neutral-6" />
                   </div>
                   <h3 className="text-xl font-bold text-sudo-neutral-6">Related Articles</h3>
                 </div>
                 <div className="space-y-4">
                   <div className="p-4 bg-sudo-white-2 rounded-xl hover:bg-sudo-white-3 transition-colors duration-300 cursor-pointer">
                     <h4 className="font-semibold text-sudo-neutral-6 text-sm mb-2 line-clamp-2">
                       The Future of Web Development: AI-Powered Tools
                     </h4>
                     <p className="text-xs text-sudo-neutral-4">5 min read</p>
                   </div>
                   <div className="p-4 bg-sudo-white-2 rounded-xl hover:bg-sudo-white-3 transition-colors duration-300 cursor-pointer">
                     <h4 className="font-semibold text-sudo-neutral-6 text-sm mb-2 line-clamp-2">
                       Building Scalable Microservices Architecture
                     </h4>
                     <p className="text-xs text-sudo-neutral-4">8 min read</p>
                   </div>
                   <div className="p-4 bg-sudo-white-2 rounded-xl hover:bg-sudo-white-3 transition-colors duration-300 cursor-pointer">
                     <h4 className="font-semibold text-sudo-neutral-6 text-sm mb-2 line-clamp-2">
                       Digital Marketing Strategies That Drive Growth
                     </h4>
                     <p className="text-xs text-sudo-neutral-4">6 min read</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
