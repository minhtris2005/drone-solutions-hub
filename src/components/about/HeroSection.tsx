// components/about/AboutHeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Rocket, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import BgAbout from "@/assets/about_us/hero.png";
import LgFlycam from "@/assets/logo/logo-flycam-hitek.png";

export default function HeroSection() {
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

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BgAbout}
          alt="About Hitek Flycam Background"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/5 via-primary/5 to-background/5" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90" /> */}
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 hidden lg:block"
      >
        <div className="w-10 h-10 bg-primary/20 rounded-full blur-sm" />
        <Target className="w-6 h-6 text-primary absolute inset-0 m-auto" />
      </motion.div>
      
      <motion.div
        animate={{
          ...floatingAnimation,
          y: [5, -5, 5],
          transition: { ...floatingAnimation.transition, delay: 1 }
        }}
        className="absolute top-1/3 right-20 hidden lg:block"
      >
        <div className="w-12 h-12 bg-primary/15 rounded-full blur-sm" />
        <Rocket className="w-7 h-7 text-primary absolute inset-0 m-auto" />
      </motion.div>

      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1.5 }
        }}
        className="absolute bottom-40 left-1/4 hidden lg:block"
      >
        <Users className="w-8 h-8 text-primary/30" />
      </motion.div>

      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 0.5 }
        }}
        className="absolute bottom-28 right-1/4 hidden lg:block"
      >
        <Globe className="w-7 h-7 text-primary/25" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Logo và Tiêu đề chính */}
          <motion.div
            variants={itemVariants}
            className="mb-10 text-center"
          >
            <div className="flex flex-col items-center gap-8 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <img
                  src={LgFlycam}
                  alt="Hitek Flycam Logo"
                  className="relative w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pure-white mb-6 leading-tight">
                  VỀ{" "}
                  <motion.span 
                    className="text-primary"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(239, 68, 68, 0)",
                        "0 0 30px rgba(239, 68, 68, 0.5)", 
                        "0 0 10px rgba(239, 68, 68, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    HITEK FLYCAM
                  </motion.span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-red-400 mx-auto rounded-full mb-6"></div>
                <motion.p 
                  className="text-xl md:text-2xl text-pure-white font-medium max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  Giải pháp Drone ứng dụng đa ngành - Tiên phong công nghệ - Chuyên nghiệp
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button asChild size="lg" className="text-xl px-10 py-7 rounded-2xl bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary">
              <Link to="/dich-vu">
                <Rocket className="mr-3 w-6 h-6" />
                Khám phá dịch vụ
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-xl px-10 py-7 rounded-2xl border-2 border-primary text-primary hover:bg-primary/10">
              <Link to="/lien-he">
                <Users className="mr-3 w-6 h-6" />
                Liên hệ hợp tác
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
