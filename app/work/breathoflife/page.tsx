import { Navbar } from "../../../components/Navbar";
import { CokeBreakTvcSection } from "../../../components/CokeBreakTvcSection";
import { CokeBreakFadeInOnView } from "../../../components/CokeBreakFadeInOnView";
import { RevealImageOnView } from "../../../components/RevealImageOnView";

const videoSrc = "/videos/0417-BreathOfLifeMontage.mp4";
const youtubeUrl = "https://youtu.be/RotRNImfVHA?si=DH-Ltc87hlbSqdxs";

export default function BreathOfLifePage() {
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
                    Breath Of Life
                  </h1>
                </div>

                <div className="mt-4 flex items-start gap-6">
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">
                      Jan. 2019 - Apr. 2019
                    </div>
                  </div>

                  <div className="pt-[2px] text-[10px] font-bold text-neutral-900">+</div>
                </div>
              </div>

              <div className="relative mt-2 border-b border-neutral-300/70" />
            </div>

            <div className="mt-10 w-full bg-[#f5f3ef] md:mt-12 lg:mt-14">
              <div className="grid grid-cols-1 gap-10 px-4 py-10 md:grid-cols-12 md:gap-12 md:px-8 md:py-12 lg:gap-16 lg:px-10 lg:py-14">
                <div className="md:col-span-7 lg:col-span-7">
                  <div className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[640px] lg:h-[720px]">
                    <RevealImageOnView
                      src="/assets/jimeng-2026-04-21-9916.png"
                      alt="Breath Of Life key visual"
                      priority
                      variant="circle"
                      className="absolute inset-0"
                      imageClassName="origin-center scale-[1.12] object-contain object-center md:origin-left md:scale-[1.2] md:object-left"
                      backgroundColor="#f5f3ef"
                    />
                  </div>
                </div>

                <div className="flex md:col-span-5 md:items-end lg:col-span-5">
                  <div className="ml-auto w-full max-w-[640px] md:max-w-[720px] lg:max-w-[840px] xl:max-w-[980px]">
                    <CokeBreakFadeInOnView delay={1.35} className="mb-6">
                      <div className="flex justify-end md:justify-start">
                        <img src="/assets/COPD.png" alt="COPD" className="h-10 w-auto md:h-12 lg:h-14" />
                      </div>
                    </CokeBreakFadeInOnView>

                    <CokeBreakFadeInOnView delay={0.75}>
                      <div className="text-left text-[16px] leading-[1.55] text-neutral-900 md:text-[18px]">
                        <p>
                          In China, nearly 100 million people live with COPD, yet fewer than 7% are diagnosed. Many mistake
                          breathlessness for aging, and miss the warning signs.
                        </p>

                        <p className="mt-6">So we turned the phone into a simple self-check tool.</p>

                        <p className="mt-6">
                          Inspired by traditional blow painting, we created Breath of Life. Users take a deep breath and blow
                          into their phone, where the microphone captures the airflow and converts it into sound waves. Our
                          algorithm transforms those waves into a growing tree, and its size reflecting lung capacity.
                        </p>

                        <p className="mt-6">
                          In a single breath, people can see what they’ve been ignoring—and take the first step toward action.
                        </p>
                      </div>
                    </CokeBreakFadeInOnView>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 md:mt-24 lg:mt-28">
              <CokeBreakTvcSection
                previewSrc={videoSrc}
                youtubeUrl={youtubeUrl}
                title="GlaxoSmithKline - Breath of life (Case Study) | Campaign"
                startOnPreviewClick
                playButtonTone="dark"
              />
            </div>

            <div className="mt-16 md:mt-20 lg:mt-24">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-neutral-900">+</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-900">H5 page display</span>
                <span className="h-px flex-1 bg-neutral-300" />
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-3">
                <CokeBreakFadeInOnView className="w-full">
                  <img src="/assets/BOL1.png" alt="Breath of Life H5 page display 1" className="w-full h-auto" />
                </CokeBreakFadeInOnView>
                <CokeBreakFadeInOnView delay={0.1} className="w-full">
                  <img src="/assets/BOL2.png" alt="Breath of Life H5 page display 2" className="w-full h-auto" />
                </CokeBreakFadeInOnView>
                <CokeBreakFadeInOnView delay={0.2} className="w-full md:flex md:h-full md:pl-6 lg:pl-8">
                  <div className="mt-8 text-left text-[16px] leading-[1.55] text-neutral-900 md:mt-auto md:ml-auto md:max-w-[420px] md:text-[18px]">
                    <p>
                      Here is how it works: Users take a deep breath and blow into their phone. The phone turns the sound
                      of the breath into a visual image using our algorithm.
                    </p>
                    <p className="mt-6">
                      And then a tree appears on the screen. The bigger the tree, the stronger the lung capacity.
                    </p>
                    <p className="mt-6">
                      If the lung capacity is below a certain threshold, the app will suggest the user for further checks.
                    </p>
                  </div>
                </CokeBreakFadeInOnView>
              </div>

              <div className="mt-12 h-px w-full bg-neutral-300" />

              <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-0">
                <CokeBreakFadeInOnView className="w-full">
                  <div className="h-[320px] w-full overflow-hidden bg-neutral-100 md:h-[360px] lg:h-[420px]">
                    <img src="/assets/BOL3.png" alt="Breath of Life Cannes photo" className="h-full w-full object-contain" />
                  </div>
                  <div className="mt-4 text-center text-[12px] leading-[1.45] text-neutral-700">
                    our team’s Creative Director and Executive Creative Director at Cannes
                  </div>
                </CokeBreakFadeInOnView>
                <CokeBreakFadeInOnView delay={0.1} className="w-full">
                  <div className="h-[320px] w-full overflow-hidden bg-neutral-100 md:h-[360px] lg:h-[420px]">
                    <img src="/assets/BOL4.jpg" alt="Cannes Lions trophy in office" className="h-full w-full object-contain" />
                  </div>
                  <div className="mt-4 text-center text-[12px] leading-[1.45] text-neutral-700">the Cannes Lions trophy in office</div>
                </CokeBreakFadeInOnView>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
