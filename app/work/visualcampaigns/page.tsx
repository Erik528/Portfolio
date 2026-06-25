import { Navbar } from "../../../components/Navbar";
import { CokeBreakScrollToTopButton } from "../../../components/CokeBreakScrollToTopButton";
import { VisualCampaignsIntro } from "../../../components/VisualCampaignsIntro";
import { VisualCampaignsGallery } from "../../../components/VisualCampaignsGallery";

export default function VisualCampaignsPage() {
  const images = [
    {
      src: "/assets/VisualCampaigns/1a.png",
      alt: "Visual Campaign 1a",
      caption: "Key visual for Huawei Cloud server campaign (2021)",
    },
    {
      src: "/assets/VisualCampaigns/1b.png",
      alt: "Visual Campaign 1b",
      caption: "Key visual for Huawei Cloud server campaign (2021)",
    },
    {
      src: "/assets/VisualCampaigns/1g.jpg",
      alt: "Visual Campaign 1g",
      caption: "Vaillant floor heating Campaign (2018)",
    },
    { src: "/assets/VisualCampaigns/1e.jpg", alt: "Visual Campaign 1e", caption: "Coke Olympic Campaign (2024)" },
    {
      src: "/assets/VisualCampaigns/1d.jpg",
      alt: "Visual Campaign 1d",
      caption: "Coca-Cola “Coke Break” campaign – Office edition (2023)",
    },
    {
      src: "/assets/VisualCampaigns/1c.jpg",
      alt: "Visual Campaign 1c",
      caption: "Coca-Cola “Coke Break” campaign – Campus edition (2023)",
    },
    {
      src: "/assets/VisualCampaigns/1f.jpg",
      alt: "Visual Campaign 1f",
      caption: "Product key visual for Coca-Cola “Coke Break” (2023)",
    },
    {
      src: "/assets/VisualCampaigns/1h.jpg",
      alt: "Visual Campaign 1h",
      caption: "Propecia hair loss treatment Campaign (2019)",
    },
    {
      src: "/assets/VisualCampaigns/1j.jpg",
      alt: "Visual Campaign 1j",
      caption: "Plavix antithrombotic medication campaign (2019)",
    },
    {
      src: "/assets/VisualCampaigns/1l.jpg",
      alt: "Visual Campaign 1l",
      caption: "Key visual for Coca-Cola Peach flavour product launch (2022)",
    },
    {
      src: "/assets/VisualCampaigns/1k.jpg",
      alt: "Visual Campaign 1k",
      caption: "Key visual for Coca-Cola Peach flavour product launch (2022)",
    },
    {
      src: "/assets/VisualCampaigns/1u.jpg",
      alt: "Visual Campaign 1u",
      caption: "Product Visual for Lifease(2026)",
    },
    {
      src: "/assets/VisualCampaigns/1n.jpg",
      alt: "Visual Campaign 1n",
      caption: "Poster design for director He Xinhao’s offline talk (2018)",
    },
    {
      src: "/assets/VisualCampaigns/1o.jpg",
      alt: "Visual Campaign 1o",
      caption: "Sprite No Sugar No competitor Campaign (2022)",
    },
    { src: "/assets/VisualCampaigns/1p.jpg", alt: "Visual Campaign 1p", caption: "Coca-Cola Recipe campaign (2023)" },
    { src: "/assets/VisualCampaigns/1q.jpg", alt: "Visual Campaign 1q", caption: "Coca-Cola Recipe campaign (2023)" },
    {
      src: "/assets/VisualCampaigns/1r.jpg",
      alt: "Visual Campaign 1r",
      caption: "Product key visual for Buick Envision (2021)",
    },
    {
      src: "/assets/VisualCampaigns/1s.jpg",
      alt: "Visual Campaign 1s",
      caption: "Product key visual for Buick Envision (2021)",
    },
    {
      src: "/assets/VisualCampaigns/1t.jpg",
      alt: "Visual Campaign 1t",
      caption: "Product key visual for Buick Envision (2021)",
    },
    {
      src: "/assets/VisualCampaigns/2a.jpg",
      alt: "Visual Campaign 2a",
      caption: "Key visual for MET Academy campaign (2018)",
    },
    {
      src: "/assets/VisualCampaigns/2b.jpg",
      alt: "Visual Campaign 2b",
      caption: "Key visual for MET Academy campaign (2018)",
    },
    { src: "/assets/VisualCampaigns/3a.jpg", alt: "Visual Campaign 3a", caption: "Brand assets for Vedett (2022)" },
    { src: "/assets/VisualCampaigns/3b.jpg", alt: "Visual Campaign 3b", caption: "Brand assets for Vedett (2022)" },
    { src: "/assets/VisualCampaigns/3c.jpg", alt: "Visual Campaign 3c", caption: "Brand assets for Vedett (2022)" },
    { src: "/assets/VisualCampaigns/3d.jpg", alt: "Visual Campaign 3d", caption: "Brand assets for Vedett (2022)" },
    {
      src: "/assets/VisualCampaigns/3f.jpg",
      alt: "Visual Campaign 3f",
      caption: "Key visual for Douyin maternity & baby promotion campaign (2021)",
    },
    {
      src: "/assets/VisualCampaigns/3g.jpg",
      alt: "Visual Campaign 3g",
      caption: "Social poster for BYD Cleaners’ Day campaign (2017)",
    },
    {
      src: "/assets/VisualCampaigns/3h.png",
      alt: "Visual Campaign 3h",
      caption: "Social poster for Roewe Christmas campaign (2017)",
    },
    { src: "/assets/VisualCampaigns/4a.jpg", alt: "Visual Campaign 4a", disableCaption: true },
    { src: "/assets/VisualCampaigns/4b.jpg", alt: "Visual Campaign 4b", disableCaption: true },
    { src: "/assets/VisualCampaigns/4c.jpg", alt: "Visual Campaign 4c", disableCaption: true },
    { src: "/assets/VisualCampaigns/4d.jpg", alt: "Visual Campaign 4d", disableCaption: true },
  ] as const;
  const bySrc = (src: (typeof images)[number]["src"]) => images.find((img) => img.src === src)!;

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Navbar variant="workDetail" />
      <main className="flex-1">
        <section className="relative border-b border-neutral-300/50 pb-16 pt-8 md:pb-20 md:pt-10 lg:pb-24 lg:pt-12">
          <div className="container-custom relative px-4 md:px-6 lg:px-8">
            <div className="mb-10">
              <div className="flex items-start justify-between gap-8">
                <h1 className="text-[18px] font-bold uppercase tracking-[0.4em] text-neutral-900 md:text-[22px]">
                  Visual Campaigns
                </h1>
                <div className="pt-[2px] text-[10px] font-bold text-neutral-900">+</div>
              </div>
              <div className="relative mt-2 border-b border-neutral-300/70" />
            </div>

            <VisualCampaignsIntro
              className="mb-12 mx-auto max-w-[72ch] text-center text-[14px] leading-[1.6] text-neutral-700 md:text-[16px]"
              paragraphs={[
                "This page presents selected key visuals and posters that I led or contributed to as the main designer/ art director.",
                "Selected clients: Coca-Cola, Sprite, Maestro, Plavix, Kinder Joy, Huawei, among others.",
              ]}
            />

            <VisualCampaignsGallery
              images={[...images]}
              featured={[
                {
                  images: [{ ...images[0] }, { ...images[1] }],
                  caption: "Key visuals for Huawei Cloud server campaign (2021)",
                  layout: "stacked",
                },
                {
                  images: [{ ...images[9] }, { ...images[10] }],
                  caption: "Key visuals for Coca-Cola Peach flavour product launch (2022)",
                  layout: "row",
                },
              ]}
              tail={[
                {
                  title: "ILLUSTRATIONS",
                  images: [{ ...bySrc("/assets/VisualCampaigns/2a.jpg") }, { ...bySrc("/assets/VisualCampaigns/2b.jpg") }],
                  caption:
                    "One of the highlights is a collaboration with MET Academy, a medical forum focused on lung cancer research. On the right is the original illustration draft — inspired by traditional Chinese painting techniques, it visualizes the journey of medical discovery as a path of “dispersing clouds to reveal clarity,” with the two mountains symbolizing human lungs. However, the dark-colored lungs were later considered too negative by the client, so the final version (on the left) was revised accordingly.",
                  layout: "row",
                },
                {
                  images: [
                    { ...bySrc("/assets/VisualCampaigns/3a.jpg") },
                    { ...bySrc("/assets/VisualCampaigns/3b.jpg") },
                    { ...bySrc("/assets/VisualCampaigns/3c.jpg") },
                    { ...bySrc("/assets/VisualCampaigns/3d.jpg") },
                    { ...bySrc("/assets/VisualCampaigns/3f.jpg") },
                    { ...bySrc("/assets/VisualCampaigns/3g.jpg") },
                    { ...bySrc("/assets/VisualCampaigns/3h.png") },
                  ],
                  layout: "masonry",
                },
                {
                  title: "3D WORKS",
                  images: [
                    { ...bySrc("/assets/VisualCampaigns/4c.jpg") },
                    { ...bySrc("/assets/VisualCampaigns/4d.jpg") },
                  ],
                  layout: "stacked",
                },
                {
                  images: [{ ...bySrc("/assets/VisualCampaigns/4a.jpg") }, { ...bySrc("/assets/VisualCampaigns/4b.jpg") }],
                  caption:
                    "Here are a few 3D artworks I created using Cinema 4D, as part of my personal exploration of form, lighting, and texture.",
                  layout: "row",
                },
              ]}
            />

            <div className="flex justify-center">
              <CokeBreakScrollToTopButton className="mt-24 md:mt-32" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
