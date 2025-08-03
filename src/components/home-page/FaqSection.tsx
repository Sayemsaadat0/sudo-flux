import AccordionItem from "../animations/AccordionItem";
import AnimatedImage from "../animations/AnimatedImage";


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
    <section className="bg-sudo-white-1 py-16 md:py-24 ">
      <div className="sudo-container mx-auto px-4">

        {/* --- TWO-COLUMN GRID LAYOUT --- */}
        {/* We now start directly with the grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  items-start">
          
          {/* --- LEFT COLUMN: IMAGE (ALONE) --- */}
          {/* For a nice effect on desktop, we can make the image sticky */}
          <div className="lg:sticky lg:top-24 w-full">
            <AnimatedImage
              className="rounded-xl shadow-lg w-full h-auto object-cover"
              src="https://placehold.co/400x400/1e1e1e/FFFFFF/png?text=Your\nImage\nHere"
              width={600}
              height={600}
              alt="FAQ illustration"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
            />
          </div>

          {/* --- RIGHT COLUMN: CONTENT + ACCORDION --- */}
          <div>
            {/* --- HEADER CONTENT IS NOW MOVED HERE --- */}
            {/* Styling is adjusted for left-alignment */}
            <div className="mb-10">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Have Questions?
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>
            
            {/* --- FAQ ACCORDION --- */}
            <AccordionItem
              faqs={supportFaqs}
              // Pass custom styling directly to the accordion list if needed
              className="border-blue-100" // Custom border color
              questionClassName="text-blue-900 hover:bg-blue-50" // Custom question colors
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;