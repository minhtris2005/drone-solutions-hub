import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TopSolution() {
  // Container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  // Item variants for individual elements
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  // Image hover animation
  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.1,
      rotate: -2 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  // Button hover animation
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  // Floating animation for background gradient
  const floatingAnimation = {
    y: [0, -10, 0],
    x: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background with floating gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"
        animate={floatingAnimation}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Column */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              Giải pháp Drone
              <motion.span 
                className="text-primary"
              >
                {" "}chuyên nghiệp{" "}
              </motion.span>
              cho mọi nhu cầu
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground"
            >
              Từ sửa chữa, trắc địa đến dịch vụ quay phim - chúng tôi cung cấp giải pháp toàn diện với
              công nghệ bay không người lái hiện đại nhất.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                variants={buttonVariants}
                whileTap="tap"
              >
                <Button asChild size="lg" className="text-lg">
                  <Link to="/dich-vu" className="flex items-center">
                    Khám phá dịch vụ 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                whileTap="tap"
              >
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/lien-he">Liên hệ tư vấn</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Animated Gradient Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-3xl opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
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
              variants={imageVariants}
              whileHover="hover"
              className="relative"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80"
                alt="Professional Drone"
                className="relative rounded-3xl shadow-2xl w-full"
                initial={{ scale: 1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }}
              />
              
              {/* Floating Elements */}
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-4 h-4 bg-primary/20 rounded-full"
                  style={{
                    top: `${20 + index * 30}%`,
                    left: `${10 + index * 15}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2 + index,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-primary/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
