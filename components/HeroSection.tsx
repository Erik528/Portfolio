"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import hoverStyles from "./HeroSloganHover.module.css";
const heroVideoSrc = "/videos/11May.mp4";
const amplifiedWords = ["AMPLIFIED", "ENHANCED", "POWERED", "EXPANDED"] as const;
const amplifiedWordSizer = amplifiedWords.reduce((a, b) => (a.length >= b.length ? a : b));

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyOverflowRef = useRef<string>("");
  const reduceMotion = useReducedMotion();
  const heroInView = useInView(containerRef, { amount: 0.1 });
  const oneVisionHoverRef = useRef<HTMLParagraphElement>(null);
  const aiHoverRef = useRef<HTMLParagraphElement>(null);
  const hoverRafIdRef = useRef<number | null>(null);
  const hoverTargetRef = useRef<{ el: HTMLParagraphElement; x: number; y: number } | null>(null);
  const pendingScrollDownRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [scrollDownReady, setScrollDownReady] = useState(false);
  const [amplifiedWordIdx, setAmplifiedWordIdx] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [exitInProgress, setExitInProgress] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoEndedRef = useRef(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [isBelow960, setIsBelow960] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const oneVisionWordsControls = useAnimationControls();
  const videoControls = useAnimationControls();
  const aiControls = useAnimationControls();
  const aiLettersControls = useAnimationControls();
  const borderControls = useAnimationControls();

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveReduceMotion = mounted ? reduceMotion : false;
  const enableHeavyVideoEffects = !effectiveReduceMotion && !isNarrow && !isCoarsePointer;
  const downScale = isNarrow || isCoarsePointer ? 2.6 : 1.5;
  const below960VideoOffsetX = isBelow960 ? 10 : 0;
  const below960VideoOffsetY = isBelow960 ? -90 : 0;
  const defaultVideoRotate = !effectiveReduceMotion && isBelow960 ? -30 : 0;
  const defaultVideoScale = !effectiveReduceMotion && isBelow960 ? 2.5 : 1;
  const transformedVideoRotate = isBelow960 ? defaultVideoRotate : -45;
  const transformedVideoScale = isBelow960 ? defaultVideoScale : downScale;

  useLayoutEffect(() => {
    if (!bodyOverflowRef.current) bodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = hasEntered ? bodyOverflowRef.current : "hidden";
    return () => {
      document.body.style.overflow = bodyOverflowRef.current;
    };
  }, [hasEntered]);

  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;

    const tryPlay = () => {
      if (!heroInView) return;
      if (document.visibilityState !== "visible") return;
      if (heroVideoEndedRef.current || v.ended) return;
      v.muted = true;
      const p = v.play();
      if (p) p.catch(() => { });
    };

    if (!heroInView) {
      v.pause();
      return;
    }

    tryPlay();
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    const onWaiting = () => {
      if (heroVideoEndedRef.current || v.ended) return;
      window.setTimeout(tryPlay, 180);
    };
    const onEnded = () => {
      heroVideoEndedRef.current = true;
      setVideoEnded(true);
    };
    window.addEventListener("focus", tryPlay);
    document.addEventListener("visibilitychange", onVisibility);
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("stalled", onWaiting);
    v.addEventListener("pause", onWaiting);
    v.addEventListener("ended", onEnded);
    return () => {
      window.removeEventListener("focus", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("stalled", onWaiting);
      v.removeEventListener("pause", onWaiting);
      v.removeEventListener("ended", onEnded);
    };
  }, [heroInView]);

  useEffect(() => {
    if (!videoEnded) return;

    const onWheel = (e: WheelEvent) => {
      if (exitInProgress) {
        if (e.deltaY > 0) pendingScrollDownRef.current += e.deltaY;
        e.preventDefault();
        return;
      }

      if (!hasEntered) {
        e.preventDefault();
        if (e.deltaY <= 0) return;
        pendingScrollDownRef.current += e.deltaY;
        setExitInProgress(true);
        setScrollDownReady(false);
        void (async () => {
          await videoControls.start({
            rotate: transformedVideoRotate,
            scale: transformedVideoScale,
            x: below960VideoOffsetX,
            y: below960VideoOffsetY,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          });
          setIsTransformed(true);
          setHasEntered(true);
          setExitInProgress(false);
          document.body.style.overflow = bodyOverflowRef.current;
          const pending = pendingScrollDownRef.current;
          pendingScrollDownRef.current = 0;
          if (pending > 0) window.scrollBy({ top: pending, left: 0, behavior: "auto" });
        })();
        return;
      }

      if (!heroInView) return;

      if (isTransformed && e.deltaY > 0) {
        const el = containerRef.current;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const end = top + el.offsetHeight - window.innerHeight;
          if (window.scrollY < end - 1) {
            e.preventDefault();
            window.scrollTo({ top: end, behavior: "auto" });
            return;
          }
        }
      }

      if (!isTransformed) {
        if (e.deltaY <= 0) return;
        e.preventDefault();
        pendingScrollDownRef.current += e.deltaY;
        setExitInProgress(true);
        void (async () => {
          await videoControls.start({
            rotate: transformedVideoRotate,
            scale: transformedVideoScale,
            x: below960VideoOffsetX,
            y: below960VideoOffsetY,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          });
          setIsTransformed(true);
          setExitInProgress(false);
          const pending = pendingScrollDownRef.current;
          pendingScrollDownRef.current = 0;
          if (pending > 0) window.scrollBy({ top: pending, left: 0, behavior: "auto" });
        })();
        return;
      }

      if (e.deltaY >= 0) return;
      e.preventDefault();
      setExitInProgress(true);
      void (async () => {
        await videoControls.start({
          rotate: defaultVideoRotate,
          scale: defaultVideoScale,
          x: below960VideoOffsetX,
          y: below960VideoOffsetY,
          transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
        });
        setIsTransformed(false);
        setExitInProgress(false);
      })();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel as unknown as EventListener);
    };
  }, [below960VideoOffsetX, below960VideoOffsetY, defaultVideoRotate, defaultVideoScale, exitInProgress, hasEntered, heroInView, isBelow960, isTransformed, transformedVideoRotate, transformedVideoScale, videoControls, videoEnded]);

  useEffect(() => {
    if (!videoEnded) return;
    if (!isCoarsePointer) return;

    let startY = 0;
    let tracking = false;

    const onTouchStart = (e: TouchEvent) => {
      if (exitInProgress) return;
      if (e.touches.length !== 1) return;
      tracking = true;
      startY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking) return;
      if (exitInProgress) {
        e.preventDefault();
        return;
      }
      if (e.touches.length !== 1) return;

      const y = e.touches[0]?.clientY ?? startY;
      const dy = y - startY;

      if (!hasEntered) {
        if (dy > -32) return;
        e.preventDefault();
        tracking = false;
        setExitInProgress(true);
        setScrollDownReady(false);
        pendingScrollDownRef.current += Math.max(0, -dy);
        void (async () => {
          await videoControls.start({
            rotate: transformedVideoRotate,
            scale: transformedVideoScale,
            x: below960VideoOffsetX,
            y: below960VideoOffsetY,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          });
          setIsTransformed(true);
          setHasEntered(true);
          setExitInProgress(false);
          document.body.style.overflow = bodyOverflowRef.current;
          const pending = pendingScrollDownRef.current;
          pendingScrollDownRef.current = 0;
          if (pending > 0) window.scrollBy({ top: pending, left: 0, behavior: "auto" });
        })();
        return;
      }

      if (!heroInView) return;

      if (!isTransformed) {
        if (dy > -32) return;
        e.preventDefault();
        tracking = false;
        setExitInProgress(true);
        pendingScrollDownRef.current += Math.max(0, -dy);
        void (async () => {
          await videoControls.start({
            rotate: transformedVideoRotate,
            scale: transformedVideoScale,
            x: below960VideoOffsetX,
            y: below960VideoOffsetY,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          });
          setIsTransformed(true);
          setExitInProgress(false);
          const pending = pendingScrollDownRef.current;
          pendingScrollDownRef.current = 0;
          if (pending > 0) window.scrollBy({ top: pending, left: 0, behavior: "auto" });
        })();
        return;
      }

      if (dy <= -32) {
        const el = containerRef.current;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const end = top + el.offsetHeight - window.innerHeight;
          if (window.scrollY < end - 1) {
            e.preventDefault();
            tracking = false;
            window.scrollTo({ top: end, behavior: "auto" });
            return;
          }
        }
      }

      if (dy < 32) return;
      e.preventDefault();
      tracking = false;
      setExitInProgress(true);
      void (async () => {
        await videoControls.start({
          rotate: defaultVideoRotate,
          scale: defaultVideoScale,
          x: below960VideoOffsetX,
          y: below960VideoOffsetY,
          transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
        });
        setIsTransformed(false);
        setExitInProgress(false);
      })();
    };

    const onTouchEnd = () => {
      tracking = false;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart as unknown as EventListener);
      window.removeEventListener("touchmove", onTouchMove as unknown as EventListener);
      window.removeEventListener("touchend", onTouchEnd as unknown as EventListener);
      window.removeEventListener("touchcancel", onTouchEnd as unknown as EventListener);
    };
  }, [below960VideoOffsetX, below960VideoOffsetY, defaultVideoRotate, defaultVideoScale, exitInProgress, hasEntered, heroInView, isBelow960, isCoarsePointer, isTransformed, transformedVideoRotate, transformedVideoScale, videoControls, videoEnded]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsNarrow(mql.matches);
    update();
    if (typeof (mql as unknown as { addEventListener?: unknown }).addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    const legacy = mql as unknown as { addListener?: (cb: () => void) => void; removeListener?: (cb: () => void) => void };
    legacy.addListener?.(update);
    return () => legacy.removeListener?.(update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 959px)");
    const update = () => setIsBelow960(mql.matches);
    update();
    if (typeof (mql as unknown as { addEventListener?: unknown }).addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    const legacy = mql as unknown as { addListener?: (cb: () => void) => void; removeListener?: (cb: () => void) => void };
    legacy.addListener?.(update);
    return () => legacy.removeListener?.(update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsCoarsePointer(mql.matches);
    update();
    if (typeof (mql as unknown as { addEventListener?: unknown }).addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    const legacy = mql as unknown as { addListener?: (cb: () => void) => void; removeListener?: (cb: () => void) => void };
    legacy.addListener?.(update);
    return () => legacy.removeListener?.(update);
  }, []);

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
      borderControls.set({ opacity: 1 });
      oneVisionWordsControls.set("show");
      videoControls.set({
        opacity: 1,
        rotate: defaultVideoRotate,
        scale: defaultVideoScale,
        x: below960VideoOffsetX,
        y: below960VideoOffsetY,
        filter: "blur(0px)",
      });
      aiControls.set({ opacity: 1 });
      aiLettersControls.set("show");
      setIntroDone(true);
      setScrollDownReady(true);
      setHasEntered(true);
      setVideoEnded(true);
      setIsTransformed(false);
      return;
    }

    setScrollDownReady(false);
    window.scrollTo({ top: 0 });

    const run = async () => {
      await borderControls.set({ opacity: 0 });
      await oneVisionWordsControls.set("hidden");
      await videoControls.set({
        opacity: 0,
        rotate: defaultVideoRotate,
        scale: defaultVideoScale,
        x: below960VideoOffsetX,
        y: below960VideoOffsetY,
        filter: enableHeavyVideoEffects ? "blur(18px)" : "blur(0px)",
      });
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
      const v = heroVideoRef.current;

      const tryEnsurePlaying = async (video: HTMLVideoElement) => {
        if (video.ended) return;
        if (!video.paused && video.readyState >= 2) return;
        video.muted = true;
        const p = video.play();
        if (p) await p.catch(() => { });
        if (video.ended) return;
        if (!video.paused && video.readyState >= 2) return;
        await new Promise<void>((resolve) => {
          const timeoutId = window.setTimeout(resolve, 2500);
          const onPlaying = () => {
            window.clearTimeout(timeoutId);
            resolve();
          };
          video.addEventListener("playing", onPlaying, { once: true });
        });
      };

      const waitForProgress = async (video: HTMLVideoElement, threshold: number) => {
        if (threshold <= 0) return;
        const calc = () => {
          if (video.ended) return 1;
          if (!Number.isFinite(video.duration) || video.duration <= 0) return 0;
          return Math.min(1, Math.max(0, video.currentTime / video.duration));
        };

        if (calc() >= threshold) return;

        await new Promise<void>((resolve) => {
          const timeoutId = window.setTimeout(resolve, 15000);
          const onUpdate = () => {
            if (calc() >= threshold) {
              cleanup();
              resolve();
            }
          };
          const onEnded = () => {
            cleanup();
            resolve();
          };
          const cleanup = () => {
            window.clearTimeout(timeoutId);
            video.removeEventListener("timeupdate", onUpdate);
            video.removeEventListener("loadedmetadata", onUpdate);
            video.removeEventListener("durationchange", onUpdate);
            video.removeEventListener("ended", onEnded);
          };
          video.addEventListener("timeupdate", onUpdate);
          video.addEventListener("loadedmetadata", onUpdate);
          video.addEventListener("durationchange", onUpdate);
          video.addEventListener("ended", onEnded, { once: true });
          onUpdate();
        });
      };

      let resolveVideoRevealDone: () => void = () => { };
      const videoRevealDone = new Promise<void>((resolve) => {
        resolveVideoRevealDone = resolve;
      });

      const videoTimeoutId = window.setTimeout(() => {
        v?.play().catch(() => { });
        const videoPromise = videoControls.start({
          opacity: [0, 1],
          rotate: defaultVideoRotate,
          scale: defaultVideoScale,
          x: below960VideoOffsetX,
          y: below960VideoOffsetY,
          ...(enableHeavyVideoEffects ? { filter: ["blur(18px)", "blur(0px)"] } : { filter: "blur(0px)" }),
          transition: { duration: 1.45, ease: [0.16, 1, 0.3, 1] },
        });
        videoPromise.then(() => resolveVideoRevealDone());
      }, triggerDelayMs);

      await oneVisionWordsControls.start("show");

      await videoRevealDone;
      window.clearTimeout(videoTimeoutId);

      if (v) {
        await tryEnsurePlaying(v);
        await waitForProgress(v, 0.6);
      }

      await aiControls.start({
        opacity: 1,
        transition: { duration: 0.01 },
      });
      await aiLettersControls.start("show");
      setScrollDownReady(true);
      setIntroDone(true);
    };

    run();
  }, [
    aiControls,
    aiLettersControls,
    below960VideoOffsetX,
    below960VideoOffsetY,
    borderControls,
    defaultVideoRotate,
    defaultVideoScale,
    enableHeavyVideoEffects,
    introDone,
    introReady,
    isCoarsePointer,
    oneVisionWordsControls,
    videoControls,
  ]);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative h-[260vh] w-full"
    >
      {/* Sticky container that stays pinned while scrolling */}
      <div className="sticky top-16 relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#f5f3ef]">
        <motion.div
          initial={{ opacity: 0, scale: defaultVideoScale, rotate: defaultVideoRotate, x: below960VideoOffsetX, y: below960VideoOffsetY, filter: enableHeavyVideoEffects ? "blur(18px)" : "blur(0px)" }}
          animate={videoControls}
          className="absolute inset-0 z-0 origin-center"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            ref={heroVideoRef}
            className="h-full w-full object-contain object-center 2xl:object-cover"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        </motion.div>
        <div className="container-custom relative z-10 flex h-full flex-col justify-center -translate-y-20 px-4 sm:-translate-y-10 md:translate-y-0 md:px-6 lg:px-8">

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

          <div className="relative -translate-y-10 grid grid-cols-1 items-center gap-y-8 sm:grid-cols-2 sm:gap-x-8 md:-translate-y-8 md:gap-y-10 lg:gap-y-16 lg:-translate-y-10">
            {/* Left Slogan - High z-index */}
            <div className="relative z-10 col-start-1 row-start-1 flex justify-center -translate-x-[95px] translate-y-10 sm:translate-x-0 sm:translate-y-0 md:-translate-y-2">
              <p
                ref={oneVisionHoverRef}
                className="whitespace-nowrap text-center text-base font-medium uppercase tracking-[0.22em] text-neutral-800 sm:text-lg md:text-2xl md:tracking-[0.3em] lg:text-3xl"
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

            {/* Right Slogan - High z-index */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={aiControls}
              className="relative z-10 col-start-1 row-start-2 flex justify-center translate-x-[105px] translate-y-16 sm:col-start-2 sm:row-start-1 sm:translate-x-0 sm:translate-y-0 md:-translate-x-8 md:translate-y-[5.5rem] lg:translate-x-[8rem]"
            >
              <p
                ref={aiHoverRef}
                className="whitespace-nowrap text-center text-base font-medium uppercase tracking-[0.22em] text-neutral-800 sm:text-lg md:text-2xl md:tracking-[0.3em] lg:text-3xl"
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
                  <span className="inline-block w-[0.55em] tracking-normal">{" "}</span>
                  <motion.span
                    className="relative inline-block align-baseline"
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
          {scrollDownReady && !hasEntered && !exitInProgress ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: scrollIndicatorOpacity }}
              className="absolute left-1/2 top-[72%] z-20 -translate-x-1/2 md:top-[82%] lg:top-[84%]"
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
