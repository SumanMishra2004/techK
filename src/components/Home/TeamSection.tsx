"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { 
      name: "Dr. Alan Grant", 
      role: "Faculty Coordinator", 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60" 
  },
  { 
      name: "Jane Smith", 
      role: "Lead Organizer", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60" 
  },
  { 
      name: "Mike Johnson", 
      role: "Tech Lead", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60" 
  },
  { 
      name: "Sarah Williams", 
      role: "Design Head", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60" 
  },
];

const TeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Staggered reveal
        gsap.from(cardsRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black text-white py-24 px-4 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold mb-20 text-center uppercase tracking-tighter" style={{ fontFamily: '"Sketch Block", sans-serif' }}>
          Meet The <span className="text-blue-500">Team</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-10 w-full mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="group relative w-72 h-96 perspective-1000"
            >
              <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-12 group-hover:scale-105 cursor-pointer">
                {/* Image Container */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-z-20">
                     <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {member.role}
                     </p>
                    <h3 className="text-3xl text-white leading-none" style={{ fontFamily: '"Gruth Shaded", sans-serif' }}>
                        {member.name.split(' ')[0]}
                    </h3>
                     <h3 className="text-3xl text-white leading-none mb-2" style={{ fontFamily: '"Gruth Shaded", sans-serif' }}>
                        {member.name.split(' ')[1]}
                    </h3>
                </div>

                {/* Border Hover Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-600 transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 group perspective-1000">
             {/* Animated 3D Button to specific page based on user request */}
            <a 
                href="/team" 
                className="relative inline-flex items-center justify-center px-10 py-4 bg-transparent border border-white/30 text-white font-mono uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform group-hover:scale-105"
            >
                <span className="absolute inset-0 w-full h-full bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                    View Full Team
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </a>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
