import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sudo-white-1 flex items-center justify-center">
      <div className="sudo-container text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* 404 Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-sudo-blue-6 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-sudo-neutral-6">
              Blog Post Not Found
            </h1>
            <p className="text-lg sm:text-xl text-sudo-neutral-5 leading-relaxed">
{`            Sorry, the blog post you're looking for doesn't exist or has been moved.
`}            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-sudo-blue-6 text-white px-6 py-3 rounded-full font-semibold hover:bg-sudo-blue-7 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-sudo-neutral-4 text-sudo-neutral-6 px-6 py-3 rounded-full font-semibold hover:bg-sudo-white-2 transition-colors duration-300"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
