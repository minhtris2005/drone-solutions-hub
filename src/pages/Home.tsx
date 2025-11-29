import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Zap, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  #1 Dịch vụ Drone tại Việt Nam
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Giải pháp Drone
                <span className="text-primary"> chuyên nghiệp </span>
                cho mọi nhu cầu
              </h1>
              <p className="text-xl text-muted-foreground">
                Từ sửa chữa, trắc địa đến dịch vụ quay phim - chúng tôi cung cấp giải pháp toàn diện với
                công nghệ bay không người lái hiện đại nhất.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/dich-vu">
                    Khám phá dịch vụ <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/lien-he">Liên hệ tư vấn</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-3xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80"
                alt="Professional Drone"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-xl text-muted-foreground">
              Uy tín - Chuyên nghiệp - Chất lượng
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Chất lượng đảm bảo",
                description: "Sử dụng linh kiện chính hãng, bảo hành dài hạn",
              },
              {
                icon: Zap,
                title: "Nhanh chóng",
                description: "Thời gian xử lý nhanh, giao hàng đúng hẹn",
              },
              {
                icon: Shield,
                title: "An toàn",
                description: "Tuân thủ nghiêm ngặt quy định an toàn bay",
              },
              {
                icon: Award,
                title: "Kinh nghiệm",
                description: "Hơn 10 năm trong ngành drone",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-xl text-muted-foreground">
              Giải pháp toàn diện cho mọi nhu cầu drone
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Sửa chữa Drone",
                description: "Dịch vụ sửa chữa, bảo dưỡng drone chuyên nghiệp",
                image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
                link: "/dich-vu/sua-chua-drone",
              },
              {
                title: "Drone Trắc địa",
                description: "Khảo sát và đo đạc địa hình chính xác cao",
                image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
                link: "/dich-vu/drone-trac-dia",
              },
              {
                title: "Quay Flycam",
                description: "Quay phim, chụp ảnh chuyên nghiệp từ trên cao",
                image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
                link: "/dich-vu/quay-flycam",
              },
            ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-white font-bold text-2xl mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/80 mb-4">{service.description}</p>
                    <span className="inline-flex items-center text-primary font-medium">
                      Tìm hiểu thêm <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/dich-vu">Xem tất cả dịch vụ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn sàng bắt đầu dự án của bạn?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Liên hệ ngay để được tư vấn miễn phí và nhận báo giá tốt nhất
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/lien-he">Liên hệ ngay</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:0289995958888">Gọi: 028 99 95 95 88</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
