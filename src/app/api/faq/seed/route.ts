import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Faq } from "@/models/Faq";

// ======================
// POST /api/faq/seed
// - Seed FAQ data for testing
// ======================
export async function POST() {
  try {
    // Clear existing FAQs
    await Faq.deleteMany({});

    // Create sample FAQ data
    const sampleFaqs = [
      {
        question: "What services do you offer?",
        answer: "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, digital marketing, and consulting services.",
        category: "general",
        publish: true
      },
      {
        question: "How long does a typical project take?",
        answer: "Project timelines vary depending on complexity. A simple website typically takes 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during our consultation.",
        category: "general",
        publish: true
      },
      {
        question: "Do you offer ongoing support?",
        answer: "Yes, we provide comprehensive ongoing support and maintenance services for all our projects. This includes bug fixes, updates, security patches, and feature enhancements.",
        category: "about-us",
        publish: true
      },
      {
        question: "What technologies do you work with?",
        answer: "We work with modern technologies including React, Next.js, Node.js, Python, MongoDB, PostgreSQL, AWS, and many others. We stay updated with the latest industry trends.",
        category: "about-us",
        publish: true
      },
      {
        question: "Are you hiring developers?",
        answer: "We're always looking for talented developers to join our team. Please check our careers page for current openings or send us your resume directly.",
        category: "career",
        publish: true
      },
      {
        question: "What is your pricing model?",
        answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project scope and requirements.",
        category: "general",
        publish: false // This one is a draft
      }
    ];

    // Insert sample data
    const createdFaqs = await Faq.insertMany(sampleFaqs);

    return NextResponse.json(
      { 
        success: true, 
        message: `${createdFaqs.length} FAQs seeded successfully`, 
        count: createdFaqs.length
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding FAQs", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed FAQs" },
      { status: 500 }
    );
  }
}
