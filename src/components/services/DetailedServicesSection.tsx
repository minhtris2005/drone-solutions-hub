import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import tech from '@/assets/services/icon2/tech.png';
import group from '@/assets/services/icon2/group.png';
import app from '@/assets/services/icon2/app.png';
import security from '@/assets/services/icon2/security.png';
import engineer from '@/assets/services/icon2/engineer.png';
import fix from '@/assets/services/icon2/fix.png';

const detailedServices = [
  {
    icon: tech,
    title: "Công nghệ tiên phong",
    description: "Tích hợp AI, RTK, Lidar, GPS thời gian thực trong mọi giải pháp bay. Đem lại dữ liệu chính xác, vận hành an toàn và hiệu suất vượt trội.",
  },
  {
    icon: engineer,
    title: "Đội ngũ chuyên gia",
    description: "Kỹ sư, phi công và kỹ thuật viên được đào tạo bài bản, đảm bảo chuyên môn cao và quy trình kỹ thuật chuẩn quốc tế.",
  },
  {
    icon: fix,
    title: "Dịch vụ trọn gói",
    description: "Từ xin phép – bay – bảo trì – nhập khẩu – bàn giao dữ liệu, Hitek Flycam đồng hành cùng khách hàng ở mọi giai đoạn của dự án.",
  },
  {
    icon: security,
    title: "An toàn pháp lý",
    description: "Tất cả chuyến bay đều được cấp phép hợp pháp và bảo hiểm đầy đủ, đảm bảo tuân thủ quy định của Bộ Quốc phòng và cơ quan quản lý.",
  },
  {
    icon: group,
    title: "Hệ sinh thái Hitek Group",
    description: "Là thành viên của tập đoàn công nghệ Hitek Group, Hitek Flycam thừa hưởng hạ tầng mạnh, năng lực AI & chất lượng quốc tế.",
  },
  {
    icon: app,
    title: "Ứng dụng đa nghành",
    description: "Từ truyền thông – xây dựng – nông nghiệp – logistics, Hitek Flycam thiết kế giải pháp Drone tùy chỉnh cho từng mục tiêu kinh doanh.",
  },
];

export default function DetailedServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

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
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.7
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-16 bg-background dark:bg-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground dark:text-white">
            Tại sao nên chọn
            <span className="text-primary dark:text-red-400 ml-2">Hitek Flycam</span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            Khám phá những lý do khiến chúng tôi trở thành đối tác tin cậy trong lĩnh vực drone
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {detailedServices.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-card dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border dark:border-gray-700 h-full">
                {/* Icon với hiệu ứng */}
                <motion.div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-blue-900/20 dark:to-blue-800/10"
                >
                  <motion.img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-16 h-16 object-contain"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </motion.div>
                
                {/* Title */}
                <motion.h3 
                  className="text-2xl font-bold mb-4 text-foreground dark:text-white"
                >
                  {service.title}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  className="text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0.8 }}
                >
                  {service.description}
                </motion.p>
                
                {/* Button */}
                <motion.div
                  whileTap={{ scale: 0.95 }}
                >
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -z-10 top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Tìm hiểu thêm
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
