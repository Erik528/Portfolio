import { Navbar } from "../../../components/Navbar";
import { CokeBreakTvcSection } from "../../../components/CokeBreakTvcSection";
import { CokeBreakFadeInOnView } from "../../../components/CokeBreakFadeInOnView";
import { CokeBreakScrollToTopButton } from "../../../components/CokeBreakScrollToTopButton";

const videoSrc = "/videos/0417-CokeOlympicMontage.mp4";
const youtubeUrl = "https://youtu.be/Rf6XjVa_XUs";

export default function OlympicPage() {
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
                    Coke Olympic Campaign
                  </h1>
                </div>

                <div className="mt-4 flex items-start gap-6">
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
                      Sep 2023 - Jan. 2024
                    </div>
                  </div>

                  <div className="pt-[2px] text-[10px] font-bold text-neutral-900">+</div>
                </div>
              </div>

              <div className="relative mt-2 border-b border-neutral-300/70" />
            </div>

            <CokeBreakTvcSection
              previewSrc={videoSrc}
              youtubeUrl={youtubeUrl}
              title="Coca-Cola - Olympic Campaign | Montage"
              startOnPreviewClick
              playButtonTone="light"
            />

            <CokeBreakFadeInOnView className="mt-10 w-full md:mt-12">
              <div className="text-[16px] leading-[1.55] text-neutral-900 md:text-[18px]">
                <p>
                  In mid-2023, our team was entrusted with planning Coca-Cola’s campaign for the 2024 Paris Olympics.
                </p>

                <p className="mt-6">
                  Centering on the slogan “Embrace the Moment – Let’s Win Together”, the campaign aimed to create
                  emotional connections through every hug seen on the Olympic stage — celebrating not only athletic
                  achievements but also human connection.
                </p>

                <p className="mt-6">
                  By promoting the spirit of “embracing differences”, the campaign brought people closer, bridging
                  individuals and cultures, and turning moments of diversity into powerful expressions of unity and
                  possibility. Rather than focusing solely on winning or losing, the campaign celebrated athletes while
                  also inspiring everyone watching to embrace their own journey.
                </p>

                <p className="mt-6">
                  During the 2024 Olympic Games, the campaign achieved widespread attention and great success, both in
                  media reach and emotional impact.
                </p>
              </div>
            </CokeBreakFadeInOnView>

            <div className="mt-16 md:mt-20 lg:mt-24">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-neutral-900">+</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
                  Key Visuals for the campaign
                </span>
                <span className="h-px flex-1 bg-neutral-300" />
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:gap-4">
                <div className="w-full">
                  <img src="/assets/OLP1.jpg" alt="Key Visual 1" loading="lazy" className="w-full h-auto" />
                </div>
                <div className="w-full">
                  <img src="/assets/OLP2.jpg" alt="Key Visual 2" loading="lazy" className="w-full h-auto" />
                </div>
                <div className="w-full">
                  <img src="/assets/OLP3.jpg" alt="Key Visual 3" loading="lazy" className="w-full h-auto" />
                </div>
                <div className="w-full">
                  <img src="/assets/OLP4.jpg" alt="Key Visual 4" loading="lazy" className="w-full h-auto" />
                </div>
              </div>

              <CokeBreakFadeInOnView delay={0.25} className="mx-auto mt-10 max-w-[980px] md:mt-12">
                <div className="text-center text-[14px] leading-[1.6] text-neutral-700 md:text-[16px]">
                  Because these athletes train in different locations, we had to travel across multiple places to
                  complete the four key visuals—one of them, featuring the track and field athlete, was even shot in the
                  United States.
                </div>
              </CokeBreakFadeInOnView>

              <div className="mt-12">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-neutral-900">+</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">SOCIAL POSTERS</span>
                  <span className="h-px flex-1 bg-neutral-300" />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:gap-4">
                  <div className="w-full">
                    <img src="/assets/OLP5.jpg" alt="Social poster 1" loading="lazy" className="w-full h-auto" />
                  </div>
                  <div className="w-full">
                    <img src="/assets/OLP6.jpg" alt="Social poster 2" loading="lazy" className="w-full h-auto" />
                  </div>
                  <div className="w-full">
                    <img src="/assets/OLP7.jpg" alt="Social poster 3" loading="lazy" className="w-full h-auto" />
                  </div>
                  <div className="w-full">
                    <img src="/assets/OLP8.jpg" alt="Social poster 4" loading="lazy" className="w-full h-auto" />
                  </div>
                </div>

                <CokeBreakFadeInOnView delay={0.25} className="mx-auto mt-10 max-w-[980px] md:mt-12">
                  <div className="text-center text-[14px] leading-[1.6] text-neutral-700 md:text-[16px]">
                    During the Olympic Games, we continued the “Embrace Differences” narrative across social media, using
                    authentic, real-time footage to keep the storytelling alive and emotionally engaging.
                  </div>
                </CokeBreakFadeInOnView>
              </div>
            </div>

            <div className="flex justify-center">
              <CokeBreakScrollToTopButton className="mt-40" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
