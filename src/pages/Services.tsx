import IconServicesSection from "@/components/services/IconServicesSection";
import IntroSection from "@/components/services/IntroSection";
import InteractiveCardsSection from "@/components/services/InteractiveCardsSection";
import DetailedServicesSection from "@/components/services/DetailedServicesSection";
import FeaturedProjectsSection from "@/components/services/FeaturedProjectsSection";
import TrustedClientsSection from "@/components/services/TrustedClientsSection";
import NewsSection from "@/components/services/NewsSection";
import HeroSection from "@/components/services/HeroSection"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <IconServicesSection />
      <IntroSection />
      <InteractiveCardsSection />
      <DetailedServicesSection />
      <FeaturedProjectsSection />
      <TrustedClientsSection />
      <NewsSection />
    </div>
  );
}
