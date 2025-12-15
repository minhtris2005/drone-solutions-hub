import { ArrowRight, Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import photo1 from "@/assets/home/news/photo-1.avif"
import photo2 from "@/assets/home/news/photo-2.avif"
import photo3 from "@/assets/home/news/photo-3.avif"
const news = [
  {
    id: 1,
    title: "Xu hướng ứng dụng Drone trong nông nghiệp thông minh 2024",
    excerpt: "Khám phá cách drone đang cách mạng hóa ngành nông nghiệp với công nghệ phun thuốc tự động và giám sát cây trồng.",
    image: photo1,
    date: "15/12/2024",
    author: "Admin",
    category: "Công nghệ",
    readTime: "5 phút đọc",
  },
  {
    id: 2,
    title: "Hitek Flycam ra mắt dịch vụ Drone Show chuyên nghiệp",
    excerpt: "Trình diễn light show bằng drone với quy mô 500 drone, mang đến trải nghiệm visual ấn tượng cho sự kiện.",
    image: photo2,
    date: "10/12/2024",
    author: "Tech Team",
    category: "Sự kiện",
    readTime: "4 phút đọc",
  },
  {
    id: 3,
    title: "Hướng dẫn xin giấy phép bay drone tại Việt Nam 2024",
    excerpt: "Cập nhật quy trình và thủ tục xin giấy phép bay drone mới nhất theo quy định của Bộ Quốc phòng.",
    image: photo3,
    date: "05/12/2024",
    author: "Legal Team",
    category: "Pháp lý",
    readTime: "7 phút đọc",
  }
];

export default function NewsSection() {
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

  const headerVariants = {
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

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      x: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
        delay: 0.5
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-20 bg-secondary dark:from-gray-900 dark:to-red-900/10"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6"
        >
          <div className="flex-1">
            
            <motion.h2 
              variants={headerVariants}
              className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4"
            >
              Tin tức &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 dark:from-red-400 dark:to-red-300">
                Cập nhật
              </span>
            </motion.h2>
            
            <motion.p 
              variants={headerVariants}
              className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl"
            >
              Khám phá những xu hướng công nghệ drone mới nhất và cập nhật từ Hitek Flycam
            </motion.p>
          </div>
          
          <motion.div
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-2 border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group/btn"
            >
              Xem tất cả tin tức
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  repeatDelay: 1 
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>

        {/* News Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {news.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)"
              }}
              className="group relative"
            >
              {/* News Card */}
              <div className="bg-card dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border border-border dark:border-gray-700 group-hover:border-red-300 dark:group-hover:border-red-400/30">
                {/* Image Container */}
                <motion.div 
                  className="relative overflow-hidden h-56"
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {item.category}
                    </span>
                  </motion.div>
                  
                  {/* Read More Overlay */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Button className="bg-white text-red-600 hover:bg-white/90 font-semibold px-6 py-3 rounded-full shadow-lg">
                      Đọc bài viết
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground dark:text-gray-400 mb-4">
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span>{item.date}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <User className="w-4 h-4 text-red-500" />
                      <span>{item.author}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>{item.readTime}</span>
                    </motion.div>

                  </div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-xl font-bold text-foreground dark:text-white mb-3 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {item.title}
                  </motion.h3>
                  
                  {/* Excerpt */}
                  <motion.p 
                    className="text-muted-foreground dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {item.excerpt}
                  </motion.p>
                  
                  {/* Read More Button */}
                  <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 hover:bg-transparent group/btn"
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        Đọc tiếp
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5,
                            repeatDelay: 0.5 
                          }}
                        >
                          →
                        </motion.span>
                      </span>
                    </Button>
                  </motion.div>
                </div>

              </div>
              {/* Background Glow */}
              <motion.div 
                className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
              />
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
