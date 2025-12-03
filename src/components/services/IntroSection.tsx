// components/services/IntroSection.tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function IntroSection() {
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
                Hitek Flycam
              </motion.h2>
              
              <motion.p 
                className="text-lg text-foreground dark:text-foreground mb-4"
                variants={textVariants}
                transition={{ delay: 0.1 }}
              >
                Cung cấp dịch vụ chuyên nghiệp <br />
                & Giải pháp toàn diện về Drone
              </motion.p>
              
              <Link to="/gioi-thieu">
                <motion.div 
                  className="flex items-center text-primary dark:text-primary font-semibold cursor-pointer"
                  variants={linkVariants}
                  whileHover="hover"
                >
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
                Hitek Flycam{" "}
              </motion.span>
              là thương hiệu trực thuộc{" "}
              <motion.span 
                className="font-bold text-primary dark:text-primary"
                variants={highlightVariants}
                animate="visible"
                style={{ animationDelay: "0.2s" }}
              >
                Hitek Group JSC{" "}
              </motion.span>
              – tập đoàn công nghệ uy tín tiên phong trong lĩnh vực 
              Drone Show tại Việt Nam. Chúng tôi cung cấp{" "}
              <motion.span 
                className="font-bold text-primary dark:text-primary"
                variants={highlightVariants}
                animate="visible"
                style={{ animationDelay: "0.4s" }}
              >
                giải pháp Drone toàn diện cho mọi nhu cầu{" "}
              </motion.span>
              – từ quay phim, khảo sát địa hình, 
              vận chuyển, sửa chữa, đến xin giấy phép bay và nhập khẩu Drone 
              chuyên dụng.
            </motion.p>
            
            <motion.p 
              variants={paragraphVariants}
              transition={{ delay: 0.3 }}
              className="leading-relaxed"
            >
              Với nền tảng công nghệ vững chắc từ hệ sinh thái 
              Hitek Group, Hitek Flycam cam kết mang đến độ chính xác, an toàn 
              và hiệu quả vượt trội cho từng dự án.
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
