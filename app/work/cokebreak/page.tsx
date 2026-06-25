import Image from "next/image";

import { CokeBreakConceptDevelopmentSection } from "../../../components/CokeBreakConceptDevelopmentSection";
import { CokeBreakFadeInOnView } from "../../../components/CokeBreakFadeInOnView";
import { CokeBreakHeroBubbles } from "../../../components/CokeBreakHeroBubbles";
import { CokeBreakHeroIntroText } from "../../../components/CokeBreakHeroIntroText";
import { CokeBreakScrollToTopButton } from "../../../components/CokeBreakScrollToTopButton";
import { CokeBreakTvcSection } from "../../../components/CokeBreakTvcSection";
import { Navbar } from "../../../components/Navbar";

export default function CokeBreakPage() {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Navbar variant="workDetail" />
      <main className="flex-1">
        <section className="relative border-b border-neutral-300/50 pb-16 pt-8 md:pb-20 md:pt-10 lg:pb-24 lg:pt-12">
          <div className="container-custom relative px-4 md:px-6 lg:px-8">
            <div className="mb-10">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <h1 className="text-[18px] font-bold uppercase tracking-[0.4em] text-neutral-900 md:text-[22px]">
                    Coke Break Campaign
                  </h1>
                </div>

                <div className="mt-4 flex items-start gap-6">
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
                      Nov. 2022 - Jun. 2023
                    </div>
                  </div>

                  <div className="pt-[2px] text-[10px] font-bold text-neutral-900">+</div>
                </div>
              </div>

              <div className="relative mt-2 border-b border-neutral-300/70">
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-7">
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-[680px] lg:max-w-[760px]">
                    <Image
                      src="/assets/cokebreak1.png"
                      alt="Coke Break key visual"
                      fill
                      className="origin-center scale-[2] object-contain"
                      priority
                    />
                  </div>
                </div>

                <CokeBreakHeroIntroText />
              </div>

              <CokeBreakHeroBubbles
                containerClassName="pointer-events-none absolute inset-0 z-0"
                bubbles={[
                  {
                    src: "/assets/bubble2.png",
                    className: "absolute bottom-[12%] right-[17%] scale-[0.5] h-20 w-[7.5rem] md:h-28 md:w-20",
                  },
                  {
                    src: "/assets/bubble1.png",
                    className:
                      "absolute bottom-[5%] right-[8%] origin-bottom-right scale-[0.5] h-32 w-32 md:h-40 md:w-40 lg:h-44 lg:w-44",
                  },
                  { src: "/assets/bubble1.png", className: "", enabled: false },
                ]}
              />
              <CokeBreakHeroBubbles
                containerClassName="pointer-events-none absolute inset-0 z-20"
                bubbles={[
                  {
                    src: "/assets/bubble1.png",
                    className: "absolute bottom-[2%] left-[30%] h-16 w-16 -translate-x-1/2 translate-y-1/3 md:h-20 md:w-20",
                    startOffset: 260,
                    range: [0, 340],
                  },
                  { src: "/assets/bubble1.png", className: "", enabled: false },
                  { src: "/assets/bubble1.png", className: "", enabled: false },
                ]}
              />
            </div>

            <div className="mt-16 md:mt-20 lg:mt-24">
              <CokeBreakTvcSection
                previewSrc="/videos/0417-CokeBreakMontage.mp4"
                youtubeUrl="https://youtu.be/JROW5BiFSPA"
              />
            </div>

            <CokeBreakConceptDevelopmentSection
              sketchSrc="/assets/CokeBreakSketch2.png"
              characterSrc="/assets/0419-CokeBreak%E8%AE%BE%E5%AE%9A%E5%9B%BEA_%E7%94%BB%E6%9D%BF%201.png"
              sceneSrc="/assets/0609-coke%20break%20TVC%20music%E7%B4%A0%E6%9D%90Ac.jpg"
            />

            <div className="mt-16 md:mt-20 lg:mt-24">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-neutral-900">+</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
                  TVC - Campus Edition
                </span>
                <span className="h-px flex-1 bg-neutral-300" />
              </div>

              <div className="mt-8 relative aspect-video w-full overflow-hidden bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/lFolg3iN1IQ?rel=0&modestbranding=1"
                  title='Coca-Cola 2023 "Coke Break" Campaign – Campus Edition TVC'
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-16 md:mt-20 lg:mt-24">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-neutral-900">+</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
                  OOH Concept
                </span>
                <span className="h-px flex-1 bg-neutral-300" />
              </div>

              <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-7">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/9-X8QinK_kE?rel=0&modestbranding=1"
                      title="Coke Break 3D OOH SH"
                      allow="encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="md:col-span-5">
                  <CokeBreakFadeInOnView className="max-w-[560px] text-[16px] leading-[1.55] text-neutral-900 md:text-[18px]">
                    <p>
                      In addition, we were also responsible for the creative work behind the outdoor advertising and
                      social media marketing content.
                    </p>
                    <p className="mt-6">
                      Working closely with our production partners, we created 3D animations for 14 naked eye screens of
                      various sizes across China — all within around one month. We also collaborated with Zcool to
                      produce a large amount of high-quality content.
                    </p>
                    <p className="mt-6">
                      The brand invested heavily in media placement (with a budget of around 30 million AUD), and the
                      campaign eventually reached over 600 million people nationwide, leading to a significant boost in
                      sales.
                    </p>
                  </CokeBreakFadeInOnView>
                </div>
              </div>
            </div>

            <div className="mt-16 md:mt-20 lg:mt-24">
              <div className="text-[14px] font-bold uppercase tracking-[0.4em] text-neutral-900 md:text-[16px]">
                COKE AI CREATIVE COMPETITIION
              </div>
              <div className="mt-3 border-b border-neutral-300/70" />

              <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <CokeBreakFadeInOnView
                    className="max-w-[420px] text-[16px] leading-[1.55] text-neutral-900 md:text-[18px]"
                    amount={0.7}
                    delay={0.2}
                  >
                    <p>
                      Partnered with Zcool (China’s version of Behance) to launch an AI-powered design contest themed
                      around the Coke Portal concept, the competition attracted a large number of outstanding entries
                      from talented designers, further strengthening the visual impact and recognition of the Portal as
                      a core campaign symbol.
                    </p>
                  </CokeBreakFadeInOnView>

                </div>

                <div className="md:col-span-8">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                      <Image src="/assets/出游6小.jpg" alt="Coke AI creative contest entry" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                      <Image src="/assets/开学4小.jpg" alt="Coke AI creative contest entry" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                      <Image src="/assets/女足世界杯小.jpg" alt="Coke AI creative contest entry" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                      <Image src="/assets/云2小.jpg" alt="Coke AI creative contest entry" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 md:mt-20 lg:mt-24">
              <div className="text-[14px] font-bold uppercase tracking-[0.4em] text-neutral-900 md:text-[16px]">
                ACTIVATION IDEA
              </div>
              <div className="mt-3 border-b border-neutral-300/70" />

              <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-7 lg:col-span-7">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/u9yQ74Y6Xw4?rel=0&modestbranding=1"
                      title="Chengdu Taikoo Li Activation"
                      allow="encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="md:col-span-5 lg:col-span-5 md:self-stretch">
                  <div className="flex h-full flex-col">
                    <CokeBreakFadeInOnView
                      className="w-full text-[16px] leading-[1.55] text-neutral-900 md:text-[18px]"
                      amount={0.7}
                      delay={0.2}
                    >
                      <p>
                        We also collaborated with two iconic Chinese landmarks, Shanghai’s Wukang Mansion and Chengdu
                        Taikoo Li, producing two event-marketing films powered by AR technology. One of them, Wukang
                        Mansion Activation, unexpectedly went viral on the Chinese internet.
                      </p>
                    </CokeBreakFadeInOnView>

                    <CokeBreakScrollToTopButton className="mt-auto ml-auto mr-8 hidden md:block" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
