// components/home/Hero.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Camera, Shield, Zap, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Bg_flycam from "@/assets/home/bg.png"
import Lg_flycam from "@/assets/logo/logo-flycam-hitek.png"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
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
          src={Bg_flycam}
          alt="Drone Background"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-primary/5 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </div>

      {/* Floating Drone Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-30 left-10 hidden lg:block"
      >
        <div className="w-8 h-8 bg-primary/20 rounded-full blur-sm" />
        <img
          src={Lg_flycam}
          alt="Flycam Logo"
          className="w-10 h-10 absolute inset-0 m-auto"
        />
      </motion.div>
      
      <motion.div
        animate={{
          ...floatingAnimation,
          y: [5, -5, 5],
          transition: { ...floatingAnimation.transition, delay: 1 }
        }}
        className="absolute top-1/3 right-20 hidden lg:block"
      >
        <div className="w-10 h-10 bg-primary/15 rounded-full blur-sm" />
        <img
          src={Lg_flycam}
          alt="Flycam Logo"
          className="w-10 h-10 absolute inset-0 m-auto"
        />
      </motion.div>

      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1.5 }
        }}
        className="absolute bottom-32 left-1/4 hidden lg:block"
      >
        <Shield className="w-7 h-7 text-primary/30" />
      </motion.div>

      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 0.5 }
        }}
        className="absolute bottom-20 right-1/4 hidden lg:block"
      >
        <Zap className="w-6 h-6 text-primary/25" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
              <img
                src={Lg_flycam}
                alt="Hitek Flycam Logo"
                className="relative w-48 h-48 md:w-64 md:h-64 object-contain mx-auto"
              />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              <span className="block">HITEK FLYCAM</span>
              <span className="block text-3xl md:text-5xl lg:text-6xl text-primary mt-2">
                The Drone Experts
              </span>
            </h1>
          </motion.div>


          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Cung cấp giải pháp toàn diện về Drone: từ sửa chữa, bảo dưỡng đến dịch vụ 
              quay phim chuyên nghiệp và khảo sát trắc địa với độ chính xác cao.
            </p>
          </motion.div>



          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-xl">
              <Link to="/dich-vu">
                <Camera className="mr-2 w-5 h-5" />
                Khám phá dịch vụ
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
              <Link to="/lien-he">
                <Shield className="mr-2 w-5 h-5" />
                Tư vấn miễn phí
              </Link>
            </Button>
          </motion.div>


        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
