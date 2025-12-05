// components/about/QuoteSection.tsx
import { Quote, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Logo_flycam from "@/assets/logo/logo-flycam-hitek.png"
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";


const QuoteSection = () => {
  const { t } = useLanguage();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  const quoteVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 80,
        duration: 1.2
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
        duration: 1
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <section 
      ref={ref}
      className="py-20 relative overflow-hidden bg-secondary"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background" />
        
        {/* Pattern Dots */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
        
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-600/5 to-transparent rounded-full blur-3xl"
          animate={pulseAnimation}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-red-400/5 to-transparent rounded-full blur-3xl"
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 1 }
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Main Quote Container */}
          <div className="relative">
            {/* Decorative Quote Marks */}
            <motion.div 
              className="absolute -top-10 -left-10 text-red-600/20 dark:text-red-400/20"
              variants={iconVariants}
            >
              <ChevronLeft className="w-32 h-32" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-10 -right-10 text-red-600/20 dark:text-red-400/20"
              variants={iconVariants}
            >
              <ChevronRight className="w-32 h-32" />
            </motion.div>

            {/* Quote Icon */}
            <motion.div
              variants={iconVariants}
              className="relative mb-10 flex justify-center"
            >
              <div className="relative">
                {/* Glow Effect */}
                <motion.div 
                  className="absolute inset-0 bg-red-600/20 dark:bg-red-400/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main Icon */}
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-500 dark:from-red-500 dark:to-red-400 flex items-center justify-center shadow-2xl">
                  <Quote className="w-10 h-10 text-white" />
                </div>
                


              </div>
            </motion.div>

            {/* Quote Text */}
            <motion.div variants={quoteVariants}>
              <blockquote className="relative">
                {/* Quote Content */}
                <div className="bg-card dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-border dark:border-gray-700">
                  <motion.p 
                    className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground dark:text-white italic leading-relaxed md:leading-relaxed text-center"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    "{t("about.quote.content.0" as any)}{" "}
                    <motion.span 
                      className="font-semibold text-red-600 dark:text-red-400"
                      whileHover={{ 
                        scale: 1.05,
                        textShadow: "0 0 20px rgba(239, 68, 68, 0.3)"
                      }}
                    >
                      {t("about.quote.content.1" as any)}
                    </motion.span> {t("about.quote.content.2" as any)}
                    {" "}
                    <motion.span 
                      className="font-semibold text-red-600 dark:text-red-400"
                      whileHover={{ 
                        scale: 1.05,
                        textShadow: "0 0 20px rgba(239, 68, 68, 0.3)"
                      }}
                    >
                      {t("about.quote.content.3" as any)}
                    </motion.span>{" "}
                    {t("about.quote.content.4" as any)}"
                  </motion.p>
                </div>
                
                {/* Accent Line */}
                <motion.div 
                  className="h-1 w-0 mx-auto mt-8 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "200px" } : { width: 0 }}
                  transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                />
              </blockquote>
            </motion.div>

            {/* Author */}
            <motion.div
              variants={quoteVariants}
              className="mt-10 text-center"
            >
              <div className="inline-flex items-center gap-4">
                {/* Decorative Line */}
                <motion.div 
                  className="w-8 h-1 bg-gradient-to-r from-red-600 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "32px" } : { width: 0 }}
                  transition={{ delay: 1.8, duration: 1 }}
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  <div className="text-lg font-semibold text-muted-foreground dark:text-gray-300">
                    {t("about.quote.author.name")}
                  </div>
                  <div className="text-sm text-muted-foreground/70 dark:text-gray-400/70 mt-2">
                    {t("about.quote.author.subtitle")}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="w-8 h-1 bg-gradient-to-l from-red-600 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "32px" } : { width: 0 }}
                  transition={{ delay: 1.8, duration: 1 }}
                />
              </div>
            </motion.div>


          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
