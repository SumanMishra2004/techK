"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Who can participate in Tech Kurukshetra?",
    answer: "Students from any university or college with a valid ID card can participate. We welcome participants from all backgrounds, whether you're a coder, designer, or just enthusiastic about tech."
  },
  {
    question: "Is there a registration fee?",
    answer: "No, participation in the core hackathon is completely free! However, some specific workshops or side events might have a nominal fee to cover materials."
  },
  {
    question: "What is the team size?",
    answer: "Teams can consist of 2 to 4 members. You can form teams beforehand or find teammates at our team-building session on the first day."
  },
  {
    question: "Will accommodation be provided?",
    answer: "Yes, we provide accommodation for participants traveling from outside the city on a first-come, first-served basis. Food and refreshments are provided for all participants during the hackathon."
  },
  {
    question: "Do I need to have a specific idea to potential?",
    answer: "Not strictly! While having an idea helps, we have designated brainstorming sessions and mentors to help you refine your concepts or come up with new ones."
  }
];

const FAQSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
     const ctx = gsap.context(() => {
        gsap.from(".faq-item", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
     }, containerRef);
     return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white py-24 px-4 md:px-10 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
             <h2 className="text-4xl md:text-6xl text-black font-bold mb-4 uppercase tracking-widest" style={{ fontFamily: '"Sketch Block", sans-serif' }}>
                 <span className="text-blue-600">F</span>AQ
            </h2>
            <p className="text-xl text-gray-500 font-light" style={{ fontFamily: '"Laisha", sans-serif' }}>
                Got questions? We&apos;ve got answers.
            </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
                key={index} 
                className="faq-item border-b border-gray-200 last:border-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group hover:bg-gray-50 px-4 rounded-lg transition-colors"
              >
                <span className={`text-lg md:text-xl font-medium pr-8 transition-colors ${openIndex === index ? 'text-blue-600' : 'text-black'}`} style={{ fontFamily: '"WcRoughtrad", sans-serif' }}>
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
                  {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out px-4 ${openIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-blue-50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100">
            <div>
                 <h4 className="text-xl font-bold text-blue-900 mb-1">Still have questions?</h4>
                 <p className="text-blue-700/80 text-sm">Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                Get in Touch
            </button>
        </div>

      </div>
    </div>
  );
};

export default FAQSection;
