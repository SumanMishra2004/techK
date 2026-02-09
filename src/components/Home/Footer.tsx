"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin, Mail, ArrowUpRight, Send, MapPin, Phone, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Generate particle positions once on mount
  const [particlePositions] = useState(() => 
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: 30 + Math.random() * 70, // Keep particles in lower 70% of footer
    }))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate particles floating within footer bounds
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: "+=50",
            x: `${Math.random() * 40 - 20}`,
            opacity: 0.6,
            duration: 4 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
            ease: "sine.inOut"
          });
        });
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full bg-black text-white overflow-hidden pt-32 pb-8">
      
      {/* Simple Curved Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 rotate-180">
          <svg
            className="relative block w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path 
              fill="#ffffff" 
              d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"
            />
          </svg>
      </div>

      {/* Floating Particles - Constrained to footer */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="particle absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
      
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-gray-800 pb-16 mb-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <h2 
              className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white"
              style={{ fontFamily: '"Sketch Block", sans-serif' }}
            >
              Tech <span className="text-blue-500">Kurukshetra</span>
            </h2>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              The ultimate coding battleground where innovation meets execution. Join the revolution and build the future.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
               {[
                 { Icon: Twitter, color: 'hover:bg-blue-500' },
                 { Icon: Github, color: 'hover:bg-gray-700' },
                 { Icon: Instagram, color: 'hover:bg-pink-600' },
                 { Icon: Linkedin, color: 'hover:bg-blue-700' }
               ].map(({ Icon, color }, i) => (
                   <a 
                     key={i} 
                     href="#" 
                     className={`p-4 bg-gray-900 rounded-lg border border-gray-800 ${color} hover:border-transparent transition-all duration-300 hover:scale-110 hover:-translate-y-1`}
                   >
                       <Icon className="w-5 h-5 group-hover:text-white transition-colors" />
                   </a>
               ))}
            </div>

            {/* Newsletter Signup */}
            <div className="pt-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Stay Updated</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all duration-300 hover:scale-105">
                  <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6 space-y-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-500"></span>
              Explore
            </h4>
            <ul className="space-y-4">
                {['Home', 'About Us', 'Timeline', 'Events', 'Sponsors', 'Team'].map((item) => (
                    <li key={item}>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group">
                            <span className="w-0 group-hover:w-2 h-[2px] bg-blue-500 transition-all duration-300"></span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-2" />
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-500"></span>
              Resources
            </h4>
            <ul className="space-y-4">
                {['FAQs', 'Privacy Policy', 'Terms of Service', 'Code of Conduct', 'Branding Kit'].map((item) => (
                    <li key={item}>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors group hover:translate-x-1 inline-block duration-300">
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-6">
             <h4 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
               <span className="w-8 h-[2px] bg-blue-500"></span>
               Contact Us
             </h4>
             
             <div className="space-y-4">
               <a href="mailto:contact@techkurukshetra.com" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                      <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                    <span className="text-sm">contact@techk.com</span>
                  </div>
               </a>

               <a href="tel:+1234567890" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                      <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                    <span className="text-sm">+1 (234) 567-890</span>
                  </div>
               </a>

               <div className="flex items-start gap-4 text-gray-400">
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
                      <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
                    <span className="text-sm">Tech Campus, Innovation Hub<br/>Silicon Valley, CA 94000</span>
                  </div>
               </div>
             </div>

             {/* Event Card */}
             <div className="p-6 bg-blue-600 rounded-2xl hover:bg-blue-500 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-2 text-blue-100 mb-3">
                    <Calendar className="w-4 h-4" />
                    <p className="text-xs uppercase tracking-widest font-bold">Upcoming Event</p>
                  </div>
                  <p className="text-2xl font-black text-white mb-2">Feb 14-15, 2026</p>
                  <p className="text-blue-100 text-sm mb-4">36-Hour Hackathon</p>
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <span>Register Now</span>
                      <ArrowUpRight className="w-5 h-5" />
                  </div>
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              &copy; 2026 Tech Kurukshetra. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
                Crafted with <span className="text-red-500 animate-pulse text-lg">❤</span> by the <span className="text-blue-400 font-semibold">Tech Team</span>
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-600">Powered by Next.js</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span className="text-xs text-gray-600">v2.0</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;