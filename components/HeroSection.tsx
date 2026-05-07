"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useScroll, useTransform } from "framer-motion";
import hoverStyles from "./HeroSloganHover.module.css";
const heroVideoSrc = "/videos/liquidball.mp4";
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const amplifiedWords = ["AMPLIFIED", "ENHANCED", "POWERED", "EXPANDED"] as const;
const amplifiedWordSizer = amplifiedWords.reduce((a, b) => (a.length >= b.length ? a : b));

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const oneVisionHoverRef = useRef<HTMLParagraphElement>(null);
  const aiHoverRef = useRef<HTMLParagraphElement>(null);
  const hoverRafIdRef = useRef<number | null>(null);
  const hoverTargetRef = useRef<{ el: HTMLParagraphElement; x: number; y: number } | null>(null);
  const [introReady, setIntroReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [scrollDownReady, setScrollDownReady] = useState(false);
  const [amplifiedWordIdx, setAmplifiedWordIdx] = useState(0);
  const oneVisionWordsControls = useAnimationControls();
  const videoControls = useAnimationControls();
  const aiControls = useAnimationControls();
  const aiLettersControls = useAnimationControls();
  const borderControls = useAnimationControls();

  const updateHoverGradient = () => {
    const target = hoverTargetRef.current;
    if (!target) return;

    const { el, x, y } = target;
    const elRect = el.getBoundingClientRect();
    const deadZone = 18;
    const maxBlur = 11.5;
    const maxDist = Math.max(elRect.width, elRect.height) * 0.6;

    const chars = el.querySelectorAll<HTMLElement>(`.${hoverStyles.char}`);
    chars.forEach((node) => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - x;
      const dy = cy - y;
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

  const scheduleHoverGradient = (el: HTMLParagraphElement, x: number, y: number) => {
    hoverTargetRef.current = { el, x, y };
    if (hoverRafIdRef.current) return;
    hoverRafIdRef.current = window.requestAnimationFrame(() => {
      hoverRafIdRef.current = null;
      updateHoverGradient();
    });
  };

  const resetHoverGradient = (el: HTMLParagraphElement | null) => {
    if (!el) return;
    hoverTargetRef.current = null;
    const chars = el.querySelectorAll<HTMLElement>(`.${hoverStyles.char}`);
    chars.forEach((node) => node.style.setProperty("--blur", "0px"));
  };

  // Track scroll progress of the entire section (250vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [1.4, 1.8], { ease: easeInOutQuad });
  const rotate = useTransform(scrollYProgress, [0, 0.85], [0, 45], { ease: easeInOutQuad });
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);

  useEffect(() => {
    if (!introDone) return;
    const id = window.setInterval(() => {
      setAmplifiedWordIdx((i) => (i + 1) % amplifiedWords.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [introDone]);

  useLayoutEffect(() => {
    const init = async () => {
      await document.fonts?.ready;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIntroReady(true);
        });
      });
    };

    init();
  }, []);

  useEffect(() => {
    if (!introReady || introDone) return;

    const hash = window.location.hash;
    if (hash === "#featured-work") {
      setIntroDone(true);
      setScrollDownReady(true);
      return;
    }

    setScrollDownReady(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0 });

    const run = async () => {
      await borderControls.set({ opacity: 0 });
      await oneVisionWordsControls.set("hidden");
      await videoControls.set({ opacity: 0, scale: 1.4, rotate: 0, filter: "blur(18px)" });
      await aiControls.set({ opacity: 0 });
      await aiLettersControls.set("hidden");

      borderControls.start({
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      });

      const wordCount = 2;
      const wordDuration = 1.2;
      const wordStagger = 0.35;
      const totalReveal = (wordCount - 1) * wordStagger + wordDuration;
      const triggerDelayMs = Math.max(0, totalReveal * 0.6 * 1000);

      const videoRevealDurationMs = 1450;
      const aiAppearAtMs = Math.round(videoRevealDurationMs * 0.3);

      let resolveVideoDone: () => void = () => { };
      const videoDone = new Promise<void>((resolve) => {
        resolveVideoDone = resolve;
      });

      let resolveAiDone: () => void = () => { };
      const aiDone = new Promise<void>((resolve) => {
        resolveAiDone = resolve;
      });

      let aiTimeoutId = 0;
      const videoTimeoutId = window.setTimeout(() => {
        const videoPromise = videoControls.start({
          opacity: [0, 1],
          scale: 1.4,
          rotate: 0,
          filter: ["blur(18px)", "blur(0px)"],
          transition: { duration: 1.45, ease: [0.16, 1, 0.3, 1] },
        });

        aiTimeoutId = window.setTimeout(() => {
          aiControls.start({
            opacity: 1,
            transition: { duration: 0.01 },
          });
          aiLettersControls.start("show").then(() => {
            setScrollDownReady(true);
            resolveAiDone();
          });
        }, aiAppearAtMs);

        videoPromise.then(() => resolveVideoDone());
      }, triggerDelayMs);

      await oneVisionWordsControls.start("show");

      await Promise.all([videoDone, aiDone]);
      window.clearTimeout(videoTimeoutId);
      window.clearTimeout(aiTimeoutId);

      setIntroDone(true);
      document.body.style.overflow = previousOverflow;
    };

    run();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [aiControls, aiLettersControls, borderControls, introDone, introReady, oneVisionWordsControls, videoControls]);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative h-[260vh] w-full"
    >
      {/* Sticky container that stays pinned while scrolling */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
        <div className="container-custom relative flex h-full flex-col justify-center px-4 md:px-6 lg:px-8">

          {/* Decorative plus signs - Keep z-index high */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={borderControls}
            className="absolute bottom-0 left-0 z-20 border-b border-neutral-300/50 w-full"
          >
            <div className="absolute -bottom-[5px] left-0 text-[10px] font-bold text-neutral-400 lg:left-2">
              +
            </div>
            <div className="absolute -bottom-[5px] right-0 text-[10px] font-bold text-neutral-400 lg:right-2">
              +
            </div>
          </motion.div>

          <div className="relative -translate-y-6 grid grid-cols-2 items-center gap-x-8 gap-y-10 md:-translate-y-8 lg:grid-cols-[1.2fr_auto_1.2fr] lg:gap-y-12 lg:-translate-y-10">
            {/* Left Slogan - High z-index */}
            <div className="relative z-10 col-start-1 row-start-1 flex justify-start lg:justify-end">
              <p
                ref={oneVisionHoverRef}
                className="whitespace-nowrap text-left text-xl font-medium uppercase tracking-[0.3em] text-neutral-800 md:text-2xl lg:text-right lg:text-3xl"
                onMouseMove={(e) => {
                  if (!oneVisionHoverRef.current) return;
                  scheduleHoverGradient(oneVisionHoverRef.current, e.clientX, e.clientY);
                }}
                onMouseLeave={() => resetHoverGradient(oneVisionHoverRef.current)}
              >
                <motion.span
                  initial="hidden"
                  animate={oneVisionWordsControls}
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.35 } },
                  }}
                >
                  {["One", "Vision"].map((word, wordIdx) => (
                    <motion.span
                      key={`${word}-${wordIdx}`}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, filter: "blur(12px)" },
                        show: {
                          opacity: 1,
                          filter: "blur(0px)",
                          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                    >
                      {word.split("").map((ch, chIdx) => (
                        <span key={`${word}-${wordIdx}-${ch}-${chIdx}`} className={hoverStyles.char}>
                          {ch}
                        </span>
                      ))}
                      {wordIdx === 0 ? "\u00A0" : null}
                    </motion.span>
                  ))}
                </motion.span>
              </p>
            </div>

            {/* Central Video Container - Low z-index */}
            <div className="relative z-0 col-span-2 col-start-1 row-start-2 mx-auto w-full max-w-[560px] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:max-w-[700px]">
              <motion.div
                initial={{ opacity: 0, scale: 1.4, rotate: 0, filter: "blur(18px)" }}
                animate={introDone ? undefined : videoControls}
                style={introDone ? { rotate, scale } : undefined}
                className="relative aspect-[4/3] w-full overflow-visible md:aspect-auto md:h-[480px] lg:h-[560px]"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-contain"
                >
                  <source src={heroVideoSrc} type="video/mp4" />
                </video>
              </motion.div>
            </div>

            {/* Right Slogan - High z-index */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={aiControls}
              className="relative z-10 col-start-2 row-start-1 flex justify-end lg:col-start-3 lg:justify-start"
            >
              <p
                ref={aiHoverRef}
                className="whitespace-nowrap text-right text-xl font-medium uppercase tracking-[0.3em] text-neutral-800 md:text-2xl lg:text-left lg:text-3xl"
                onMouseMove={(e) => {
                  if (!aiHoverRef.current) return;
                  scheduleHoverGradient(aiHoverRef.current, e.clientX, e.clientY);
                }}
                onMouseLeave={() => resetHoverGradient(aiHoverRef.current)}
              >
                <motion.span
                  initial="hidden"
                  animate={aiLettersControls}
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                  }}
                >
                  {["A", "I"].map((ch, idx) => (
                    <motion.span
                      key={`${ch}-${idx}`}
                      className="inline-block align-baseline"
                      variants={{
                        hidden: { opacity: 0, filter: "blur(12px)" },
                        show: {
                          opacity: 1,
                          filter: "blur(0px)",
                          transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                    >
                      <span className={`${hoverStyles.char} ${idx < 2 ? "font-bold" : ""}`}>{ch}</span>
                    </motion.span>
                  ))}
                  <motion.span
                    className="relative ml-[0.55em] inline-block align-baseline"
                    variants={{
                      hidden: { opacity: 0, filter: "blur(12px)" },
                      show: {
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    <span aria-hidden className="invisible inline-block">
                      {amplifiedWordSizer}
                    </span>
                    <AnimatePresence mode="sync" initial={false}>
                      <motion.span
                        key={amplifiedWords[amplifiedWordIdx]}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={{
                          enter: {
                            opacity: 0,
                            filter: "blur(18px)",
                            scale: 0.985,
                            skewX: -8,
                            textShadow: "0 0 18px rgba(0,0,0,0.22), -2px 0 0 rgba(0,255,255,0.10), 2px 0 0 rgba(255,0,255,0.10)",
                          },
                          center: {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1,
                            skewX: 0,
                            textShadow: "0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,255,255,0), 0 0 0 rgba(255,0,255,0)",
                            transition: {
                              duration: 0.8,
                              ease: [0.22, 1, 0.36, 1],
                              when: "beforeChildren",
                              staggerChildren: 0.05,
                            },
                          },
                          exit: {
                            opacity: 0,
                            filter: "blur(18px)",
                            scale: 1.015,
                            skewX: 8,
                            textShadow: "0 0 18px rgba(0,0,0,0.22), -2px 0 0 rgba(0,255,255,0.10), 2px 0 0 rgba(255,0,255,0.10)",
                            transition: {
                              duration: 0.45,
                              ease: [0.22, 1, 0.36, 1],
                              when: "afterChildren",
                            },
                          },
                        }}
                        className="absolute left-0 top-0 inline-flex"
                      >
                        {Array.from(amplifiedWords[amplifiedWordIdx]).map((ch, idx) => (
                          <motion.span
                            key={`${amplifiedWords[amplifiedWordIdx]}-${ch}-${idx}`}
                            variants={{
                              enter: { opacity: 0, y: 6, filter: "blur(10px)" },
                              center: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                              },
                              exit: { opacity: 0, y: -6, filter: "blur(10px)", transition: { duration: 0.28 } },
                            }}
                            className="inline-block"
                          >
                            <span className={hoverStyles.char}>{ch}</span>
                          </motion.span>
                        ))}
                      </motion.span>
                    </AnimatePresence>
                  </motion.span>
                </motion.span>
              </p>
            </motion.div>
          </div>

          {/* Scroll Down Indicator - Absolute position unchanged */}
          {scrollDownReady ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: scrollIndicatorOpacity }}
              className="absolute left-1/2 top-[78%] z-20 -translate-x-1/2"
            >
              <div className="flex items-center space-x-5 bg-white/40 px-6 py-3.5 backdrop-blur-md transition-all duration-500 hover:bg-white/60">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-700"
                >
                  <path d="M7 8h6v10M13 18l-3-3M13 18l3-3" />
                </svg>
                <span className="text-[9px] font-bold tracking-[0.5em] text-neutral-700">
                  SCROLL DOWN
                </span>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
