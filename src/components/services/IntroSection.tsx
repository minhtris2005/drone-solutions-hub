// components/services/IntroSection.tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IntroSection() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      y: 10 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.7
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      x: 30,
      y: 10 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.7,
        delay: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { 
      scaleY: 0,
      opacity: 0 
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        duration: 0.8
      }
    }
  };

  const linkVariants = {
    hidden: { 
      opacity: 0,
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.6,
        delay: 0.3
      }
    },
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const highlightVariants = {
    hidden: { 
      opacity: 0.8,
      textShadow: "0 0 0px rgba(var(--primary), 0)" 
    },
    visible: {
      opacity: 1,
      textShadow: [
        "0 0 0px rgba(var(--primary), 0)",
        "0 0 15px rgba(var(--primary), 0.3)", 
        "0 0 5px rgba(var(--primary), 0.1)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      className="py-16 bg-background dark:bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div 
            className="flex"
            variants={textVariants}
          >
            {/* Animated vertical line */}
            <motion.div 
              className="w-1 h-30 bg-primary dark:bg-primary mr-6 rounded-full"
              variants={lineVariants}
            />
            
            <div>
              <motion.h2 
                className="text-4xl font-bold text-foreground dark:text-foreground mb-4"
                variants={textVariants}
              >
                {t("servicesPage.servicesIntro.left.title")}
              </motion.h2>
              
              <motion.p 
                className="text-lg text-foreground dark:text-foreground mb-4"
                variants={textVariants}
                transition={{ delay: 0.1 }}
              >
                {t("servicesPage.servicesIntro.left.line1")}<br />
                {t("servicesPage.servicesIntro.left.line2")}
              </motion.p>
              
              <Link to="/gioi-thieu">
                <motion.div 
                  className="flex items-center text-primary dark:text-primary font-semibold cursor-pointer"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {t("servicesPage.servicesIntro.left.learnMore")}
                  Tìm hiểu thêm
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.span>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="space-y-4 text-foreground dark:text-foreground"
            variants={paragraphVariants}
          >
            <motion.p 
              variants={paragraphVariants}
              className="leading-relaxed"
            >
              <motion.span 
                className="font-bold text-primary dark:text-primary"
                variants={highlightVariants}
                animate="visible"
              >
                {t("servicesPage.servicesIntro.right.part1.brand")}{" "}
              </motion.span>
              {t("servicesPage.servicesIntro.right.part1.text1")}{" "}
              <motion.span 
                className="font-bold text-primary dark:text-primary"
                variants={highlightVariants}
                animate="visible"
                style={{ animationDelay: "0.2s" }}
              >
                {t("servicesPage.servicesIntro.right.part1.group")}{" "}
              </motion.span>
              {t("servicesPage.servicesIntro.right.part1.text2")}{" "}
              <motion.span 
                className="font-bold text-primary dark:text-primary"
                variants={highlightVariants}
                animate="visible"
                style={{ animationDelay: "0.4s" }}
              >
                {t("servicesPage.servicesIntro.right.part1.highlight")}{" "}
              </motion.span>
              {t("servicesPage.servicesIntro.right.part1.text3")}
            </motion.p>
            
            <motion.p 
              variants={paragraphVariants}
              transition={{ delay: 0.3 }}
              className="leading-relaxed"
            >
              {t("servicesPage.servicesIntro.right.part2")}
            </motion.p>

            {/* Decorative floating elements */}
            <div className="relative">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/20 dark:bg-primary/30 rounded-full"
                  style={{
                    left: `${i * 60}%`,
                    top: "50%",
                  }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>


      </div>
    </motion.section>
  );
}
