/* eslint-disable react-hooks/static-components */
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. HOME FIRST PAGE (HERO SECTION)
// ==========================================
export default function HomeFirstPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate opacity from 1 to 0 based on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        ease: "none", // Linear fade is best for scroll
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Start fading when the top of the hero hits the top of the viewport
          end: "bottom -50%", // Finish fading when the bottom of the hero is near the top
          scrub: true, // Link animation to scrollbar
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center pt-20 z-10 overflow-hidden"
    >
       {/* Background Random Boxes */}
       <BackgroundBoxes />

      {/* We wrap the content in a separate ref to animate its opacity */}
      <div
        ref={contentRef}
        className="h-auto lg:gap-10 md:gap-7 gap-5 flex flex-col items-center justify-between relative z-10"
      >
        {/* MAIN TECH LAYOUT */}
        <TechLayout />

        {/* DATE & VENUE SECTION */}
        <div className="mt-8 mb-12 flex flex-col items-center gap-6 px-4">
          {/* Date & Venue Text */}
          <p
            className="text-lg md:text-2xl font-normal tracking-wider uppercase text-black text-center"
            style={{ fontFamily: '"Sketch Block", sans-serif' }}
          >
            March <span className="text-blue-600">21st – 22nd,</span> 2026
            <span className="mx-2 hidden md:inline">|</span>
            <br className="md:hidden" />
            UEM Kolkata
          </p>

          {/* Buttons Container */}
          <div className="flex flex-row gap-4 w-full max-w-2xl justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_0_0_rgba(29,78,216,1)] active:shadow-none active:translate-y-1 transform transition-all duration-150 text-sm md:text-base uppercase tracking-tight">
              Apply through Devfolio
            </button>

            <button className="bg-gray-100 hover:bg-gray-200 text-blue-600 font-bold py-4 px-2 rounded-xl border-2 border-blue-600 shadow-md transform transition-all duration-150 hover:scale-105 active:scale-95 flex justify-center items-center">
              <span className="text-xl">A</span>
            </button>
          </div>
        </div>
      </div>

       {/* Social Icons (Bottom Right) */}
       <div className="absolute md:bottom-8 md:right-8 right-2 bottom-2 z-20 flex flex-col items-end md:gap-3 gap-0">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
          Follow the hype
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110">
            <Twitter size={20} />
          </a>
        </div>
      </div>
      
       {/* Background Text (Bottom Left) */}
       <div className="absolute bottom-8 left-8 z-20 hidden md:block">
         <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
           Est. 2026 . Kolkata
         </p>
       </div>
    </div>
  );
}

// ==========================================
// BACKGROUND BOXES COMPONENT
// ==========================================
const BackgroundBoxes = () => {
  // Hardcoded random positions to ensure consistency during SSR/hydration
  const boxes = [
    { top: "15%", left: "10%", w: "w-16", h: "h-16" },
    { top: "25%", left: "85%", w: "w-12", h: "h-12" },
    { top: "65%", left: "15%", w: "w-20", h: "h-20" },
    { top: "75%", left: "75%", w: "w-14", h: "h-14" },
    { top: "40%", left: "5%", w: "w-8", h: "h-8" },
    { top: "10%", left: "60%", w: "w-10", h: "h-10" },
    { top: "85%", left: "30%", w: "w-24", h: "h-24" },
    { top: "50%", left: "92%", w: "w-16", h: "h-16" },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {boxes.map((box, i) => (
        <div
          key={i}
          className={`absolute ${box.w} ${box.h} bg-gray-500/10 border border-gray-500/20 backdrop-blur-[1px]`}
          style={{ top: box.top, left: box.left }}
        />
      ))}
    </div>
  );
};

