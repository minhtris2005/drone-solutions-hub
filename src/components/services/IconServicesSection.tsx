// components/services/IconServicesSection.tsx
import { motion } from "framer-motion";
import repair from '@/assets/services/icon1/repair.png';
import map from '@/assets/services/icon1/map.png';
import delivery from '@/assets/services/icon1/delivery.png';
import listence from '@/assets/services/icon1/listence.png';
import buy from '@/assets/services/icon1/buy.png';
import camera from '@/assets/services/icon1/camera.png';
import { useLanguage } from "@/contexts/LanguageContext";


export default function IconServicesSection() {
  const { t } = useLanguage();
  const iconServices = [
  { icon: repair, label: t(`services.${0}.title`) },
  { icon: map, label: t(`services.${1}.title`) },
  { icon: delivery, label: t(`services.${2}.title`) },
  { icon: listence, label: t(`services.${3}.title`) },
  { icon: buy, label: t(`services.${4}.title`) },
  { icon: camera, label: t(`services.${5}.title`) },
];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.95,
      filter: "blur(3px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.5
      }
    }
  };

  return (
    <motion.section 
      className="py-12 bg-secondary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {iconServices.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="group"
            >
              <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg border border-border shadow-xs hover:shadow-sm transition-shadow duration-200">
                {/* Icon container with glow effect */}
                <div className="relative mb-3">
                  {/* Glow effect background */}
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 rounded-full blur-sm"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15
                    }}
                  />
                  
                  {/* Main icon */}
                  <motion.div
                    className="relative w-12 h-12 rounded-full bg-gradient-to-br from-card to-card/50 flex items-center justify-center"
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <img 
                      src={service.icon} 
                      alt={service.label}
                      className="w-10 h-10 object-contain dark:invert dark:brightness-0 dark:contrast-100"
                    />
                    
                    {/* Floating particles - smaller and fewer */}
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        style={{
                          left: `${Math.cos((i * 180) * Math.PI / 180) * 16 + 8}px`,
                          top: `${Math.sin((i * 180) * Math.PI / 180) * 16 + 8}px`,
                        }}
                        animate={{
                          scale: [0, 0.8, 0],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2 + index * 0.08,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Label - smaller text */}
                <motion.p 
                  className="text-center font-medium text-card-foreground text-sm leading-tight"
                  initial={{ opacity: 0.6 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.04, duration: 0.3 }}
                >
                  {service.label}
                </motion.p>

                {/* Subtle indicator line - smaller */}

              </div>
            </motion.div>
          ))}
        </div>

        {/* Background decorative elements - smaller and fewer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/5 rounded-full"
              style={{
                left: `${15 + i * 25}%`,
                top: `${25 + i * 15}%`,
              }}
              animate={{
                y: [0, -12, 0],
                x: [0, 6, 0],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 3 + Math.random() * 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
