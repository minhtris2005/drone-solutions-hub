// components/about/ConnectionSection.tsx
import { ArrowRight, Link as LinkIcon, Target, Zap, ExternalLink, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";


const ConnectionSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
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

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section 
      ref={ref}
      className="py-20 bg-secondary dark:from-gray-900 dark:to-red-900/5"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Content */}
          <motion.div variants={itemVariants}>
            {/* Header */}
            <div className="mb-8">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-6"
              >
                {t("about.connection.title")}{" "}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 dark:from-red-400 dark:to-red-300"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(239, 68, 68, 0)",
                      "0 0 20px rgba(239, 68, 68, 0.3)", 
                      "0 0 0px rgba(239, 68, 68, 0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {t("about.connection.highlightedTitle")}
                </motion.span>{" "}
                &{" "}
                <motion.span 
                  className="text-foreground dark:text-white"
                >
                  {t("about.connection.hitekDroneText")}
                </motion.span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6 mb-8"
            >
              <motion.p 
                className="text-lg text-muted-foreground dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0.8 }}
              >
                {t("about.connection.description.0" as any)} <span className="font-semibold text-foreground dark:text-white">{t("about.connection.description.1" as any)}</span> {t("about.connection.description.2" as any)} <span className="font-semibold text-primary">{t("about.connection.description.3" as any)}</span> {t("about.connection.description.4" as any)}
              </motion.p>
            </motion.div>

            {/* Highlight Box */}
            <motion.div
              variants={itemVariants}
              className="relative mb-8"
            >
              <div className="flex items-start">
                <motion.div 
                  className="w-2 h-24 bg-gradient-to-b from-red-600 to-red-400 rounded-full mr-6"
                  animate={{ height: ["32px", "64px", "32px"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div>
                  <motion.p 
                    className="text-xl font-bold text-foreground dark:text-white leading-relaxed"
                  >
                    {t("about.connection.vision")}
                  </motion.p>
                </div>
              </div>
              
              {/* Decorative Dots */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-8 h-8 bg-red-500/10 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/dich-vu">
                  <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {t("about.connection.cta.services.text")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="https://hitekdrone.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    variant="outline" 
                    className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Website: Hitek Drone
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Additional Info */}
            <motion.p 
              variants={itemVariants}
              className="text-sm text-muted-foreground dark:text-gray-400 mt-6"
            >
              {t("about.connection.additionalInfo")}
            </motion.p>
          </motion.div>

          {/* Right Column - Video */}
          <motion.div 
            variants={imageVariants}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Video Container */}
            <div className="relative">
              {/* Background Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-3xl blur-2xl -z-10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Video Container */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-red-200 dark:border-red-800/50"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-w-[700px] h-auto object-cover"
                  poster="https://hitekdrone.com/wp-content/uploads/2024/07/video-web-hitek-480p.mp4?thumbnail=1"
                >
                  <source 
                    src="https://hitekdrone.com/wp-content/uploads/2024/07/video-web-hitek-480p.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Video Controls Overlay */}
                <motion.div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isHovering ? 'opacity-100' : 'opacity-0'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovering ? 1 : 0 }}
                >
                </motion.div>
                


                

              </motion.div>
              
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-xl -z-10"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              />
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-red-400/20 to-transparent rounded-full blur-xl -z-10"
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity }
                }}
              />


            </div>
            
            {/* Connection Line */}
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 w-12 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent hidden lg:block"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectionSection;
