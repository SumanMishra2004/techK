"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    const spans = textContainerRef.current?.querySelectorAll(".reveal-text");

    if (spans && spans.length > 0) {
      gsap.to(spans, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%", // Start animation when section is partially visible
          end: "bottom 70%", // End when section is mostly scrolled
          scrub: true, // Link animation progress to scrollbar
        },
      });
    }
  }, []);

  const titlePart1 = "What is";
  const titlePart2 = "Tech Kurukshetra?";

  // Text content adapted for the project
  const textContent = [
    "Tech", "Kurukshetra", "isn't", "just", "another", "tech", "fest",
    "it's", "India's", "fastest-growing", "36-hour", "coding",
    "battleground,", "where", "innovators", "and",
    "community", "members", "unite", "to",
    "build", "real-world", "tech", "solutions.",
    "Tech", "Kurukshetra", "challenges", "you", "to", "dream",
    "big,", "code", "harder,", "and", "create", "impact."
  ];

  return (
    <>
   
    <div
      ref={containerRef}
      className="mx-auto flex max-w-4xl flex-col items-center space-y-8 px-4 md:mt-120 mt-70 "
    >
      {/* HEADER */}
      <div className="w-full select-none">
        <h1 className="text-center text-5xl text-black lg:text-7xl font-normal leading-tight flex flex-col items-center justify-center gap-4" style={{fontFamily:"WcRoughtrad, sans-serif"}}>
          <span className="block sm:inline">{titlePart1} </span>
          <span className="text-[#150BDE] block sm:inline">
             {titlePart2}
          </span>
        </h1>
      </div>

      {/* TEXT GRID */}
      <div
        ref={textContainerRef}
        className="flex flex-wrap justify-center gap-x-2 gap-y-3 text-center text-xl font-extralight md:text-2xl lg:text-3xl leading-relaxed"
        style={{fontFamily:"Laisha,sans-serif"}}
      >
        {textContent.map((word, index) => (
          <span key={index} className="relative inline-block">
            {/* Background Layer (always visible, low opacity) */}
            <span className="absolute left-0 top-0 opacity-20 text-black dark:text-white select-none pointer-events-none">
              {word}
            </span>
            
            {/* Foreground Layer (animates from 0 to 1 opacity) */}
            <span className="reveal-text relative text-black dark:text-white opacity-0 select-none z-10">
              {word}
            </span>
          </span>
        ))}
      </div>
    </div>
 
     </>
  );
};

export default AboutSection;
