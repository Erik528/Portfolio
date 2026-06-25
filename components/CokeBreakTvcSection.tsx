"use client";

import { useState } from "react";

type CokeBreakTvcSectionProps = {
  previewSrc: string;
  youtubeUrl?: string;
  externalUrl?: string;
  openExternalInNewTab?: boolean;
  title?: string;
  startOnPreviewClick?: boolean;
  playButtonTone?: "light" | "dark";
  inlinePlayback?: boolean;
};

const getYouTubeId = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id.length ? id : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      return v?.trim().length ? v.trim() : null;
    }

    return null;
  } catch {
    return null;
  }
};

export function CokeBreakTvcSection({
  previewSrc,
  youtubeUrl = "",
  externalUrl,
  openExternalInNewTab = true,
  title = "Video",
  startOnPreviewClick = false,
  playButtonTone = "light",
  inlinePlayback = false,
}: CokeBreakTvcSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeId(youtubeUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <div className="relative w-full overflow-hidden">
      {externalUrl ? (
        <a
          href={externalUrl}
          target={openExternalInNewTab ? "_blank" : undefined}
          rel={openExternalInNewTab ? "noopener noreferrer" : undefined}
          aria-label={title}
          suppressHydrationWarning
          className={`group relative block aspect-video w-full overflow-hidden bg-black ${startOnPreviewClick ? "cursor-pointer" : ""}`}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          >
            <source src={previewSrc} type="video/mp4" />
          </video>
        </a>
      ) : (
        <div
          className={`relative aspect-video w-full overflow-hidden bg-black ${!isPlaying && startOnPreviewClick && (inlinePlayback || !!videoId) ? "cursor-pointer" : ""}`}
          role={!isPlaying && startOnPreviewClick && (inlinePlayback || !!videoId) ? "button" : undefined}
          tabIndex={!isPlaying && startOnPreviewClick && (inlinePlayback || !!videoId) ? 0 : undefined}
          onClick={!isPlaying && startOnPreviewClick && (inlinePlayback || !!videoId) ? () => setIsPlaying(true) : undefined}
          onKeyDown={
            !isPlaying && startOnPreviewClick && (inlinePlayback || !!videoId)
              ? (event) => {
                if (event.key === "Enter" || event.key === " ") setIsPlaying(true);
              }
              : undefined
          }
        >
          {isPlaying ? (
            inlinePlayback ? (
              <video
                autoPlay
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={previewSrc} type="video/mp4" />
              </video>
            ) : embedUrl ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={embedUrl}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Invalid YouTube URL
              </div>
            )
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={previewSrc} type="video/mp4" />
            </video>
          )}
        </div>
      )}

      {!isPlaying && (externalUrl || videoId || inlinePlayback) ? (
        externalUrl ? (
          <a
            href={externalUrl}
            target={openExternalInNewTab ? "_blank" : undefined}
            rel={openExternalInNewTab ? "noopener noreferrer" : undefined}
            suppressHydrationWarning
            className="learnmore-btn group absolute bottom-4 right-4 z-20 inline-flex items-center gap-4 border border-white/20 bg-white/20 px-6 py-3.5 text-neutral-900 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:bg-white/30 md:bottom-6 md:right-6"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-500 group-hover:translate-x-0.5 ${playButtonTone === "dark" ? "text-neutral-900" : "text-white"}`}
            >
              <path d="M9 7l10 5-10 5z" fill="currentColor" stroke="none" />
            </svg>
            <span
              className={`learnmore-text text-[9px] font-bold tracking-[0.5em] transition-colors duration-500 ${playButtonTone === "dark" ? "text-neutral-900 group-hover:text-neutral-950" : "text-white group-hover:text-white"}`}
            >
              PLAY
            </span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
          className="learnmore-btn group absolute bottom-4 right-4 z-20 inline-flex items-center gap-4 border border-white/20 bg-white/20 px-6 py-3.5 text-neutral-900 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:bg-white/30 md:bottom-6 md:right-6"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-500 group-hover:translate-x-0.5 ${playButtonTone === "dark" ? "text-neutral-900" : "text-white"}`}
            >
              <path d="M9 7l10 5-10 5z" fill="currentColor" stroke="none" />
            </svg>
            <span
              className={`learnmore-text text-[9px] font-bold tracking-[0.5em] transition-colors duration-500 ${playButtonTone === "dark" ? "text-neutral-900 group-hover:text-neutral-950" : "text-white group-hover:text-white"}`}
            >
              PLAY
            </span>
          </button>
        )
      ) : null}
    </div>
  );
}
