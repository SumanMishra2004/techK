/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Marquee = () => {
  const trackRef1 = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Track 1 (Blue): Move Left
      gsap.to(trackRef1.current, {
        xPercent: -50,
        repeat: -1,
        duration: 10,
        ease: "none",
      });

      // Track 2 (Grey): Move Right (start from -50% and go to 0%)
      gsap.fromTo(trackRef2.current, {
        xPercent: -50
      }, {
        xPercent: 0,
        repeat: -1,
        duration: 10,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative md:h-100 bottom-0 h-20 w-full z-999">
      
      {/* Grey Strip: Rotate Opposite (Positive) */}
      <div className="absolute left-1/2 bottom-0 w-[110%] lg:rotate-6 rotate-4 -translate-x-1/2 -translate-y-1/2 transform bg-black text-white shadow-xl z-10">
        <div className="relative overflow-hidden">
          <div ref={trackRef2} className="flex w-fit whitespace-nowrap">
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>

      {/* Blue Strip: Rotate Negative (Original) */}
      <div className="absolute left-1/2 bottom-0 w-[110%] lg:-rotate-2 -rotate-4 -translate-x-1/2 -translate-y-1/2 transform bg-[#0617B0] text-white shadow-xl z-20">
        <div className="relative overflow-hidden">
          <div ref={trackRef1} className="flex w-fit whitespace-nowrap">
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>

    </div>
  );
};

// -- Sub-component for cleaner code --
const MarqueeContent = () => {
  // We repeat the item multiple times to ensure it covers wide screens before the loop resets
  const items = Array(4).fill(null); 

  return (
    <div className="flex shrink-0 items-center">
      {items.map((_, index) => (
        <div key={index} className="flex items-center px-6">
          <img
            src="https://res.cloudinary.com/dscnitrourkela/image/upload/v1756149378/project-huckleberry/bsju38b1aiervwxbqxnw.png"
            alt="Globe Logo"
            className="h-8 w-8 object-contain md:h-12 md:w-12"
            loading="lazy"
          />
          <span className="ml-4 font-sans text-xl font-bold uppercase tracking-tighter drop-shadow-sm md:ml-6 md:text-[30px] md:leading-20">
            Biggest Hackathon
          </span>
        </div>
      ))}
    </div>
  );
};

export default Marquee;


// 