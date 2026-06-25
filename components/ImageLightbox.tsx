"use client";

import { useEffect } from "react";

type ImageLightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
};

export function ImageLightbox({ open, onClose, src, alt, caption }: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default" />
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[18px] bg-background">
        <div className="max-h-[78vh] w-full overflow-hidden bg-neutral-200">
          <img src={src} alt={alt} loading="lazy" className="h-full max-h-[78vh] w-full object-contain" />
        </div>
        {caption ? (
          <div className="border-t border-neutral-300/70 px-5 py-4 text-center text-[12px] leading-[1.5] text-neutral-700 md:px-7 md:py-5 md:text-[13px]">
            {caption}
          </div>
        ) : null}
      </div>
    </div>
  );
}
