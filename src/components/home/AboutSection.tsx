import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { Award, Users, FolderCheck, UserCheck, Camera, MapPin, Shield } from "lucide-react";
import homePageHitekSoftware from "@/assets/home/home-page-hitek-software.jpg";

// Component cho số đếm động
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const targetValue = parseInt(value.replace('+', ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = targetValue / (duration / 16); // 60fps
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, targetValue, duration]);

  return (
    <span ref={ref}>
      {count}+
    </span>
  );
};

// Component cho animation khi scroll vào view
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const AnimatedCard = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(30px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  const stats = [
    { 
      icon: Award, 
      value: "06+", 
      label: "Năm kinh nghiệm",
      description: "Chuyên sâu trong lĩnh vực drone và công nghệ bay không người lái"
    },
    { 
      icon: Users, 
      value: "500+", 
      label: "Khách hàng",
      description: "Đối tác tin cậy của các doanh nghiệp và tập đoàn lớn"
    },
    { 
      icon: FolderCheck, 
      value: "1200+", 
      label: "Dự án thành công",
      description: "Từ khảo sát địa hình đến quay phim chuyên nghiệp"
    },
  ];

  const services = [
    { icon: Camera, title: "Quay phim chuyên nghiệp", desc: "Flycam chất lượng 8K" },
    { icon: MapPin, title: "Khảo sát địa hình", desc: "Độ chính xác cao" },
    { icon: Shield, title: "An toàn tuyệt đối", desc: "Chứng chỉ hàng không" },
    { icon: UserCheck, title: "Đội ngũ chuyên gia", desc: "Kinh nghiệm 5+ năm" },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/10 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header với animation */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-16">

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Dẫn đầu trong lĩnh vực
            <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Drone & Flycam
            </span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Với nhiều năm kinh nghiệm và đội ngũ chuyên gia hàng đầu, chúng tôi cung cấp 
            giải pháp drone toàn diện cho mọi nhu cầu
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content - Thông tin chính với animation và hình ảnh */}
          <AnimatedSection className="space-y-8" delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Chuyên gia hàng đầu về giải pháp Drone
              </h3>
              
              <div className="bg-gradient-to-r from-primary/5 to-blue-100/20 dark:from-primary/10 dark:to-blue-900/20 rounded-xl p-6 border border-primary/10">
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Hitek Flycam là đơn vị tiên phong trong lĩnh vực dịch vụ flycam chuyên nghiệp tại Việt Nam. 
                  Với đội ngũ phi công có chứng chỉ hàng không, chúng tôi tự hào mang đến những giải pháp 
                  công nghệ cao cho các ngành công nghiệp.
                </p>
                
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Từ khảo sát công trình, kiểm tra đường dây điện, quay phim quảng cáo đến lập bản đồ 3D, 
                  chúng tôi có thể đáp ứng mọi yêu cầu khắt khe nhất với độ chính xác và an toàn tuyệt đối.
                </p>
              </div>

              {/* Hình ảnh được chèn vào đây */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mt-6 group">
                <img 
                  src={homePageHitekSoftware} 
                  alt="Đội ngũ chuyên gia Hitek Flycam" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Đội ngũ chuyên gia Hitek Flycam</p>
                  <p className="text-xs opacity-90">Phi công chứng chỉ hàng không & Kỹ thuật viên chuyên nghiệp</p>
                </div>
              </div>

              {/* Services mini grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{service.title}</p>
                      <p className="text-xs text-muted-foreground">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Content - Stats Grid với animation staggered */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedCard key={index} delay={0.3 + index * 0.1}>
                  <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl group hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 border border-primary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-baseline gap-2">
                          <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                            <AnimatedCounter value={stat.value} duration={2000 + index * 200} />
                          </div>
                          <div className="text-lg font-semibold text-foreground">
                            {stat.label}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}

            {/* Thông tin bổ sung */}
            <AnimatedCard delay={0.7}>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-blue-100/20 dark:from-primary/10 dark:to-blue-900/20 border border-primary/20">
                <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Chứng nhận & Bảo hiểm
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Chứng chỉ phi công UAV từ Cục Hàng không
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Bảo hiểm trách nhiệm dân sự 5 tỷ đồng
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Thiết bị được kiểm định định kỳ
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Đội ngũ có kinh nghiệm từ 3-8 năm
                  </li>
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* Call to Action với animation */}
        <AnimatedSection className="text-center mt-16" delay={0.6}>
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Cần tư vấn giải pháp drone phù hợp?
              </h4>
              <p className="text-muted-foreground text-sm">
                Liên hệ ngay để được chuyên gia của chúng tôi tư vấn miễn phí
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 whitespace-nowrap hover:scale-105">
                Liên hệ ngay
              </button>
              <button className="px-6 py-3 bg-white dark:bg-gray-800 text-foreground border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 whitespace-nowrap">
                0987 654 321
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;