// ==========================================
// 2. TECH LAYOUT COMPONENT
// ==========================================
const TechLayout: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center gap-8 uppercase">
      <div className="relative leading-[0.8]">
        {/* A. TECH WIDTH (Top) */}
        <div className="absolute -top-7.5 left-0 w-full">
          <DoubleArrow
            orientation="horizontal"
            label="3 cm"
            color="#4b5563"
          />
        </div>

        {/* B. TECH HEIGHT (Right Side) */}
        <div className="absolute -right-7.5 top-0 h-[90%]">
          <DoubleArrow orientation="vertical" label="2 cm" color="#4b5563" />
        </div>

        {/* Decorative Borders */}
        <div className="absolute top-0 left-[-10%] h-[1px] w-[130%] bg-gray-600/50" />
        <div className="absolute bottom-[5px] left-[-10%] h-[1px] w-[130%] bg-gray-600/50" />
        <div className="absolute -left-[4px] -top-[80%] h-[180%] w-[1px] bg-gray-600/50" />
        <div className="absolute -right-[4px] -top-[80%] h-[180%] w-[1px] bg-gray-600/50" />

        <span
          className="block text-5xl  md:text-7xl lg:text-8xl text-[#0534c7]"
          style={{ fontFamily: '"Sketch Block", sans-serif' }}
        >
          Tech
        </span>
      </div>

      {/* =========================================
            2. SUB-WRAPPER (KURUKSHETRA & 2.0)
           ========================================= */}
      <div className="relative flex flex-col items-end gap-10 md:gap-6">
        {/* CYAN DECORATIVE LINE */}
        <div className="absolute -right-1 top-1/2 h-[140%] w-[1px] -translate-y-1/2 bg-cyan-600 z-10 opacity-50" />

        {/* --- KURUKSHETRA BLOCK --- */}
        <div className="relative leading-[0.8]">
          <div className="absolute md:-top-4 -top-6 left-0 w-full">
            <DoubleArrow
              orientation="horizontal"
              label="3 cm"
              color="#4b5563"
            />
          </div>

          {/* KURUKSHETRA HEIGHT (Right Side) */}
          <div className="absolute md:-right-6 -right-4 top-0 h-full">
            <DoubleArrow
              orientation="vertical"
              label="1.5 cm"
              color="#4b5563"
            />
          </div>

          {/* Borders */}
          <div className="absolute -top-1 left-[-2%] h-[1px] w-[106%] bg-gray-600/50" />
          <div className="absolute -bottom-1 left-[-2%] h-[1px] w-[106%] bg-gray-600/50" />
          <div className="absolute -left-1 md:-top-[40%] -top-[60%] md:h-[150%] h-[180%] w-[1px] bg-gray-600/50" />

          <span
            className="block text-4xl md:text-6xl lg:text-8xl"
            style={{ fontFamily: '"Gruth Shaded", sans-serif' }}
          >
            KURUKSHETRA
          </span>
        </div>

        {/* --- 2.0 BLOCK --- */}
        <div className="relative leading-[0.8] text-gray-600">
          {/* 2.0 HEIGHT (Right Side) */}
          <div className="absolute md:-right-5 -right-4 top-0 h-full">
            <DoubleArrow
              orientation="vertical"
              label="1 cm"
              color="#4b5563"
            />
          </div>
          <div className="absolute -bottom-6 md:-bottom-8 left-0 w-full">
            <DoubleArrow
              orientation="horizontal"
              label="3 cm"
              color="#4b5563"
            />
          </div>

          {/* Borders */}
          <div className="absolute -top-[4px] -left-[15%] h-[1px] w-[150%] bg-gray-600/50" />
          <div className="absolute -bottom-[4px] -left-[15%] h-[1px] w-[150%] bg-gray-600/50" />
          <div className="absolute -left-[4px] md:-top-[20%] -top-[20%] md:h-[180%] h-[180%] w-[1px] bg-gray-600/50" />

          <span
            className="block text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: '"Gruth Shaded", sans-serif' }}
          >
            2.0
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. DOUBLE ARROW COMPONENT
// ==========================================

interface DoubleArrowProps {
  label?: string;
  color?: string;
  orientation?: "horizontal" | "vertical";
  labelOrientation?: boolean;
}

const DoubleArrow: React.FC<DoubleArrowProps> = ({
  label,
  color = "#4b5563",
  orientation = "horizontal",
  labelOrientation = false,
}) => {
  const isVertical = orientation === "vertical";

  const ArrowHeadIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 10 10"
      className={cn(className, "w-1 h-1 md:w-2 md:h-2")}
      style={{ fill: color }}
    >
      <path d="M 0 5 L 10 0 L 10 10 Z" />
    </svg>
  );

  return (
    <div
      className={`flex items-center justify-center relative ${
        isVertical ? "h-full flex-row" : "w-full flex-col"
      }`}
    >
      {label && (
        <span
          className={`
            absolute md:text-xs text-[7px] font-mono text-gray-700 whitespace-nowrap
            ${
              isVertical
                ? labelOrientation
                  ? "left-2 "
                  : "left-px  rotate-90"
                : "-top-2 md:-top-4"
            }
          `}
        >
          {label}
        </span>
      )}

      <div
        className={`flex items-center justify-between ${
          isVertical ? "flex-col h-full w-[8px]" : "flex-row w-full h-[8px]"
        }`}
      >
        <div
          className="opacity-40"
          style={{ transform: isVertical ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <ArrowHeadIcon />
        </div>

        <div
          className="grow bg-current opacity-40"
          style={{
            backgroundColor: color,
            height: isVertical ? "auto" : "1px",
            width: isVertical ? "1px" : "auto",
            minHeight: isVertical ? "10px" : "0",
            minWidth: isVertical ? "0" : "10px",
          }}
        />

        <div
          className="opacity-40"
          style={{
            transform: isVertical ? "rotate(-90deg)" : "rotate(180deg)",
          }}
        >
          <ArrowHeadIcon />
        </div>
      </div>
    </div>
  );
};