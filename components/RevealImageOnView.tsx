"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type RevealImageOnViewProps = {
    src: string;
    alt: string;
    priority?: boolean;
    sizes?: string;
    imageClassName?: string;
    backgroundColor?: string;
    variant?: "wipe" | "circle";
    circleOrigin?: { xPercent: number; yPercent: number };
    className?: string;
};

export function RevealImageOnView({
    src,
    alt,
    priority,
    sizes = "100vw",
    imageClassName,
    backgroundColor = "#f5f3ef",
    variant = "wipe",
    circleOrigin = { xPercent: 18, yPercent: 100 },
    className,
}: RevealImageOnViewProps) {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -12% 0px" });
    const [forceVisible, setForceVisible] = useState(false);

    const circleStart = `circle(0% at ${circleOrigin.xPercent}% ${circleOrigin.yPercent}%)`;
    const circleEnd = `circle(200% at ${circleOrigin.xPercent}% ${circleOrigin.yPercent}%)`;

    useEffect(() => {
        if (reduceMotion) return;
        if (inView) return;

        const check = () => {
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight || 0;
            const visible = r.top < vh * 0.9 && r.bottom > vh * 0.1;
            if (visible) setForceVisible(true);
        };

        check();
        const t1 = window.setTimeout(check, 650);
        const t2 = window.setTimeout(check, 1650);
        window.addEventListener("scroll", check, { passive: true });
        window.addEventListener("resize", check);
        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            window.removeEventListener("scroll", check);
            window.removeEventListener("resize", check);
        };
    }, [inView, reduceMotion]);

    const shouldShow = reduceMotion || inView || forceVisible;

    return (
        <motion.div
            ref={ref}
            initial={
                reduceMotion
                    ? false
                    : variant === "circle"
                      ? { opacity: 0, y: 18, scale: 0.985, clipPath: circleStart, filter: "blur(6px)" }
                      : { opacity: 0, y: 18 }
            }
            animate={
                reduceMotion
                    ? undefined
                    : shouldShow
                      ? variant === "circle"
                        ? { opacity: 1, y: 0, scale: 1, clipPath: circleEnd, filter: "blur(0px)" }
                        : { opacity: 1, y: 0 }
                      : variant === "circle"
                        ? { opacity: 0, y: 18, scale: 0.985, clipPath: circleStart, filter: "blur(6px)" }
                        : { opacity: 0, y: 18 }
            }
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            <Image src={src} alt={alt} fill className={imageClassName} sizes={sizes} priority={priority} />

            {reduceMotion || variant !== "wipe" ? null : (
                <motion.div
                    aria-hidden="true"
                    initial={{ y: 0, opacity: 1 }}
                    animate={shouldShow ? { y: "-110%", opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, ${backgroundColor} 0%, ${backgroundColor} 68%, transparent 100%)`,
                    }}
                />
            )}

            {reduceMotion || variant !== "circle" ? null : (
                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0.9, scale: 0.65 }}
                    animate={shouldShow ? { opacity: 0, scale: 1.15 } : { opacity: 0.9, scale: 0.65 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                    className="pointer-events-none absolute inset-0"
                    style={{
                        transformOrigin: `${circleOrigin.xPercent}% ${circleOrigin.yPercent}%`,
                        background: `radial-gradient(circle at ${circleOrigin.xPercent}% ${circleOrigin.yPercent}%, ${backgroundColor} 0%, ${backgroundColor} 48%, transparent 70%)`,
                    }}
                />
            )}
        </motion.div>
    );
}
