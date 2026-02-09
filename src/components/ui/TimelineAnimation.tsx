"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TimelineAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const dots = dotRefs.current;
    const contents = contentRefs.current;

    if (!container || !path) return;

    const ctx = gsap.context(() => {
      // 1. Get path length for stroke-dashoffset animation
      const pathLength = path.getTotalLength();
      
      // Set initial styles for the path (hidden)
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // 2. Animate the path drawing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 5, // Relative duration for scrub
      });

      // 3. Animate the dots and content as the line passes them
      // We can manually calculate progress or use separate ScrollTriggers
      // For simplicity and precision with the line, let's use separate triggers based on the dot positions
      // However, since the SVG is responsive, we might want to just time it with the timeline
      
      // Let's use the timeline with labels or relative offsets
      // Assuming equidistant points for now
      
      dots.forEach((dot, index) => {
        if (!dot) return;
        const content = contents[index];
        
        // Progress roughly matches the vertical position of the dot relative to the path
        // Approx progress based on index (0 to 3)
        const progress = (index + 0.1) / dots.length; 

        tl.fromTo(
          dot,
          { scale: 0, fill: "white" },
          { scale: 1.5, fill: "#2563eb", duration: 0.2, ease: "back.out(1.7)" },
          progress * 5 // Time in the timeline (duration is 5)
        );

        if (content) {
            tl.fromTo(
                content,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                progress * 5
            );
        }
      });

    }, container);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Registration Opens",
      date: "Feb 1st, 2026",
      desc: "Sign up and form your teams on Devfolio.",
    },
    {
      title: "Idea Submission",
      date: "Feb 20th, 2026",
      desc: "Submit your problem statement and proposed solution.",
    },
    {
      title: "Shortlisting",
      date: "Mar 10th, 2026",
      desc: "Top teams will be selected for the final showdown.",
    },
    {
      title: "Grand Finale",
      date: "Mar 21st, 2026",
      desc: "36 hours of non-stop coding at UEM Kolkata.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white py-20 overflow-hidden flex flex-col items-center"
    >
        <h2 className="text-4xl md:text-6xl text-black font-bold mb-20 uppercase tracking-widest text-center" style={{ fontFamily: '"Sketch Block", sans-serif' }}>
            <span className="text-blue-600">Road</span>map
        </h2>

      {/* SVG Container */}
      <div className="relative w-full max-w-5xl mx-auto h-[1200px] md:h-[1000px]">
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 400 800"
          preserveAspectRatio="none"
        >
          {/* Background Path (Light Grey) */}
          <path
            d="M 200 0 
               C 200 100 100 150 100 200 
               S 300 300 300 400 
               S 100 500 100 600
               S 200 700 200 800"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          
          {/* Animated Path (Blue) */}
          <path
            ref={pathRef}
             d="M 200 0 
               C 200 100 100 150 100 200 
               S 300 300 300 400 
               S 100 500 100 600
               S 200 700 200 800"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
          />

          {/* Dots */}
          <circle ref={(el) => { if(el) dotRefs.current[0] = el }} cx="120" cy="180" r="6" fill="white" stroke="#2563eb" strokeWidth="2" />
          <circle ref={(el) => { if(el) dotRefs.current[1] = el }} cx="280" cy="380" r="6" fill="white" stroke="#2563eb" strokeWidth="2" />
          <circle ref={(el) => { if(el) dotRefs.current[2] = el }} cx="120" cy="580" r="6" fill="white" stroke="#2563eb" strokeWidth="2" />
          <circle ref={(el) => { if(el) dotRefs.current[3] = el }} cx="200" cy="780" r="6" fill="white" stroke="#2563eb" strokeWidth="2" />
        </svg>

        {/* Content Overlays */}
        {/* We absolutely position these to match the approximate "stops" of the curve */}
        
        {/* Step 1 */}
        <div 
            ref={(el) => { if(el) contentRefs.current[0] = el }}
            className="absolute top-[15%] left-[5%] md:left-[15%] w-[35%] md:w-[25%] text-right bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-lg"
        >
            <h3 className="text-xl md:text-2xl font-bold text-blue-900" style={{ fontFamily: '"WcRoughtrad", sans-serif' }}>{steps[0].title}</h3>
            <p className="text-sm font-mono text-gray-500 mb-2">{steps[0].date}</p>
            <p className="text-sm text-gray-700 leading-tight">{steps[0].desc}</p>
        </div>

        {/* Step 2 */}
        <div 
            ref={(el) => { if(el) contentRefs.current[1] = el }}
            className="absolute top-[40%] right-[5%] md:right-[15%] w-[35%] md:w-[25%] text-left bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-lg"
        >
            <h3 className="text-xl md:text-2xl font-bold text-blue-900" style={{ fontFamily: '"WcRoughtrad", sans-serif' }}>{steps[1].title}</h3>
            <p className="text-sm font-mono text-gray-500 mb-2">{steps[1].date}</p>
            <p className="text-sm text-gray-700 leading-tight">{steps[1].desc}</p>
        </div>

        {/* Step 3 */}
        <div 
            ref={(el) => { if(el) contentRefs.current[2] = el }}
            className="absolute top-[65%] left-[5%] md:left-[15%] w-[35%] md:w-[25%] text-right bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-lg"
        >
            <h3 className="text-xl md:text-2xl font-bold text-blue-900" style={{ fontFamily: '"WcRoughtrad", sans-serif' }}>{steps[2].title}</h3>
            <p className="text-sm font-mono text-gray-500 mb-2">{steps[2].date}</p>
            <p className="text-sm text-gray-700 leading-tight">{steps[2].desc}</p>
        </div>

        {/* Step 4 */}
        <div 
            ref={(el) => { if(el) contentRefs.current[3] = el }}
            className="absolute top-[85%] right-[20%] md:right-[30%] w-[35%] md:w-[25%] text-center bg-blue-600 text-white p-6 rounded-xl shadow-2xl transform translate-x-1/2"
        >
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: '"Gruth Shaded", sans-serif' }}>{steps[3].title}</h3>
             <p className="text-sm font-mono text-blue-200 mb-2">{steps[3].date}</p>
            <p className="text-sm text-white leading-tight">{steps[3].desc}</p>
        </div>

      </div>
    </div>
  );
};

export default TimelineAnimation;
