import { BrandExperienceSection } from "../components/BrandExperienceSection";
import { FeaturedWorkSection } from "../components/FeaturedWorkSection";
import { HeroSection } from "../components/HeroSection";
import { HomeLoadingOverlay } from "../components/HomeLoadingOverlay";
import { Navbar } from "../components/Navbar";
import { ResumeSection } from "../components/ResumeSection";
import { StatementSection } from "../components/StatementSection";
import { BottomCTASection } from "../components/BottomCTASection";
import { SkillsSection } from "../components/SkillsSection";
import { WorkCareerHistorySection } from "../components/WorkCareerHistorySection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col pb-24">
      <HomeLoadingOverlay />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <FeaturedWorkSection />
        <StatementSection />
        <ResumeSection />
        <WorkCareerHistorySection />
        <SkillsSection />
        <BrandExperienceSection />
        <BottomCTASection />
      </main>
    </div>
  );
}
