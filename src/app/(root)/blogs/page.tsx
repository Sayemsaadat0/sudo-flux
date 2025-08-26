import BlogCard from "@/components/core/cards/BlogCard"
import LineAnimation from "@/components/animations/LineAnimation"

// Sample blog data
const blogPosts = [
  {
    id: 1,
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    title: "The Future of Web Development: AI-Powered Tools and Automation",
    description: "Discover how artificial intelligence is revolutionizing web development, from automated code generation to intelligent debugging tools that are reshaping the industry landscape.",
    link: "/blogs/future-web-development-ai",
    category: "Technology",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    author: "Sarah Johnson"
  },
  {
    id: 2,
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    title: "Designing for Accessibility: Creating Inclusive Digital Experiences",
    description: "Learn the essential principles of accessible design and how to create digital products that work for everyone, regardless of their abilities or disabilities.",
    link: "/blogs/designing-accessibility",
    category: "Design",
    date: "Dec 12, 2024",
    readTime: "7 min read",
    author: "Michael Chen"
  },
  {
    id: 3,
    thumbnailUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
    title: "Building Scalable Microservices Architecture: Best Practices",
    description: "Explore the fundamentals of microservices architecture and learn proven strategies for building scalable, maintainable, and resilient applications.",
    link: "/blogs/microservices-architecture",
    category: "Development",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    author: "David Rodriguez"
  },
  {
    id: 4,
    thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    title: "Digital Marketing Strategies That Drive Real Business Growth",
    description: "Uncover effective digital marketing strategies that go beyond vanity metrics to deliver measurable business results and sustainable growth.",
    link: "/blogs/digital-marketing-strategies",
    category: "Marketing",
    date: "Dec 8, 2024",
    readTime: "6 min read",
    author: "Emily Watson"
  },
  {
    id: 5,
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    title: "Cybersecurity in 2024: Protecting Your Digital Assets",
    description: "Stay ahead of evolving cyber threats with the latest security practices and technologies that protect your business and customer data.",
    link: "/blogs/cybersecurity-2024",
    category: "Security",
    date: "Dec 5, 2024",
    readTime: "9 min read",
    author: "Alex Thompson"
  },
  {
    id: 6,
    thumbnailUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    title: "User Experience Design: Creating Products People Love",
    description: "Master the art of UX design with proven methodologies and techniques that create intuitive, engaging, and user-centered digital products.",
    link: "/blogs/ux-design-methodology",
    category: "UX Design",
    date: "Dec 3, 2024",
    readTime: "6 min read",
    author: "Lisa Park"
  },
  {
    id: 7,
    thumbnailUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    title: "Mobile App Development: Native vs Cross-Platform Solutions",
    description: "Compare native and cross-platform mobile development approaches to choose the best solution for your next mobile application project.",
    link: "/blogs/mobile-app-development",
    category: "Mobile",
    date: "Nov 30, 2024",
    readTime: "7 min read",
    author: "Robert Kim"
  },
  {
    id: 8,
    thumbnailUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
    title: "Cloud Computing Trends: What's Next in 2024",
    description: "Explore the latest trends in cloud computing, from edge computing to serverless architectures, and how they're transforming business operations.",
    link: "/blogs/cloud-computing-trends",
    category: "Cloud",
    date: "Nov 28, 2024",
    readTime: "5 min read",
    author: "Jennifer Lee"
  }
];

const Blogs = () => {
  return (
    <div className="min-h-screen bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        {/* Header Section */}
        <div className="text-center space-y-5 mb-10 ">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {blogPosts.map((post) => (
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
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16 sm:mt-20">
          <button className="inline-flex items-center gap-2 bg-sudo-blue-6 text-white px-8 py-4 rounded-full font-semibold hover:bg-sudo-blue-7 transition-colors duration-300 shadow-lg hover:shadow-xl">
            <span>Load More Articles</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blogs