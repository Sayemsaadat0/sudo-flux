import Button from "../ui/button";
import BlogCard from "../core/cards/BlogCard";
import LineAnimation from "../animations/LineAnimation";
import Link from "next/link";
import { formatDatestamp } from "@/lib/timeStamp";
import { useGetBlogList } from "@/hooks/blogs.hooks";

const BlogSection = () => {
  // Use API hook to fetch blogs
  const { data: blogData, isLoading, error } = useGetBlogList({
    per_page: 6,
    published: true,
    ordering: "-createdAt"
  });

  // Use API data
  const blogs = blogData?.results || [];
  // Map API data to card format
  const mapped = blogs.map((b : any) => ({
    title: b.title,
    description: b.metaDescription || b.content?.slice(0, 140) + "...",
    thumbnailUrl: b.banner_image || "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
    category: b.tags?.[0] || "General",
    date: b.createdAt ? formatDatestamp(b.createdAt) : "",
    readTime: "3 min read",
    author: b.author || "",
    link: b.slug ? `/blogs/${b.slug}` : "#",
  }));

  return (
    <div>
      <div className="sudo-container  space-y-10  py-20">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center items-center mx-auto w-fit">
            <h4 className="uppercase font-bold">Our Expertise, Your Success</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48  md:leading-[60px] text-sudo-neutral-6 font-heading md:w-2/3 mx-auto text-center">Our Latest Blogs
          </h2>
        </div>

        <div className="space-y-12 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sudo-blue-6 mx-auto mb-4"></div>
              <p className="text-sudo-neutral-4">Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Failed to load blogs</p>
              <p className="text-sudo-neutral-4">Please try again later</p>
            </div>
          ) : mapped.length > 0 ? (
            <>
              <div className="grid gap-10 grid-cols-1 md:grid-cols-3 ">
                {mapped.map((item : any, index : number) => (
                  <BlogCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    thumbnailUrl={item.thumbnailUrl}
                    category={item.category}
                    date={item.date}
                    readTime={item.readTime}
                    author={item.author}
                    link={item.link}
                  />
                ))}
              </div>

              <Link href={'/blogs'} className="py-3">
                <Button label="Explore more" />
              </Link>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-sudo-neutral-4">No blogs available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default BlogSection

