// components/about/AboutSection.tsx
import { motion } from "framer-motion";
import hero2 from "@/assets/about_us/team.png";

const AboutSection = () => {
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

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      y: 20 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      y: 20,
      scale: 0.95,
      rotate: -5 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 1
      }
    },
    hover: {
      scale: 1.03,
      rotate: 1,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 150,
        duration: 0.6
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.7
      }
    }
  };

  const highlightVariants = {
    hidden: { 
      opacity: 0.5,
      textShadow: "0 0 0px rgba(220, 38, 38, 0)" 
    },
    visible: {
      opacity: 1,
      textShadow: [
        "0 0 0px rgba(220, 38, 38, 0)",
        "0 0 15px rgba(220, 38, 38, 0.3)", 
        "0 0 5px rgba(220, 38, 38, 0.1)"
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
      className="py-20 bg-secondary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-vibrant-red/10 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-6"
            variants={textVariants}
          >
            <motion.h2 
              variants={titleVariants}
              className="text-4xl font-bold text-foreground mb-6"
            >
              Về{" "}
              <motion.span 
                className="text-vibrant-red relative"
                variants={highlightVariants}
                animate="visible"
              >
                Hitek Flycam
                {/* Underline animation */}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-1 bg-vibrant-red rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.span>
            </motion.h2>
            
            <div className="space-y-4 text-pure-black">
              <motion.p 
                variants={paragraphVariants}
                className="leading-relaxed text-foreground"
              >
                <motion.span 
                  className=" font-bold text-foreground"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                >
                  Hitek Flycam{" "}
                </motion.span>
                là thương hiệu chuyên về giải pháp Drone ứng dụng đa ngành, 
                được phát triển từ nền tảng công nghệ, nhân lực và kinh nghiệm của Hitek 
                Drone – đơn vị tiên phong trong lĩnh vực Drone Light Show và công nghệ 
                trình diễn trên không tại Việt Nam.
              </motion.p>
              
              <motion.p 
                variants={paragraphVariants}
                transition={{ delay: 0.1 }}
                className="leading-relaxed text-foreground"
              >
                Thuộc Hitek Group JSC, Hitek Flycam mở rộng sứ mệnh của Hitek Drone sang 
                các lĩnh vực kỹ thuật, khảo sát, logistics và dịch vụ công nghiệp, với mục 
                tiêu đưa công nghệ bay vào phục vụ các lĩnh vực khác như đời sống, sản
                 xuất và quản lý thông minh.
              </motion.p>
            </div>

          </motion.div>

          {/* Image Content */}
          <motion.div 
            className="relative"
            variants={imageVariants}
            whileHover="hover"
          >
            {/* Floating background elements */}
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-br from-vibrant-red/20 to-transparent rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main Image */}
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={hero2}
                alt="Drone technology"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Floating drone icon */}
            <motion.div
              className="absolute -top-4 -right-4 w-12 h-12 bg-background rounded-full shadow-lg flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg className="w-6 h-6 text-vibrant-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.div>

            {/* Decorative corner elements */}

          </motion.div>
        </div>
      </div>

    </motion.section>
  );
};

export default AboutSection;
