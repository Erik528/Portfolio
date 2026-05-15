"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function HomeLoadingOverlay() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const minDurationMs = useMemo(() => (reduceMotion ? 180 : 900), [reduceMotion]);

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();

    const waitForImage = async (img: HTMLImageElement) => {
      if (!img) return;
      if (img.complete && img.naturalWidth > 0) {
        if ("decode" in img) {
          try {
            await img.decode();
          } catch {
            return;
          }
        }
        return;
      }
      await new Promise<void>((resolve) => {
        const onLoad = () => {
          cleanup();
          resolve();
        };
        const onError = () => {
          cleanup();
          resolve();
        };
        const cleanup = () => {
          img.removeEventListener("load", onLoad);
          img.removeEventListener("error", onError);
        };
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onError, { once: true });
      });
      if ("decode" in img) {
        try {
          await img.decode();
        } catch {
          return;
        }
      }
    };

    const waitForVideoFullyLoaded = async (video: HTMLVideoElement) => {
      if (!video) return;

      const isFullyBuffered = () => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0) return false;
        const buffered = video.buffered;
        if (!buffered || buffered.length === 0) return false;
        let end = 0;
        for (let i = 0; i < buffered.length; i += 1) {
          end = Math.max(end, buffered.end(i));
        }
        return end >= duration - 0.1;
      };

      if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
        await new Promise<void>((resolve) => {
          const onReady = () => {
            cleanup();
            resolve();
          };
          const onError = () => {
            cleanup();
            resolve();
          };
          const cleanup = () => {
            video.removeEventListener("loadedmetadata", onReady);
            video.removeEventListener("error", onError);
          };
          video.addEventListener("loadedmetadata", onReady, { once: true });
          video.addEventListener("error", onError, { once: true });
        });
      }

      if (isFullyBuffered()) return;

      try {
        video.preload = "auto";
        video.load();
      } catch { }

      await new Promise<void>((resolve) => {
        const onCheck = () => {
          if (isFullyBuffered()) {
            cleanup();
            resolve();
          }
        };
        const onError = () => {
          cleanup();
          resolve();
        };
        const cleanup = () => {
          video.removeEventListener("progress", onCheck);
          video.removeEventListener("canplaythrough", onCheck);
          video.removeEventListener("durationchange", onCheck);
          video.removeEventListener("loadedmetadata", onCheck);
          video.removeEventListener("error", onError);
        };
        video.addEventListener("progress", onCheck);
        video.addEventListener("canplaythrough", onCheck);
        video.addEventListener("durationchange", onCheck);
        video.addEventListener("loadedmetadata", onCheck);
        video.addEventListener("error", onError, { once: true });
        onCheck();
      });
    };

    const find11MayVideo = () => {
      if (typeof document === "undefined") return;
      const videos = Array.from(document.querySelectorAll("video")).filter((video) => {
        const src = video.currentSrc || video.getAttribute("src") || "";
        if (src.includes("11May.mp4")) return true;
        const source = video.querySelector("source");
        const sourceSrc = source?.getAttribute("src") ?? "";
        return sourceSrc.includes("11May.mp4");
      });
      return videos[0];
    };

    const waitForAboveFoldImages = async () => {
      if (typeof document === "undefined") return;
      const topSection = document.querySelector("#top");
      const images = Array.from((topSection ?? document).querySelectorAll("img"));
      await Promise.all(images.map((img) => waitForImage(img)));
    };

    const waitFor11May = async () => {
      if (typeof document === "undefined") return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      const video = find11MayVideo();
      if (!video) return;
      await waitForVideoFullyLoaded(video);
    };

    const run = async () => {
      try {
        const fontsReady =
          typeof document !== "undefined" && "fonts" in document && document.fonts?.ready
            ? document.fonts.ready
            : Promise.resolve();

        await Promise.race([fontsReady, new Promise<void>((r) => window.setTimeout(r, 1200))]);
        await Promise.race([waitForAboveFoldImages(), new Promise<void>((r) => window.setTimeout(r, 5000))]);
        await waitFor11May();
        await new Promise<void>((r) => requestAnimationFrame(() => r()));

        const elapsed = performance.now() - start;
        const remaining = Math.max(0, minDurationMs - elapsed);
        if (remaining > 0) await new Promise<void>((r) => window.setTimeout(r, remaining));
      } finally {
        if (!cancelled) setVisible(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [minDurationMs]);

  return (
    <AnimatePresence>
      {!visible ? null : (
        <motion.div
          key="home-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: reduceMotion ? 0.12 : 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#f5f3ef] text-neutral-900"
        >
          <div className="pointer-events-none absolute inset-0 border-b border-neutral-300/50 border-t border-neutral-300/50" />

          <div className="pointer-events-none absolute left-4 top-4 text-[10px] font-bold text-neutral-400 md:left-6 md:top-6 lg:left-8 lg:top-8">
            +
          </div>
          <div className="pointer-events-none absolute right-4 top-4 text-[10px] font-bold text-neutral-400 md:right-6 md:top-6 lg:right-8 lg:top-8">
            +
          </div>
          <div className="pointer-events-none absolute left-4 bottom-4 text-[10px] font-bold text-neutral-400 md:left-6 md:bottom-6 lg:left-8 lg:bottom-8">
            +
          </div>
          <div className="pointer-events-none absolute right-4 bottom-4 text-[10px] font-bold text-neutral-400 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8">
            +
          </div>

          <div className="mx-auto flex h-full w-full max-w-[980px] flex-col items-center justify-center px-6">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, filter: "blur(10px)" }}
              animate={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.55em] text-neutral-600">Loading</div>
              <div className="mt-4 text-[18px] font-extrabold uppercase tracking-[0.5em] text-neutral-950 md:text-[22px]">
                Erik Wu
              </div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="mt-10 h-px w-64 overflow-hidden bg-neutral-300/70 md:w-72"
            >
              <motion.div
                initial={{ x: "-60%", opacity: 0 }}
                animate={{ x: "60%", opacity: [0, 1, 0] }}
                transition={{
                  duration: reduceMotion ? 1.2 : 1.35,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: Infinity,
                }}
                className="h-px w-24 bg-neutral-900/70"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
