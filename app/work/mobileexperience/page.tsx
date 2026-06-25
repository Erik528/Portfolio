import { Navbar } from "../../../components/Navbar";
import { CokeBreakScrollToTopButton } from "../../../components/CokeBreakScrollToTopButton";
import { VisualCampaignsGallery } from "../../../components/VisualCampaignsGallery";
import { VisualCampaignsIntro } from "../../../components/VisualCampaignsIntro";
import { MobileExperienceSixColumnGallery } from "../../../components/MobileExperienceSixColumnGallery";

export default function MobileExperiencePage() {
  const featuredImages = [
    {
      src: "/assets/MobileExperience/2.png",
      alt: "Mobile experience 2",
      caption: "The brand identity design and UI demo for a data monitoring product under a company with a lion logo",
    },
    {
      src: "/assets/MobileExperience/new.gif",
      alt: "Mobile experience new",
      caption: "Dynamic logo animation created to bring the brand to life in a bold and futuristic way",
    },
  ] as const;
  const sixColumnImages = [
    [
      {
        src: "/assets/MobileExperience/C4.jpg",
        alt: "Mobile experience C4",
        caption: "Crocs WeChat Mini Program Design (2025)",
      },
      {
        src: "/assets/MobileExperience/C5.jpg",
        alt: "Mobile experience C5",
        caption: "Crocs WeChat Mini Program Design (2025)",
      },
      {
        src: "/assets/MobileExperience/C6.jpg",
        alt: "Mobile experience C6",
        caption: "Crocs WeChat Mini Program Design (2025)",
      },
    ],
    [
      {
        src: "/assets/MobileExperience/H1.jpg",
        alt: "Mobile experience H1",
        caption: "Huawei X1 Printer Launch Campaign H5 Design (2021)",
      },
      {
        src: "/assets/MobileExperience/H2.jpg",
        alt: "Mobile experience H2",
        caption: "Huawei X1 Printer Launch Campaign H5 Design (2021)",
      },
      {
        src: "/assets/MobileExperience/H3.jpg",
        alt: "Mobile experience H3",
        caption: "Huawei X1 Printer Launch Campaign H5 Design (2021)",
      },
    ],
    [
      {
        src: "/assets/MobileExperience/S1.jpg",
        alt: "Mobile experience S1",
        caption: "Sprite × iQIYI Campaign H5 Design (2020)",
      },
      {
        src: "/assets/MobileExperience/S2.jpg",
        alt: "Mobile experience S2",
        caption: "Sprite × iQIYI Campaign H5 Design (2020)",
      },
      {
        src: "/assets/MobileExperience/S3.jpg",
        alt: "Mobile experience S3",
        caption: "Sprite × iQIYI Campaign H5 Design (2020)",
      },
    ],
    [
      {
        src: "/assets/MobileExperience/C2.jpg",
        alt: "Mobile experience C2",
        caption: "Crocs WeChat Mini Program Design (2025)",
      },
      {
        src: "/assets/MobileExperience/C3.jpg",
        alt: "Mobile experience C3",
        caption: "Crocs WeChat Mini Program Design (2025)",
      },
    ],
    [
      { src: "/assets/MobileExperience/V1.jpg", alt: "Mobile experience V1", caption: "Vaillant Campaign H5 Design (2018)" },
      { src: "/assets/MobileExperience/V2.jpg", alt: "Mobile experience V2", caption: "Vaillant Campaign H5 Design (2018)" },
      { src: "/assets/MobileExperience/V3.jpg", alt: "Mobile experience V3", caption: "Vaillant Campaign H5 Design (2018)" },
    ],
    [
      { src: "/assets/MobileExperience/G1.jpg", alt: "Mobile experience G1", caption: "IBS-C  Campaign H5 Design (2019)" },
      { src: "/assets/MobileExperience/G2.jpg", alt: "Mobile experience G2", caption: "IBS-C  Campaign H5 Design (2019)" },
      { src: "/assets/MobileExperience/G3.jpg", alt: "Mobile experience G3", caption: "IBS-C  Campaign H5 Design (2019)" },
    ],
  ] as const;
  const gifImages = [
    { src: "/assets/MobileExperience/A.gif", alt: "Mobile experience A1" },
    { src: "/assets/MobileExperience/B1.gif", alt: "Mobile experience B1" },
    { src: "/assets/MobileExperience/B2.gif", alt: "Mobile experience B2" },
    { src: "/assets/MobileExperience/C.gif", alt: "Mobile experience C" },
    { src: "/assets/MobileExperience/D1.gif", alt: "Mobile experience D1" },
    { src: "/assets/MobileExperience/D2.gif", alt: "Mobile experience D2" },
    { src: "/assets/MobileExperience/D3.gif", alt: "Mobile experience D3" },
    { src: "/assets/MobileExperience/E.gif", alt: "Mobile experience E" },
    { src: "/assets/MobileExperience/G2.gif", alt: "Mobile experience G2" },
  ] as const;

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Navbar variant="workDetail" />
      <main className="flex-1">
        <section className="relative border-b border-neutral-300/50 pb-16 pt-8 md:pb-20 md:pt-10 lg:pb-24 lg:pt-12">
          <div className="container-custom relative px-4 md:px-6 lg:px-8">
            <div className="mb-10">
              <div className="flex items-start justify-between gap-8">
                <h1 className="text-[18px] font-bold uppercase tracking-[0.4em] text-neutral-900 md:text-[22px]">
                  Mobile Experience
                </h1>
                <div className="pt-[2px] text-[10px] font-bold text-neutral-900">+</div>
              </div>
              <div className="relative mt-2 border-b border-neutral-300/70" />
            </div>

            <VisualCampaignsIntro
              className="mb-12 mx-auto max-w-[72ch] text-center text-[14px] leading-[1.6] text-neutral-700 md:text-[16px]"
              paragraphs={[
                "Here are highlights from my recent mobile design projects, featuring Mini Program UI showcases, scroll page layouts, and a variety of mobile campaign creatives, including: the 2021 Darphin mobile visual campaign, the 2021 Estée Lauder store page visuals, the 2025 Crocs Mini Program UI and campaign page designs, the 2020 Sprite mobile campaign materials, including interactive H5 pages and promotional visuals. etc... These works span UI design, scrollable page layouts, and creative storytelling across a variety of mobile platforms and formats.",
              ]}
            />

            <VisualCampaignsGallery
              images={[...featuredImages]}
              featured={{
                images: [...featuredImages],
                captionMode: "per-image",
                layout: "row",
              }}
            />

            <div className="mt-12">
              <MobileExperienceSixColumnGallery columns={sixColumnImages.map((col) => [...col])} />
            </div>

            <div className="mt-14">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-neutral-300/70" />
                <div className="text-[12px] font-bold uppercase tracking-[0.4em] text-neutral-900">
                  LONG-FORM MOBILE PAGE
                </div>
                <div className="h-px flex-1 bg-neutral-300/70" />
              </div>

              <div className="mx-auto mb-10 max-w-[76ch] text-center text-[14px] leading-[1.65] text-neutral-700 md:text-[16px]">
                <p>
                  The visuals below are vertically scrolling layouts designed specifically for mobile users, allowing
                  viewers to continuously scroll down on their phones for a seamless browsing experience. Because of
                  this, this section may appear unusually “long” when viewed on a desktop computer.
                </p>
                <p className="mt-6">
                  The design and layout of these works were created using Adobe Photoshop, Adobe After Effects, and
                  Cinema 4D.
                </p>
              </div>

              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-5">
                <div className="w-full">
                  <div className="flex flex-col leading-none">
                    {gifImages.map((img) => (
                      <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="block h-auto w-full" />
                    ))}
                  </div>
                </div>

                <div className="w-full">
                  <img
                    src="/assets/MobileExperience/0615-Darphindemo-c.jpg"
                    alt="Mobile experience 0615-Darphindemo-c"
                    className="block h-auto w-full"
                  />
                  <div className="h-6" />
                  <img
                    src="/assets/MobileExperience/0615-Darphin小程序demo 内页A.jpg"
                    alt="Mobile experience 0615-Darphin Mini Program demo A"
                    className="block h-auto w-full"
                  />
                </div>

                <div className="w-full">
                  <img
                    src="/assets/MobileExperience/1010-.jpg"
                    alt="Mobile experience 1010"
                    className="block h-auto w-full"
                  />
                </div>

                <div className="w-full">
                  <div className="flex flex-col leading-none">
                    <img src="/assets/MobileExperience/SST1.png" alt="Mobile experience SST1" loading="lazy" className="block h-auto w-full" />
                    <img src="/assets/MobileExperience/SST2.png" alt="Mobile experience SST2" loading="lazy" className="block h-auto w-full" />
                    <img src="/assets/MobileExperience/SST3.png" alt="Mobile experience SST3" loading="lazy" className="block h-auto w-full" />
                  </div>
                </div>

                <div className="w-full">
                  <img
                    src="/assets/MobileExperience/0110-凯迪拉克Tiffany联姻 长图 竖版c.jpg"
                    alt="Mobile experience 0110 Cadillac Tiffany longform c"
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <CokeBreakScrollToTopButton className="mt-24 md:mt-32" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
