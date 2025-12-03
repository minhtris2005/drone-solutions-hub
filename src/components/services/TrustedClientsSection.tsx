import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const clients = [
  {
    id: 1,
    name: "Tập đoàn Vingroup",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=200&q=80",
    project: "Giám sát thi công dự án bất động sản",
    feedback: "Hitek Flycam cung cấp giải pháp drone chuyên nghiệp, giúp chúng tôi tiết kiệm 40% thời gian giám sát."
  },
  {
    id: 2,
    name: "Tổng công ty Điện lực EVN",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=200&q=80",
    project: "Kiểm tra đường dây điện cao thế",
    feedback: "Dịch vụ an toàn, chuyên nghiệp và đáp ứng mọi yêu cầu kỹ thuật khắt khe."
  },
  {
    id: 3,
    name: "Bộ Giao thông Vận tải",
    logo: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=200&q=80",
    project: "Khảo sát địa hình các dự án giao thông",
    feedback: "Đối tác tin cậy trong việc cung cấp dữ liệu địa hình chính xác cho các dự án trọng điểm."
  },
  {
    id: 4,
    name: "Công ty CP Dược phẩm Vinfa",
    logo: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=200&q=80",
    project: "Vận chuyển thuốc khẩn cấp",
    feedback: "Giải pháp vận chuyển drone giúp chúng tôi tiếp cận các khu vực khó khăn nhanh chóng."
  }
];

export default function TrustedClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
        stiffness: 100,
        damping: 15,
        duration: 0.7
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-b from-background to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >

          
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4"
          >
            Khách hàng của{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600 dark:from-red-400 dark:to-red-300">
              Hitek Flycam
            </span>
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8"
          >
            Đồng hành cùng các tập đoàn và doanh nghiệp hàng đầu Việt Nam
          </motion.p>
        </motion.div>

        {/* Clients Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              className="group relative"
            >
              {/* Client Card */}
              <div className="bg-card dark:bg-gray-800 rounded-2xl p-6 h-full border border-border dark:border-gray-700 hover:border-primary/30 dark:hover:border-red-400/30 transition-all duration-300 overflow-hidden">
                {/* Logo */}
                <motion.div 
                  className="relative mx-auto mb-6"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg group-hover:border-primary/20 dark:group-hover:border-red-400/20 transition-colors duration-300">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent blur-xl -z-10"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
                
                {/* Client Name */}
                <motion.h3 
                  className="text-xl font-bold text-center text-foreground dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-red-400 transition-colors duration-300"
                >
                  {client.name}
                </motion.h3>
                
                {/* Project */}
                <motion.p 
                  className="text-center text-sm font-medium text-primary dark:text-red-400 mb-4 px-4 py-1.5 bg-primary/5 dark:bg-red-400/5 rounded-full inline-block mx-auto block w-fit"
                >
                  {client.project}
                </motion.p>
                
                {/* Feedback */}
                <div className="relative mt-6 pt-6 border-t border-border dark:border-gray-700">
                  <motion.p 
                    className="text-muted-foreground dark:text-gray-300 text-sm leading-relaxed text-center italic"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    "{client.feedback}"
                  </motion.p>
                </div>
                
                {/* Decorative Line */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ width: "80%" }}
                />
              </div>
              
              {/* Background Glow */}
              <motion.div 
                className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </motion.div>


        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="inline-block bg-gradient-to-r from-primary/10 to-red-600/10 dark:from-red-400/10 dark:to-red-600/10 rounded-2xl p-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">
                Trở thành đối tác của chúng tôi
              </h3>
              <p className="text-muted-foreground dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Liên hệ ngay để được tư vấn giải pháp drone phù hợp với doanh nghiệp của bạn
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Liên hệ hợp tác
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
