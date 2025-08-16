// src/components/AccordionItem.tsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';

interface FAQItemData {
    question: string;
    answer: React.ReactNode;
}

interface AccordionItemProps {
    title?: string;
    faqs: FAQItemData[];
    defaultOpenIndex?: number | null;
    className?: string;
    titleClassName?: string;
    itemClassName?: string;
    questionClassName?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    faqs,
    defaultOpenIndex = 0,
    className,
    titleClassName,
    itemClassName,
    questionClassName,
}) => {
    // No changes to state or animation logic
    const [activeIndex, setActiveIndex] = useState<number | null>(defaultOpenIndex);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleItemClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        faqs.forEach((_, index) => {
            const contentEl = contentRefs.current[index];
            const iconEl = iconRefs.current[index];
            const isActive = activeIndex === index;

            if (contentEl && iconEl) {
                gsap.killTweensOf([contentEl, iconEl]);
                gsap.to(contentEl, {
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                    duration: 0.4,
                    ease: 'power3.inOut',
                });
                gsap.to(iconEl, {
                    rotate: isActive ? 45 : 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        });
    }, [activeIndex, faqs]);

    return (
        <section className={clsx('w-full max-w-4xl mx-auto', className)}>
            {title && <h2 className={clsx('text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 text-gray-900', titleClassName)}>
                {title}
            </h2>}
            
            {/* --- CHANGE 1: Create a new wrapper div with spacing --- */}
            {/* This div will hold the list of cards and add space between them */}
            <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;
                    return (
                        // --- CHANGE 2: These styles are now applied to EACH item in the map ---
                        // This creates the individual card effect.
                        <div
                            key={index}
                            className={clsx(
                                'rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md',
                                itemClassName // Your custom class can still override styles
                            )}
                        >
                            <h3 className="m-0">
                                <button
                                    type="button"
                                    onClick={() => handleItemClick(index)}
                                    className={clsx(
                                        'flex w-full items-center justify-between text-left py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8',
                                        'font-semibold text-base sm:text-lg md:text-xl text-gray-800 hover:bg-gray-50 transition-colors duration-200',
                                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                        questionClassName
                                    )}
                                    aria-expanded={isActive}
                                    aria-controls={`faq-content-${index}`}
                                >
                                    <span className="flex-1 pr-3 sm:pr-4 text-left leading-relaxed">{faq.question}</span>
                                    <div
                                        ref={(el) => { iconRefs.current[index] = el; }}
                                        className="flex-shrink-0 p-1"
                                    >
                                        <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 transition-colors duration-200" />
                                    </div>
                                </button>
                            </h3>
                            <div
                                ref={(el) => { contentRefs.current[index] = el; }}
                                id={`faq-content-${index}`}
                                className="h-0 overflow-hidden opacity-0"
                                style={{ height: 0, willChange: 'height, opacity' }}
                            >
                                <div className="text-gray-600 leading-relaxed py-3 sm:py-4 px-4 sm:px-6 md:px-8 text-sm sm:text-base">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default AccordionItem;