"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sponsorsData = {
  Diamond: [
    { name: "Devfolio", logo: "/sponsors/devfolio.png", type: "Diamond" },
  ],
  Gold: [
    { name: "Polygon", logo: "/sponsors/polygon.png", type: "Gold" },
    { name: "ETHIndia", logo: "/sponsors/ethindia.png", type: "Gold" },
  ],
  Silver: [
     { name: "Sponsor A", logo: "/sponsors/default.png", type: "Silver" },
     { name: "Sponsor B", logo: "/sponsors/default.png", type: "Silver" },
     { name: "Sponsor C", logo: "/sponsors/default.png", type: "Silver" },
  ],
  Community: [
     { name: "Partner X", logo: "/sponsors/default.png", type: "Community" },
     { name: "Partner Y", logo: "/sponsors/default.png", type: "Community" },
     { name: "Partner Z", logo: "/sponsors/default.png", type: "Community" },
  ]
};

const SponsorsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const groupsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            if (titleRef.current) {
                gsap.fromTo(titleRef.current, 
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: { 
                            trigger: titleRef.current, 
                            start: "top 80%",
                            toggleActions: "play none none none"
                        },
                        y: 0, 
                        opacity: 1, 
                        duration: 1, 
                        ease: "power3.out",
                    }
                );
            }

            // Groups Animation
            groupsRef.current.forEach((group) => {
                 if(!group) return;
                 gsap.fromTo(group.children,
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: { 
                            trigger: group, 
                            start: "top 85%",
                            toggleActions: "play none none none"
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.6, 
                        stagger: 0.1, 
                        ease: "power2.out"
                    }
                 );
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full bg-white py-24 px-4 md:px-10 flex flex-col items-center">
            <h2 ref={titleRef} className="text-4xl md:text-6xl text-black font-bold mb-16 uppercase tracking-widest text-center" style={{ fontFamily: '"Sketch Block", sans-serif' }}>
                Our <span className="text-blue-600">Partners</span>
            </h2>

            <div className="w-full max-w-6xl space-y-16">
                {Object.entries(sponsorsData).map(([tier, sponsors], index) => (
                    <div key={tier} className="flex flex-col items-center">
                         <h3 className="text-xl font-bold uppercase tracking-widest text-gray-400 mb-8 border-b border-gray-200 pb-2 px-8">
                             {tier} Partners
                         </h3>
                         <div 
                            ref={(el) => { if (el) groupsRef.current[index] = el; }}
                            className="flex flex-wrap justify-center gap-8 w-full"
                         >
                             {sponsors.map((sponsor, i) => (
                                 <div key={i} className="group relative w-48 h-32 md:w-60 md:h-36 flex items-center justify-center p-6 border border-gray-200 rounded-xl bg-gray-50 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                                      <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                      {/* Using text placeholder styled like a logo */}
                                      <div className="relative z-10 text-center transform group-hover:scale-110 transition-transform duration-300">
                                            {/* Simulate Logo Image with Text if image fails or is placebo */}
                                            <span className="text-2xl md:text-3xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
                                                {sponsor.name}
                                            </span>
                                      </div>
                                      <div className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-gray-300 group-hover:text-blue-400">
                                          {sponsor.type}
                                      </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 text-center">
                 <p className="text-gray-500 mb-6 text-xl" style={{fontFamily: '"Laisha", sans-serif'}}>Interested in supporting innovation?</p>
                 <button className="px-10 py-4 bg-black text-white rounded-full font-bold hover:bg-blue-600 transition-colors uppercase tracking-wider text-sm shadow-lg hover:shadow-blue-600/30">
                    Become a Sponsor
                 </button>
            </div>
        </div>
    );
};

export default SponsorsSection;
