import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

const services: Service[] = [
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
];

export default function ServicesPreview() {
  return (
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
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/dich-vu">Xem tất cả dịch vụ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, description, image, link }: Service) {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent flex items-end p-8">
        <div>
          <h3 className="text-white font-bold text-2xl mb-2">{title}</h3>
          <p className="text-white/80 mb-4">{description}</p>
          <span className="inline-flex items-center text-primary font-medium">
            Tìm hiểu thêm <ArrowRight className="ml-2 w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
