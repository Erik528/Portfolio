"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import hoverStyles from "./HeroSloganHover.module.css";

function HoverBlurText({ text, className }: { text: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const rafIdRef = useRef<number | null>(null);
    const latestRef = useRef<{ x: number; y: number } | null>(null);

    const update = () => {
        const root = ref.current;
        const latest = latestRef.current;
        if (!root || !latest) return;

        const elRect = root.getBoundingClientRect();
        const deadZone = 5;
        const maxBlur = 4.5;
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

    const schedule = (x: number, y: number) => {
        latestRef.current = { x, y };
        if (rafIdRef.current) return;
        rafIdRef.current = window.requestAnimationFrame(() => {
            rafIdRef.current = null;
            update();
        });
    };

    const reset = () => {
        const root = ref.current;
        if (!root) return;
        latestRef.current = null;
        const chars = root.querySelectorAll<HTMLElement>(`.${hoverStyles.char}`);
        chars.forEach((node) => node.style.setProperty("--blur", "0px"));
    };

    useEffect(() => {
        return () => {
            if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
        };
    }, []);

    return (
        <span
            ref={ref}
            onMouseMove={(e) => {
                schedule(e.clientX, e.clientY);
            }}
            onMouseLeave={() => {
                reset();
            }}
            className={`inline-block${className ? ` ${className}` : ""}`}
        >
            {Array.from(text).map((ch, idx) => (
                <span key={`${ch}-${idx}`} className={hoverStyles.char}>
                    {ch === " " ? "\u00A0" : ch}
                </span>
            ))}
        </span>
    );
}

type NavbarVariant = "home" | "workDetail";

type NavbarProps = {
    variant?: NavbarVariant;
};

export function Navbar({ variant = "home" }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navLinks = [
        { label: "Work", href: "#featured-work" },
        { label: "Resume", href: "#resume" },
        { label: "Contact", href: "#contact" },
    ];

    const leftLinks =
        variant === "workDetail" ? [{ label: "Back", href: "/#featured-work" }] : navLinks.slice(0, 1);

    const rightLinks = variant === "workDetail" ? [] : navLinks.slice(1);

    useEffect(() => {
        if (!menuOpen) return;
        const onResize = () => {
            if (window.matchMedia("(min-width: 768px)").matches) setMenuOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [menuOpen]);

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-300/50 bg-[#f5f3ef]/80 backdrop-blur-sm">
            <div className="container-custom relative px-4 md:px-6 lg:px-8">
                {/* Decorative plus signs at the corners of the top border */}
                <div className="absolute -top-[5px] left-0 text-[10px] font-bold text-neutral-400 lg:left-2">
                    +
                </div>
                <div className="absolute -top-[5px] right-0 text-[10px] font-bold text-neutral-400 lg:right-2">
                    +
                </div>

                {/* Decorative plus signs at the corners of the bottom border */}
                <div className="absolute -bottom-[5px] left-0 text-[10px] font-bold text-neutral-400 lg:left-2">
                    +
                </div>
                <div className="absolute -bottom-[5px] right-0 text-[10px] font-bold text-neutral-400 lg:right-2">
                    +
                </div>

                <nav className="relative flex h-16 items-center">
                    <div className={`${variant === "workDetail" ? "flex" : "hidden md:flex"} items-center gap-6 md:gap-12`}>
                        {leftLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="group relative py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-800 transition-colors hover:text-neutral-950"
                                onClick={() => setMenuOpen(false)}
                            >
                                {variant === "workDetail" ? (
                                    <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-3 inline-block align-middle text-neutral-800 transition-transform duration-500 group-hover:-translate-x-0.5"
                                    >
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                ) : null}
                                <HoverBlurText text={link.label} />
                            </a>
                        ))}
                    </div>

                    <div
                        className={`flex flex-1 items-center ${variant === "workDetail" ? "justify-end" : "justify-start"} md:flex-none md:absolute md:left-1/2 md:-translate-x-1/2`}
                    >
                        <Link href="/" className="relative flex items-center justify-center">
                            <HoverBlurText
                                text="Erik Wu"
                                className="text-[12px] font-extrabold uppercase tracking-[0.5em] text-neutral-950 md:text-[14px]"
                            />
                        </Link>
                    </div>

                    <div className="ml-auto flex items-center">
                        <div className="hidden items-center gap-6 md:flex md:gap-12">
                        {rightLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="group relative py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-800 transition-colors hover:text-neutral-950"
                                onClick={() => setMenuOpen(false)}
                            >
                                <HoverBlurText text={link.label} />
                            </a>
                        ))}
                        </div>
                        {variant === "workDetail" ? null : (
                            <button
                                type="button"
                                aria-label="Open menu"
                                aria-expanded={menuOpen}
                                onClick={() => setMenuOpen((v) => !v)}
                                className="md:hidden py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-800"
                            >
                                <HoverBlurText text="Menu" />
                            </button>
                        )}
                    </div>
                </nav>
                {variant === "workDetail" ? null : (
                    <div className={`${menuOpen ? "block" : "hidden"} md:hidden pb-4`}>
                        <div className="border-t border-neutral-300/50 pt-3 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="block py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-800"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
