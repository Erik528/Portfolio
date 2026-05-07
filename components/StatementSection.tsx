"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import hoverStyles from "./HeroSloganHover.module.css";

const statementHeadline =
  "THIS ISN’T ABOUT LOOKING BIGGER THAN ONE PERSON. IT’S ABOUT MAKING ONE PRACTICE WORK WITH MORE DEPTH, SPEED, AND FLEXIBILITY.";

const statementBody = (
  <>
    BUILT ON EIGHT YEARS OF PROFESSIONAL DESIGN AND CAMPAIGN EXPERIENCE, AND NOW AMPLIFIED BY{" "}
    <span className="font-bold">AI</span>, THE PROCESS HAS BECOME LEANER, SHARPER, AND FAR MORE PRODUCTIVE. THE THINKING
    IS STILL HUMAN. THE TASTE IS STILL HUMAN. THE DIFFERENCE IS HOW MUCH FASTER THE WORK CAN COME ALIVE.
  </>
);

function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffledOrder(length: number, seed: number) {
  const arr = Array.from({ length }, (_, i) => i);
  let s = seed >>> 0;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    s = (1664525 * s + 1013904223) >>> 0;
    const j = s % (i + 1);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  const rank = new Array<number>(length);
  for (let k = 0; k < arr.length; k += 1) rank[arr[k]] = k;
  return rank;
}

function RandomRevealHeadline({
  text,
  onRevealStart,
}: {
  text: string;
  onRevealStart?: (totalDurationSec: number) => void;
}) {
  const controls = useAnimationControls();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -20% 0px" });
  const hoverRef = useRef<HTMLHeadingElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const latestRef = useRef<{ x: number; y: number } | null>(null);

  const words = useMemo(() => text.split(" "), [text]);
  const letterCount = useMemo(() => words.reduce((acc, w) => acc + Array.from(w).length, 0), [words]);
  const orderRank = useMemo(() => shuffledOrder(letterCount, hashString(text)), [letterCount, text]);

  useEffect(() => {
    if (inView) {
      onRevealStart?.(2);
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

  return (
    <motion.h2
      ref={(node) => {
        ref.current = node;
        hoverRef.current = node;
      }}
      initial="hidden"
      animate={controls}
      className="text-left text-3xl font-bold leading-[1.1] tracking-tight text-neutral-900 md:text-5xl lg:text-7xl"
      onMouseMove={(e) => scheduleHoverGradient(e.clientX, e.clientY)}
      onMouseLeave={resetHoverGradient}
    >
      {(() => {
        let letterIndex = 0;
        return words.map((word, wordIdx) => {
          const letters = Array.from(word);
          const rendered = (
            <span key={`w-${wordIdx}`} className="inline-block whitespace-nowrap">
              {letters.map((ch, idx) => {
                const delayIndex = orderRank[letterIndex] ?? letterIndex;
                const t = letterCount > 1 ? delayIndex / (letterCount - 1) : 0;
                const delay = 1.15 * Math.sqrt(t);
                const key = `${ch}-${wordIdx}-${idx}`;
                letterIndex += 1;
                return (
                  <motion.span
                    key={key}
                    className={hoverStyles.char}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay,
                          duration: 0.85,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
          );

          if (wordIdx === words.length - 1) return rendered;
          return (
            <span key={`ws-${wordIdx}`} className="inline">
              {rendered}{" "}
            </span>
          );
        });
      })()}
    </motion.h2>
  );
}

export function StatementSection() {
  const bodyControls = useAnimationControls();
  const bodyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (bodyTimeoutRef.current !== null) {
        window.clearTimeout(bodyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="statement" className="relative border-b border-neutral-300/50 py-20 md:py-28 lg:py-32">
      <div className="container-custom relative px-4 md:px-6 lg:px-8">
        {/* Decorative plus signs at the corners of the bottom border */}
        <div className="absolute -bottom-[5px] left-0 text-[10px] font-bold text-neutral-400 lg:left-2">
          +
        </div>
        <div className="absolute -bottom-[5px] right-0 text-[10px] font-bold text-neutral-400 lg:right-2">
          +
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          <div className="w-full lg:max-w-[80%]">
            <RandomRevealHeadline
              text={statementHeadline}
              onRevealStart={(totalDurationSec) => {
                if (bodyTimeoutRef.current !== null) {
                  window.clearTimeout(bodyTimeoutRef.current);
                }
                bodyControls.set({ opacity: 0, filter: "blur(10px)" });
                bodyTimeoutRef.current = window.setTimeout(() => {
                  bodyControls.start({
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                  });
                }, totalDurationSec * 0.6 * 1000);
              }}
            />
          </div>
          <div className="w-full max-w-[420px] lg:ml-auto lg:mr-[10%]">
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={bodyControls}
              className="text-left text-[10px] font-medium leading-[1.8] tracking-widest text-neutral-800 md:text-[11px]"
            >
              {statementBody}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
