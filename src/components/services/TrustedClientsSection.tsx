import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
  },
  {
    id: 5,
    name: "Tập đoàn Sun Group",
    logo: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=200&q=80",
    project: "Quay phim quảng bá du lịch",
    feedback: "Hình ảnh chất lượng cao, góc quay sáng tạo giúp dự án của chúng tôi nổi bật."
  },
  {
    id: 6,
    name: "Công ty Xây dựng COTEC",
    logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=200&q=80",
    project: "Khảo sát công trình xây dựng",
    feedback: "Độ chính xác cao, tiến độ nhanh chóng, hỗ trợ kỹ thuật nhiệt tình."
  }
];

export default function TrustedClientsSection() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);
  const [totalWidth, setTotalWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  // Tạo mảng gấp 3 lần để tạo hiệu ứng vô hạn mượt mà
  const infiniteClients = [...clients, ...clients, ...clients, ...clients];

  // Tính toán chiều rộng
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calculatedItemWidth = Math.min(320, containerWidth / 3.5);
        setItemWidth(calculatedItemWidth);
        setTotalWidth(calculatedItemWidth * infiniteClients.length);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Animation loop vô hạn cải tiến
  useEffect(() => {
    if (isHovered || itemWidth === 0) return;

    let animationFrameId: number;
    let lastTimestamp: number;
    const speed = 150; // pixels per second
    const singleLoopWidth = itemWidth * clients.length; // Chiều rộng của 1 vòng lặp

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      setScrollPosition(prev => {
        let newPosition = prev + speed * deltaTime;
        
        // Khi đã cuộn hết 1 vòng lặp (tất cả clients gốc), reset về đầu
        // Nhưng chúng ta reset khi chạm đến điểm bắt đầu của phần lặp thứ 3
        // để tạo hiệu ứng mượt mà không bị giật
        if (newPosition >= singleLoopWidth * 2) {
          newPosition = singleLoopWidth;
        }
        
        return newPosition;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, itemWidth]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
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
        duration: 0.5
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
      className="py-16 bg-gradient-to-b from-background to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-3"
          >
            Đối tác{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600 dark:from-red-400 dark:to-red-300">
              tin tưởng
            </span>
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-muted-foreground dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto"
          >
            Cùng với các tập đoàn và doanh nghiệp hàng đầu Việt Nam
          </motion.p>
        </motion.div>

        {/* Infinite Loop Carousel */}
        <div 
          className="relative h-[280px] md:h-[320px] "
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={containerRef}
            className="absolute top-0 left-0 right-0 h-full overflow-visible"
          >
            <motion.div
              className="flex absolute top-1/2 -translate-y-1/2"
              style={{
                x: -scrollPosition,
                width: `${totalWidth}px`
              }}
              animate={isInView ? {} : {}}
              transition={{ duration: 0 }}
            >
              {infiniteClients.map((client, index) => (
                <motion.div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${itemWidth}px` }}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.div
                    className="group relative h-full"
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Client Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 h-full border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden shadow-lg ">
                      {/* Logo Container */}
                      <div className="relative mb-4 md:mb-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg transition-colors duration-300">
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="w-full h-full object-cover transition-transform duration-500"
                          />
                        </div>
                        {/* Logo Glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent blur-xl -z-10" />
                      </div>
                      
                      {/* Client Info */}
                      <h3 className="text-base md:text-lg font-bold text-center text-gray-800 dark:text-white mb-2 transition-colors duration-300 line-clamp-1">
                        {client.name}
                      </h3>
                      
                      {/* Project Info (tùy chọn, bạn có thể bỏ comment nếu muốn hiển thị) */}
                      {/* <p className="text-center text-xs md:text-sm text-primary dark:text-red-400 mb-2 px-2 md:px-3 py-1 bg-primary/5 dark:bg-red-400/5 rounded-full inline-block mx-auto block w-fit line-clamp-1">
                        {client.project}
                      </p> */}
                      
                      {/* Hover Indicator */}

                    </div>
                    
                    {/* Card Glow */}
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 blur-xl transition-opacity duration-500" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center pt-16"
        >
          <div className="inline-block bg-gradient-to-r from-primary/10 to-red-600/10 dark:from-red-400/10 dark:to-red-600/10 rounded-2xl p-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Trở thành đối tác tiếp theo
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-lg mx-auto text-sm">
                Liên hệ ngay để được tư vấn giải pháp drone phù hợp với doanh nghiệp của bạn
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
              >
                Liên hệ hợp tác
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
