import { Navbar } from "../../../components/Navbar";
import { CokeBreakTvcSection } from "../../../components/CokeBreakTvcSection";
import { CokeBreakFadeInOnView } from "../../../components/CokeBreakFadeInOnView";
import { CokeBreakScrollToTopButton } from "../../../components/CokeBreakScrollToTopButton";

const videoSrc = "/videos/0417-SpriteZeroMontage.mp4";

export default function SpriteZeroPage() {
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
                    Sprite Zero Campaign
                  </h1>
                </div>

                <div className="mt-4 flex items-start gap-6">
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
                      Dec. 2021 - Mar. 2022
                    </div>
                  </div>

                  <div className="pt-[2px] text-[10px] font-bold text-neutral-900">+</div>
                </div>
              </div>

              <div className="relative mt-2 border-b border-neutral-300/70" />
            </div>

            <CokeBreakTvcSection
              previewSrc={videoSrc}
              title="Sprite - Sprite Zero Campaign | Montage"
              externalUrl="https://youtu.be/f_CIKOd1gOI"
              startOnPreviewClick
              playButtonTone="dark"
            />

            <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-12 md:gap-12 lg:gap-16">
              <CokeBreakFadeInOnView className="md:col-span-7">
                <div className="text-[16px] leading-[1.55] text-neutral-900 md:text-[18px]">
                  <p>
                    In 2022, we launched a bold campaign that allowed users to scan the bottle of a competing brand —
                    Genki Forest — to claim a free bottle of Sprite Zero.
                  </p>

                  <p className="mt-6 text-neutral-700">
                    (For context: Genki Forest rapidly rose to popularity in mainland China after 2020 and even posed a
                    serious threat to Coca-Cola’s dominance in the local beverage market. You can even find it today in
                    the Asian food section at Coles)
                  </p>

                  <p className="mt-6">
                    This campaign was our way of confidently stating that Sprite Zero has no real rival in the sugar-free
                    category.
                  </p>

                  <p className="mt-6">
                    The result? Massive exposure and social engagement that year.
                  </p>
                </div>
              </CokeBreakFadeInOnView>

              <CokeBreakFadeInOnView delay={0.15} className="md:col-span-5">
                <img
                  src="/assets/0506-NScaseboardB.jpg"
                  alt="Sprite Zero campaign caseboard"
                  className="w-full h-auto"
                />
              </CokeBreakFadeInOnView>
            </div>

            <div className="mt-16 md:mt-20 lg:mt-24">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-neutral-900">+</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">Key Visuals</span>
                <span className="h-px flex-1 bg-neutral-300" />
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:gap-4">
                <CokeBreakFadeInOnView className="w-full">
                  <img src="/assets/SP1.jpg" alt="Sprite Zero key visual 1" loading="lazy" className="w-full h-auto" />
                </CokeBreakFadeInOnView>
                <CokeBreakFadeInOnView delay={0.1} className="w-full">
                  <img src="/assets/SP2.jpg" alt="Sprite Zero key visual 2" loading="lazy" className="w-full h-auto" />
                </CokeBreakFadeInOnView>
                <CokeBreakFadeInOnView delay={0.2} className="w-full">
                  <img src="/assets/SP3.jpg" alt="Sprite Zero key visual 3" loading="lazy" className="w-full h-auto" />
                </CokeBreakFadeInOnView>
                <CokeBreakFadeInOnView delay={0.3} className="w-full">
                  <img src="/assets/SP4.png" alt="Sprite Zero key visual 4" loading="lazy" className="w-full h-auto" />
                </CokeBreakFadeInOnView>
              </div>

              <div className="mt-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
                  <CokeBreakFadeInOnView delay={0.25} className="md:col-span-7">
                    <div className="text-left text-[14px] leading-[1.6] text-neutral-700 md:text-[16px]">
                      Interesting detail: The original KVs were more aggressive: under the ice cubes, there were defeated
                      competitor products, while Sprite stood on top like a champion. However, due to legal considerations,
                      that layer of meaning had to be removed. In the final version, we kept only the strong visual of
                      Sprite bottles stacked on ice. And I can confidently say that this KV is one of the strongest
                      ice-and-beverage visual executions you can find on Behance.
                    </div>
                  </CokeBreakFadeInOnView>

                  <CokeBreakFadeInOnView delay={0.35} className="md:col-span-5">
                    <img src="/assets/SP5.jpg" alt="Sprite Zero key visual detail 1" loading="lazy" className="w-full h-auto" />
                    <div className="mt-3 text-center text-[12px] leading-[1.45] text-neutral-700">Initial sketch</div>
                  </CokeBreakFadeInOnView>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:gap-4">
                  <CokeBreakFadeInOnView delay={0.45} className="w-full">
                    <img src="/assets/SP6.jpg" alt="Sprite Zero key visual detail 2" loading="lazy" className="w-full h-auto" />
                  </CokeBreakFadeInOnView>
                  <CokeBreakFadeInOnView delay={0.55} className="w-full">
                    <img src="/assets/SP7.jpg" alt="Sprite Zero key visual detail 3" loading="lazy" className="w-full h-auto" />
                  </CokeBreakFadeInOnView>
                </div>

                <CokeBreakFadeInOnView delay={0.5} className="mx-auto mt-4 max-w-[980px]">
                  <div className="text-center text-[12px] leading-[1.45] text-neutral-700">
                    KV layout created in Cinema 4D during the early stage of the project
                  </div>
                </CokeBreakFadeInOnView>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:gap-4">
                  <CokeBreakFadeInOnView delay={0.65} className="w-full">
                    <img src="/assets/SP8.jpg" alt="Sprite Zero key visual detail 4" loading="lazy" className="w-full h-auto" />
                  </CokeBreakFadeInOnView>
                  <CokeBreakFadeInOnView delay={0.75} className="w-full">
                    <img src="/assets/SP9.jpg" alt="Sprite Zero key visual detail 5" loading="lazy" className="w-full h-auto" />
                  </CokeBreakFadeInOnView>
                </div>

                <CokeBreakFadeInOnView delay={0.85} className="mx-auto mt-4 max-w-[980px]">
                  <div className="text-center text-[12px] leading-[1.45] text-neutral-700">
                    Photo of the on-set setup on the shooting day
                  </div>
                </CokeBreakFadeInOnView>

                <div className="flex justify-center">
                  <CokeBreakScrollToTopButton className="mt-40 hidden md:block" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
