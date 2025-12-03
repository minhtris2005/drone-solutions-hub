// pages/AboutPage.tsx
import HeroSection from "@/components/about/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import WhyTrustSection from "@/components/about/WhyTrustSection";
import ConnectionSection from "@/components/about/ConnectionSection";
import QuoteSection from "@/components/about/QuoteSection";
import TeamSection from "@/components/about/TeamSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <WhyTrustSection />
      <ConnectionSection />
      <QuoteSection />
      <TeamSection />
    </div>
  );
};

export default AboutPage;
