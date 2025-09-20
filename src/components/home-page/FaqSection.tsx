import AccordionItem from "../animations/AccordionItem";
import AnimatedImage from "../animations/AnimatedImage";
import LineAnimation from "../animations/LineAnimation";

// Props from server - Updated to match API response structure
export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: "general" | "about-us" | "career";
  publish: boolean;
  createdAt: string;
  updatedAt: string;
}

// API response structure
export interface FaqApiResponse {
  success: boolean;
  data: {
    result: FaqItem[];
    total: number;
  };
  pagination?: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total_count: number;
  };
}

interface FaqSectionProps {
  faqs: FaqApiResponse | FaqItem[]; // Support both API response and direct array
}

// --- THE PAGE COMPONENT WITH THE REVISED LAYOUT ---
const FaqSection = ({ faqs }: FaqSectionProps) => {
  // Helper function to extract FAQ items from either API response or direct array
  const getFaqItems = (): FaqItem[] => {
    // Check if it's an API response object
    if (faqs && typeof faqs === 'object' && 'data' in faqs) {
      const apiResponse = faqs as FaqApiResponse;
      return apiResponse.data?.result || [];
    }
    // Otherwise, treat as direct array
    return Array.isArray(faqs) ? faqs : [];
  };

  // Get FAQ items and filter only published ones
  const faqItems = getFaqItems().filter(faq => faq.publish);

  // Map FAQ data to AccordionItem format
  const supportFaqs = faqItems.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  // Handle empty state
  if (supportFaqs.length === 0) {
    return (
      <section className="bg-sudo-white-1 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="sudo-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-sudo-neutral-6 font-heading mb-4">
              FAQ
            </h2>
            <p className="text-sudo-neutral-4">No frequently asked questions available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sudo-white-1 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="sudo-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* --- LEFT COLUMN: IMAGE --- */}
          <div className="xl:sticky xl:top-24 w-full order-2 xl:order-1">
            <AnimatedImage
              className="rounded-xl shadow-lg w-full h-full object-cover"
              src="https://placehold.co/400x400/1e1e1e/FFFFFF/png?text=Your\nImage\nHere"
              width={600}
              height={600}
              alt="FAQ illustration"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
              layout="responsive"
              aspectRatio="portrait"
              containerClassName="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px]"
            />
          </div>

          {/* --- RIGHT COLUMN: CONTENT + ACCORDION --- */}
          <div className="order-1 xl:order-2">
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <div className="w-fit mb-4">
                <h4 className="uppercase font-bold text-sm sm:text-base text-sudo-neutral-4">Have Question?</h4>
                <div className="w-2/4">
                  <LineAnimation />
                </div>
              </div>
              <h2 className="text-sudo-title-28 lg:text-sudo-title-48  md:leading-[60px]text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-sudo-title-48 text-sudo-neutral-6 font-heading leading-tight">
                FAQ
              </h2>
            </div>

            {/* --- FAQ ACCORDION --- */}
            <div className="space-y-3 sm:space-y-4">
              <AccordionItem
                faqs={supportFaqs}
                className="border-blue-100"
                questionClassName="font-bold font-heading hover:bg-blue-50 text-base sm:text-lg"
                itemClassName="rounded-lg border border-gray-200 bg-white shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;