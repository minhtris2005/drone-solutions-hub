import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import WorldMap from "@/assets/home/wrld-18.png";

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

const ClientsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  const carouselRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [totalWidth, setTotalWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  // Tạo mảng gấp 3 lần để tạo hiệu ứng vô hạn mượt mà
  const infiniteClients = [...clients, ...clients, ...clients, ...clients];

  const countries = [
    { 
      name: "Canada", 
      flag: "🇨🇦",
      position: { top: "9%", left: "20%" }
    },
    { 
      name: "United States", 
      flag: "🇺🇸",
      position: { top: "40%", left: "6%" }
    },
    { 
      name: "Germany", 
      flag: "🇩🇪",
      position: { top: "15%", left: "48%" }
    },
    { 
      name: "Japan", 
      flag: "🇯🇵",
      position: { top: "27%", left: "92%" }
    },
    { 
      name: "Korea", 
      flag: "🇰🇷",
      position: { top: "60%", left: "88%" }
    },
    { 
      name: "Australia", 
      flag: "🇦🇺",
      position: { top: "70%", left: "95%" }
    },
    { 
      name: "Viet Nam", 
      flag: "🇻🇳",
      position: { top: "82%", left: "76%" }
    }
  ];

  // Tính toán chiều rộng carousel
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
    const speed = 300; // pixels per second
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

  // Auto rotate countries
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % countries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [countries.length]);

  // Kích hoạt animation khi section vào view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

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

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-red-50 to-indigo-100 dark:from-gray-900 dark:to-red-900/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header Section với hiệu ứng xuất hiện */}
        <div 
          className={`
            text-center mb-16 transition-all duration-1000 transform
            ${isInView 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
            }
          `}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Khách hàng của chúng tôi
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Khách hàng của chúng tôi đến từ khắp nơi trên thế giới bao gồm Hoa Kỳ, 
              Canada, Hàn Quốc, Đức, Việt Nam, Nhật Bản, Úc.
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 italic leading-relaxed">
              Chúng tôi dành mọi nỗ lực của mình để tập trung vào việc cải thiện chất lượng sản phẩm 
              thay vì chỉ cải thiện lợi nhuận của công ty.
            </p>
          </div>
        </div>

        {/* World Map with Country Markers với hiệu ứng xuất hiện */}
        <div 
          className={`
            max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300
            ${isInView 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
            }
          `}
        >
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            {/* World Map */}
            <div className="relative w-full h-100 rounded-xl overflow-hidden">
              <img 
                src={WorldMap} 
                alt="World Map" 
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Country Markers với hiệu ứng xuất hiện từ từ */}
              {countries.map((country, index) => (
                <div
                  key={country.name}
                  className={`
                    absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500
                    ${hasAnimated ? 'animate-in zoom-in duration-700' : ''}
                    ${index === currentIndex 
                      ? "scale-110 z-20" 
                      : "scale-100 z-10"
                    }
                  `}
                  style={{
                    ...country.position,
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Country Flag Marker */}
                  <div 
                    className={`relative flex flex-col items-center justify-center p-2 rounded-full shadow-lg transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-red-500 to-purple-500 text-white"
                        : "bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm text-gray-800 dark:text-white"
                    }`}
                  >
                    <div className="text-xl">{country.flag}</div>
                    <span 
                      className={`text-xs font-semibold whitespace-nowrap ${
                        index === currentIndex ? "text-white" : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {country.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Infinite Loop Carousel - Được thêm vào từ TrustedClientsSection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Các doanh nghiệp hàng đầu
          </h3>
          
          <div 
            className="relative h-[280px] md:h-[320px]"
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              ref={containerRef}
              className="absolute bottom-20 left-0 right-0 h-full overflow-visible"
            >
              <motion.div
                className="flex absolute top-1/2 -translate-y-1/2"
                style={{
                  x: -scrollPosition,
                  width: `${totalWidth}px`
                }}
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
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 h-full border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl">
                        {/* Logo Container */}
                        <div className="relative mb-4 md:mb-6">
                          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg transition-colors duration-300">
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          {/* Logo Glow */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-xl -z-10 group-hover:opacity-70 transition-opacity duration-300" />
                        </div>
                        
                        {/* Client Info */}
                        <h3 className="text-base md:text-lg font-bold text-center text-gray-800 dark:text-white mb-2 transition-colors duration-300 line-clamp-1">
                          {client.name}
                        </h3>
                        {/* Hover Indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      </div>
                      {/* Card Glow */}
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-red-500/10 to-purple-500/10 dark:from-red-400/10 dark:to-purple-600/10 rounded-2xl p-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Trở thành đối tác tiếp theo
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-lg mx-auto text-sm">
                Liên hệ ngay để được tư vấn giải pháp drone phù hợp với doanh nghiệp của bạn
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-purple-600 hover:to-red-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
              >
                Liên hệ hợp tác
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
