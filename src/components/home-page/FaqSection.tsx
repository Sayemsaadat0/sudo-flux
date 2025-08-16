import AccordionItem from "../animations/AccordionItem";
import AnimatedImage from "../animations/AnimatedImage";
import LineAnimation from "../animations/LineAnimation";


// --- FAQ DATA (Stays the same) ---
const supportFaqs = [
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee on all our products. If you're not satisfied for any reason, just contact our support team within 30 days of purchase for a full refund."
  },
  {
    question: "How do I update my billing information?",
    answer: "You can update your billing information directly from your account dashboard. Simply log in, navigate to the 'Billing' section, and follow the on-screen instructions to update your payment method."
  },
  {
    question: "Can I use the product on multiple websites?",
    answer: (
      <>
        <p>This depends on the license you purchase. Our <strong>Standard License</strong> is for a single website, while our <strong>Pro License</strong> allows for use on up to 5 websites.</p>
        <p className="mt-2">For more than 5 sites, please <a href="/contact" className="text-blue-600 hover:underline">contact our sales team</a> for an enterprise solution.</p>
      </>
    )
  },
  {
    question: "Where can I find my license key?",
    answer: "Your license key is sent to you via email immediately after purchase. You can also find it at any time by logging into your account and visiting the 'My Licenses' page."
  }
];

// --- THE PAGE COMPONENT WITH THE REVISED LAYOUT ---
const FaqSection = () => {
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
                className="border-blue-100" // Custom border color
                questionClassName="font-bold font-heading hover:bg-blue-50 text-base sm:text-lg" // Custom question colors
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