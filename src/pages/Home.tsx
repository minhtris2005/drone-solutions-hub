import Navbar from "@/components/Navbar";
import TopLolution from "@/components/home/TopLolution";
import Features from "@/components/home/Features";
import ServicesPreview from "@/components/home/ServicesPreview";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TopLolution />
      <Features />
      <ServicesPreview />
      <CTA />
    </div>
  );
}
