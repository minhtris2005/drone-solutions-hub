import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Zap, 
  Shield, 
  Award, 
  Gauge, 
  Clock, 
  Users, 
  Truck,
  BarChart3,
  TrendingUp,
  BatteryFull,
  Camera
} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

const features: Feature[] = [
  {
    icon: CheckCircle,
    title: "Chất lượng đảm bảo",
    description: "Sử dụng linh kiện chính hãng, bảo hành 12 tháng",
    gradient: "from-green-500/20 to-emerald-500/20",
    delay: 0.1
  },
  {
    icon: Gauge,
    title: "Hiệu suất cao",
    description: "Drone được tối ưu hóa cho tốc độ và ổn định",
    gradient: "from-blue-500/20 to-cyan-500/20",
    delay: 0.2
  },
  {
    icon: Shield,
    title: "An toàn tuyệt đối",
    description: "Tuân thủ nghiêm ngặt quy định an toàn bay",
    gradient: "from-red-500/20 to-orange-500/20",
    delay: 0.3
  },
  {
    icon: Clock,
    title: "Nhanh chóng",
    description: "Sửa chữa trong 24h, giao hàng siêu tốc",
    gradient: "from-purple-500/20 to-pink-500/20",
    delay: 0.4
  },
  {
    icon: Users,
    title: "Đội ngũ chuyên gia",
    description: "Kỹ thuật viên được đào tạo bài bản",
    gradient: "from-indigo-500/20 to-violet-500/20",
    delay: 0.5
  },
  {
    icon: Truck,
    title: "Vận chuyển toàn quốc",
    description: "Miễn phí vận chuyển nội thành Hà Nội, TP.HCM",
    gradient: "from-amber-500/20 to-yellow-500/20",
    delay: 0.6
  },
  {
    icon: BarChart3,
    title: "Kinh nghiệm 10+ năm",
    description: "Đã thực hiện 5000+ dự án thành công",
    gradient: "from-teal-500/20 to-emerald-500/20",
    delay: 0.7
  },
  {
    icon: Camera,
    title: "Quay phim 8K",
    description: "Camera chất lượng cao, ổn định hình ảnh",
    gradient: "from-rose-500/20 to-red-500/20",
    delay: 0.8
  }
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.8,
        delay: 0.2
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with animated gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/50 to-accent/5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "400% 400%",
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full"
            style={{
              left: `${10 + i * 10}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div 
            variants={titleVariants}
          >
          </motion.div>
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Tại sao chọn{" "}
            <motion.span 
              className="text-primary"
            >
              Hitek Flycam?
            </motion.span>
          </motion.h2>
          
          <motion.p 
            variants={subtitleVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Chúng tôi không chỉ cung cấp dịch vụ - Chúng tôi mang đến{" "}
            <span className="text-primary font-semibold">trải nghiệm khác biệt</span>
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  delay,
  index 
}: Feature & { index: number }) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6,
        delay: delay
      }
    },
  };

  const iconVariants = {
    hidden: { 
      rotate: -180,
      scale: 0 
    },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: delay + 0.1
      }
    },
    hover: {
      rotate: [0, 10, -10, 0],
      scale: 1.2,
      transition: {
        duration: 0.5
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        delay: delay + 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      className="relative group"
    >
      {/* Background gradient effect */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.3
        }}
      />
      
      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors duration-300 h-full">
        {/* Icon with animation */}
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className={`w-16 h-16 bg-gradient-to-br ${gradient.replace("/20", "/10")} rounded-2xl flex items-center justify-center mb-6 relative`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
          <Icon className="w-8 h-8 text-primary relative z-10" />
          
          {/* Floating dots around icon */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full"
              style={{
                left: `${Math.cos((i * 90) * Math.PI / 180) * 24 + 16}px`,
                top: `${Math.sin((i * 90) * Math.PI / 180) * 24 + 16}px`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
        >
          {title}
        </motion.h3>

        {/* Animated divider line */}
        <motion.div 
          variants={lineVariants}
          className="h-0.5 bg-gradient-to-r from-primary/50 to-transparent mb-4"
        />

        {/* Description */}
        <motion.p 
          className="text-muted-foreground"
          transition={{ type: "spring", stiffness: 300 }}
        >
          {description}
        </motion.p>

        {/* Number badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3, type: "spring" }}
          className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"
        >
          <span className="text-xs font-bold text-primary">0{index + 1}</span>
        </motion.div>

      </div>
    </motion.div>
  );
}
