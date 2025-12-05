// components/about/WhyTrustSection.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Shield, Award, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


const WhyTrustSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 80,
        duration: 1
      }
    }
  };

  const trustPoints = [
    {
      number: "01",
      title: t(`about.whyTrust.points.${0}.title`),
      description: t(`about.whyTrust.points.${0}.description`),
      icon: Award,
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=400&q=80"
    },
    {
      number: "02",
      title: t(`about.whyTrust.points.${1}.title`),
      description: t(`about.whyTrust.points.${1}.description`),
      icon: Shield,
      image: "https://images.unsplash.com/photo-1532989029401-439615f3d4b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      number: "03",
      title: t(`about.whyTrust.points.${2}.title`),
      description: t(`about.whyTrust.points.${2}.description`),
      icon: Zap,
      image: "https://images.unsplash.com/photo-1495764506633-93d4dfed7c6b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-b from-background to-red-50/20 dark:from-gray-900 dark:to-red-900/10"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-6">
              {t("about.whyTrust.title1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 dark:from-red-400 dark:to-red-300">
                {t("about.whyTrust.highlightedTitle")}
              </span>{" "}
              {t("about.whyTrust.title2")}
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
              {t("about.whyTrust.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Images Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 md:gap-6 relative"
            >
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.number}
                  variants={imageVariants}
                  custom={index}
                  className={`relative group ${
                    index === 0 ? "col-span-2 h-64 md:h-72" :
                    index === 1 ? "h-80 md:h-96" :
                    "h-64 md:h-72 row-start-2 col-start-2"
                  }`}
                >
                  {/* Image */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={point.image}
                      alt={point.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    

                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.div
                        className="text-white"
                        initial={{ opacity: 0.8, y: 10 }}
                      >
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{point.title}</h3>
                        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                          {point.description}
                        </p>
                      </motion.div>
                    </div>
                    

                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
              
              {/* Decorative Element */}
              <motion.div 
                className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              variants={containerVariants}
              className="space-y-8 md:space-y-10"
            >
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.number}
                  variants={itemVariants}
                  className="bg-card dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border dark:border-gray-700"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Number */}
                    <motion.div 
                      className="flex-shrink-0"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{point.number}</span>
                      </div>
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                        >
                        </motion.div>
                        <h3 className="text-2xl font-bold text-foreground dark:text-white">{point.title}</h3>
                      </div>
                      <motion.p 
                        className="text-muted-foreground dark:text-gray-300 leading-relaxed"
                        initial={{ opacity: 0.8 }}
                      >
                        {point.description}
                      </motion.p>

                    </div>
                  </div>
                  {/* Accent Line */}
                  <motion.div 
                    className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500 mt-4"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustSection;
