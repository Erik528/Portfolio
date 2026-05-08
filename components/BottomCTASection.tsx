"use client";

import { useEffect, useRef } from "react";
import type { Variants } from "framer-motion";
import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { CokeBreakScrollToTopButton } from "./CokeBreakScrollToTopButton";
import hoverStyles from "./HeroSloganHover.module.css";

const videoSrc = "/videos/liquidball.mp4";

function CTAHeadline() {
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const hoverRef = useRef<HTMLHeadingElement>(null);
  const viewRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(viewRef, { once: true, margin: "-10% 0px -20% 0px" });
  const rafIdRef = useRef<number | null>(null);
  const latestRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const updateHoverGradient = () => {
    const root = hoverRef.current;
    const latest = latestRef.current;
    if (!root || !latest) return;

    const elRect = root.getBoundingClientRect();
    const deadZone = 18;
    const maxBlur = 11.5;
    const maxDist = Math.max(elRect.width, elRect.height) * 0.6;

    const chars = root.querySelectorAll<HTMLElement>(`.${hoverStyles.char}`);
    chars.forEach((node) => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - latest.x;
      const dy = cy - latest.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= deadZone) {
        node.style.setProperty("--blur", "0px");
        return;
      }

      const t = Math.min(1, Math.max(0, (dist - deadZone) / Math.max(1, maxDist - deadZone)));
      const eased = t * t;
      const blurPx = eased * maxBlur;
      node.style.setProperty("--blur", `${blurPx.toFixed(2)}px`);
    });
  };

  const scheduleHoverGradient = (x: number, y: number) => {
    latestRef.current = { x, y };
    if (rafIdRef.current) return;
    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      updateHoverGradient();
    });
  };

  const resetHoverGradient = () => {
    const root = hoverRef.current;
    if (!root) return;
    latestRef.current = null;
    const chars = root.querySelectorAll<HTMLElement>(`.${hoverStyles.char}`);
    chars.forEach((node) => node.style.setProperty("--blur", "0px"));
  };

  const lines = ["LET'S MAKE", "IDEAS HAPPEN"];

  const containerVariants: Variants = reduceMotion
    ? {
      hidden: { opacity: 1 },
      show: { opacity: 1, transition: { staggerChildren: 0.01 } },
    }
    : {
      hidden: { opacity: 1 },
      show: { opacity: 1, transition: { staggerChildren: 0.32 } },
    };

  const lineVariants: Variants = reduceMotion
    ? {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
    }
    : {
      hidden: { opacity: 0, y: 12, filter: "blur(9px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
      },
    };

  return (
    <motion.h2
      ref={(node) => {
        hoverRef.current = node;
        viewRef.current = node;
      }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="text-center text-4xl font-bold uppercase leading-[0.98] tracking-tight text-neutral-900 md:text-6xl lg:text-7xl"
      onMouseMove={(e) => scheduleHoverGradient(e.clientX, e.clientY)}
      onMouseLeave={resetHoverGradient}
    >
      {lines.map((line, lineIdx) => (
        <motion.span key={`line-${lineIdx}`} className="block" variants={lineVariants}>
          {line.split(" ").map((word, wordIdx) => (
            <span key={`w-${lineIdx}-${wordIdx}`} className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch, chIdx) => (
                <span key={`${lineIdx}-${word}-${ch}-${chIdx}`} className={hoverStyles.char}>
                  {ch}
                </span>
              ))}
              {wordIdx === line.split(" ").length - 1 ? null : "\u00A0"}
            </span>
          ))}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export function BottomCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.15, margin: "30% 0px 30% 0px" });

  useEffect(() => {
    const videos = [leftVideoRef.current, rightVideoRef.current].filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0) return;

    if (reduceMotion || !inView) {
      videos.forEach((v) => v.pause());
      return;
    }

    videos.forEach((v) => {
      v.muted = true;
      const p = v.play();
      if (p) p.catch(() => { });
    });
  }, [inView, reduceMotion]);

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-background py-20 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <video
            muted
            loop
            playsInline
            preload={inView ? "auto" : "metadata"}
            ref={leftVideoRef}
            className="-translate-x-[70%] h-[468px] w-[468px] object-contain opacity-85 saturate-125 md:-translate-x-1/2 md:h-[676px] md:w-[676px] lg:h-[806px] lg:w-[806px]"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <video
            muted
            loop
            playsInline
            preload={inView ? "auto" : "metadata"}
            ref={rightVideoRef}
            className="translate-x-[70%] h-[468px] w-[468px] object-contain opacity-85 saturate-125 md:translate-x-1/2 md:h-[676px] md:w-[676px] lg:h-[806px] lg:w-[806px]"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/15 via-background/95 to-background/15" />
      </div>

      <div className="container-custom relative flex min-h-[360px] flex-col items-center justify-center px-4 md:min-h-[420px] md:px-6 lg:min-h-[480px] lg:px-8">
        <CokeBreakScrollToTopButton className="absolute right-6 top-6 hidden md:block" />

        <CTAHeadline />

        <div className="mt-10 h-px w-64 bg-neutral-400/70 md:mt-12 md:w-72" />

        <div className="mt-8 flex flex-col items-center gap-3 text-[11px] leading-none text-neutral-700 md:mt-9 md:text-[12px]">
          <a
            href="mailto:boooots2023@gmail.com"
            className="flex items-center gap-3 transition-colors duration-300 hover:text-neutral-900"
          >
            <Image src="/assets/email.png" alt="Email" width={16} height={16} className="h-4 w-4" />
            <span>boooots2023@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/erik-wu-0626a0130"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 transition-colors duration-300 hover:text-neutral-900"
          >
            <Image src="/assets/linkdeln.png" alt="LinkedIn" width={16} height={16} className="h-4 w-4" />
            <span>www.linkedin.com/in/erik-wu-0626a0130</span>
          </a>
        </div>
      </div>
    </section>
  );
}
