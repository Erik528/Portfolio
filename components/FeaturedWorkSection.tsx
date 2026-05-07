import Link from "next/link";

const featuredWorkVideos = [
  {
    src: "/videos/0417-CokeBreakMontage.mp4",
    href: "/work/cokebreak",
    title: "COKE BREAK CAMPAIGN",
  },
  {
    src: "/videos/0417-BreathOfLifeMontage.mp4",
    href: "/work/breathoflife",
    title: "BREATH OF LIFE",
  },
  {
    src: "/videos/0417-CokeOlympicMontage.mp4",
    href: "/work/olympic",
    title: "COKE OLYMPIC CAMPAIGN",
  },
  {
    src: "/videos/0417-SpriteZeroMontage.mp4",
    href: "/work/spritezero",
    title: "SPRITE ZERO CAMPAIGN",
  },
];

const visualCampaignsCard = {
  title: "VISUAL CAMPAIGNS",
  href: "/work/visualcampaigns",
  src: "/assets/VisualCampaigns/1.mp4",
};

const mobileExperienceCard = {
  title: "MOBILE EXPERIENCE",
  href: "/work/mobileexperience",
  src: "/assets/MobileExperience/媒体1.mp4",
};

export function FeaturedWorkSection() {
  return (
    <section id="featured-work" className="relative border-b border-neutral-300/50 py-16 md:py-20 lg:py-24">
      <div className="container-custom relative px-4 md:px-6 lg:px-8">
        {/* Decorative plus signs at the corners of the bottom border */}
        <div className="absolute -bottom-[5px] left-0 text-[10px] font-bold text-neutral-400 lg:left-2">
          +
        </div>
        <div className="absolute -bottom-[5px] right-0 text-[10px] font-bold text-neutral-400 lg:right-2">
          +
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[18px] font-bold uppercase tracking-[0.4em] text-neutral-900 md:text-[22px]">
            Featured Work
          </h2>
          <div className="flex gap-4 text-[10px] font-bold text-neutral-400">
            <span>+</span>
            <span>+</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 min-[480px]:grid-cols-2 min-[480px]:gap-x-8 min-[480px]:gap-y-12">
          {featuredWorkVideos.map(({ src, href, title }, idx) => (
            <Link
              key={src}
              href={href}
              aria-label="View Work"
              className={`group block w-full min-w-0 ${idx < 2 ? "min-[480px]:col-span-2" : ""}`}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
                >
                  <source src={src} type="video/mp4" />
                </video>

                {(src === "/videos/0417-CokeBreakMontage.mp4" || src === "/videos/0417-BreathOfLifeMontage.mp4") && (
                  <div className="pointer-events-none absolute left-4 top-4 z-20 md:left-6 md:top-6">
                    <div
                      className={
                        src === "/videos/0417-BreathOfLifeMontage.mp4"
                          ? "select-none text-[22px] font-medium uppercase tracking-[0.08em] text-neutral-700 md:text-[29px] lg:text-[35px]"
                          : "mix-blend-difference select-none text-[22px] font-medium uppercase tracking-[0.08em] text-white md:text-[29px] lg:text-[35px]"
                      }
                    >
                      {title}
                    </div>
                  </div>
                )}

                <span
                  className={`learnmore-btn absolute bottom-4 right-4 z-20 items-center gap-4 bg-white/40 px-6 py-3.5 backdrop-blur-md transition-all duration-500 group-hover:bg-white/60 md:bottom-6 md:right-6 ${src === "/videos/0417-CokeOlympicMontage.mp4" || src === "/videos/0417-SpriteZeroMontage.mp4"
                    ? "hidden min-[960px]:flex"
                    : "flex"
                    }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-700 transition-transform duration-500 group-hover:translate-x-0.5"
                  >
                    <path d="M7 8h6v10M13 18l-3-3M13 18l3-3" />
                  </svg>
                  <span className="learnmore-text text-[9px] font-bold tracking-[0.5em] text-neutral-700 transition-colors duration-500 group-hover:text-neutral-900">
                    LEARN MORE
                  </span>
                </span>
              </div>

              {(src === "/videos/0417-CokeOlympicMontage.mp4" || src === "/videos/0417-SpriteZeroMontage.mp4") && (
                <div className="mt-4 w-full text-center text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
                  {title}
                </div>
              )}
            </Link>
          ))}

          <Link
            href={visualCampaignsCard.href}
            aria-label={visualCampaignsCard.title}
            className="group block w-full"
          >
            <div className="relative aspect-video w-full overflow-hidden border border-neutral-300/50">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={visualCampaignsCard.src} type="video/mp4" />
              </video>
              <span className="learnmore-btn absolute bottom-4 right-4 z-20 hidden items-center gap-4 bg-white/40 px-6 py-3.5 backdrop-blur-md transition-all duration-500 group-hover:bg-white/60 min-[960px]:flex md:bottom-6 md:right-6">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-700 transition-transform duration-500 group-hover:translate-x-0.5"
                >
                  <path d="M7 8h6v10M13 18l-3-3M13 18l3-3" />
                </svg>
                <span className="learnmore-text text-[9px] font-bold tracking-[0.5em] text-neutral-700 transition-colors duration-500 group-hover:text-neutral-900">
                  LEARN MORE
                </span>
              </span>
            </div>
            <div className="mt-4 w-full text-center text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
              {visualCampaignsCard.title}
            </div>
          </Link>

          <Link
            href={mobileExperienceCard.href}
            aria-label={mobileExperienceCard.title}
            className="group block w-full"
          >
            <div className="relative aspect-video w-full overflow-hidden border border-neutral-300/50">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={mobileExperienceCard.src} type="video/mp4" />
              </video>
              <span className="learnmore-btn absolute bottom-4 right-4 z-20 hidden items-center gap-4 bg-white/40 px-6 py-3.5 backdrop-blur-md transition-all duration-500 group-hover:bg-white/60 min-[960px]:flex md:bottom-6 md:right-6">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-700 transition-transform duration-500 group-hover:translate-x-0.5"
                >
                  <path d="M7 8h6v10M13 18l-3-3M13 18l3-3" />
                </svg>
                <span className="learnmore-text text-[9px] font-bold tracking-[0.5em] text-neutral-700 transition-colors duration-500 group-hover:text-neutral-900">
                  LEARN MORE
                </span>
              </span>
            </div>
            <div className="mt-4 w-full text-center text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
              {mobileExperienceCard.title}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
