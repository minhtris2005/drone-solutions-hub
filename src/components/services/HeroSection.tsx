// components/services/HeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import BgServices from "@/assets/home/bg.png";
import LgFlycam from "@/assets/logo/logo-flycam-hitek.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesHero() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 1
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BgServices}
          alt="Drone Services Background"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-primary/20 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Logo và Tiêu đề */}
          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <img
                  src={LgFlycam}
                  alt="Hitek Flycam Logo"
                  className="relative w-40 h-40 md:w-56 md:h-56 object-contain"
                />
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 leading-tight">
                  {t("servicesPage.servicesHero.title.main")}{" "}
                  <motion.span 
                    className="text-primary"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(59, 130, 246, 0)",
                        "0 0 30px rgba(59, 130, 246, 0.5)", 
                        "0 0 10px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {t("servicesPage.servicesHero.title.highlight")}
                  </motion.span>
                </h1>
                <motion.p 
                  className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  {t("servicesPage.servicesHero.subtitle")}
                </motion.p>
              </div>
            </div>
          </motion.div>




          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button asChild size="lg" className="text-xl px-10 py-7 rounded-2xl">
              <Link to="/lien-he">
                <Camera className="mr-3 w-6 h-6" />
                {t("servicesPage.servicesHero.cta.contact")}
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-xl px-10 py-7 rounded-2xl border-2">
              <Link to="/bang-gia">
                <Shield className="mr-3 w-6 h-6" />
                {t("servicesPage.servicesHero.cta.pricing")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
