import { Wrench, MapPin, Package, FileCheck, Import, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const iconServices = [
  { icon: Wrench, label: "Sửa chữa" },
  { icon: MapPin, label: "Trắc địa" },
  { icon: Package, label: "Vận chuyển" },
  { icon: FileCheck, label: "Phép bay" },
  { icon: Import, label: "Nhập khẩu" },
];

const serviceCards = [
  {
    title: "Sửa chữa Drone",
    description: "Dịch vụ sửa chữa, bảo dưỡng drone chuyên nghiệp với đội ngũ kỹ thuật viên giàu kinh nghiệm.",
  },
  {
    title: "Drone Trắc địa",
    description: "Giải pháp drone đo đạc địa hình chính xác cho các dự án xây dựng và khảo sát.",
  },
  {
    title: "Drone Vận chuyển",
    description: "Dịch vụ vận chuyển hàng hóa bằng drone nhanh chóng, an toàn và hiệu quả.",
  },
  {
    title: "Dịch vụ Phép bay",
    description: "Hỗ trợ thủ tục xin phép bay drone theo quy định của cơ quan chức năng.",
  },
  {
    title: "Nhập khẩu Drone",
    description: "Nhập khẩu và phân phối các dòng drone cao cấp từ các thương hiệu hàng đầu thế giới.",
  },
];

const detailedServices = [
  {
    icon: Wrench,
    title: "Sửa chữa chuyên nghiệp",
    description: "Đội ngũ kỹ thuật viên được đào tạo bài bản, sử dụng linh kiện chính hãng.",
    features: ["Bảo hành 6 tháng", "Báo giá miễn phí", "Sửa tại nhà"],
  },
  {
    icon: MapPin,
    title: "Khảo sát địa hình",
    description: "Công nghệ drone tiên tiến cho khảo sát và đo đạc địa hình chính xác cao.",
    features: ["Độ chính xác cao", "Tiết kiệm thời gian", "Báo cáo chi tiết"],
  },
  {
    icon: Package,
    title: "Giao hàng nhanh chóng",
    description: "Giải pháp vận chuyển bằng drone cho các khu vực khó tiếp cận.",
    features: ["Giao hàng nhanh", "An toàn tuyệt đối", "Theo dõi realtime"],
  },
  {
    icon: FileCheck,
    title: "Xin phép bay",
    description: "Hỗ trợ hoàn tất thủ tục phép bay nhanh chóng, đúng quy định.",
    features: ["Tư vấn miễn phí", "Xử lý nhanh chóng", "Đúng quy định"],
  },
  {
    icon: Import,
    title: "Nhập khẩu chính hãng",
    description: "Phân phối drone chính hãng từ DJI, Autel, Parrot và nhiều thương hiệu khác.",
    features: ["Giá cạnh tranh", "Bảo hành chính hãng", "Tư vấn chi tiết"],
  },
  {
    icon: Video,
    title: "Quay phim Flycam",
    description: "Dịch vụ quay phim, chụp ảnh chuyên nghiệp từ trên cao với chất lượng 4K.",
    features: ["Chất lượng 4K", "Pilot giàu kinh nghiệm", "Hậu kỳ chuyên nghiệp"],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image Section */}
      <div className="pt-20">
        <div className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-90" />
          <img
            src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=2000&q=80"
            alt="Drone in sky"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Dịch vụ Drone chuyên nghiệp</h1>
              <p className="text-xl opacity-90">Giải pháp toàn diện cho mọi nhu cầu bay không người lái</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Icons Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {iconServices.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-card rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-center font-semibold text-foreground">{service.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Block with Title Left, Content Right */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Tại sao chọn chúng tôi?
              </h2>
              <div className="w-20 h-1 bg-primary" />
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Với hơn 10 năm kinh nghiệm trong ngành drone, chúng tôi tự hào là đơn vị tiên phong cung cấp
                các giải pháp bay không người lái toàn diện tại Việt Nam.
              </p>
              <p>
                Đội ngũ kỹ thuật viên được đào tạo bài bản, thiết bị hiện đại cùng quy trình làm việc chuyên nghiệp
                đảm bảo mang đến dịch vụ chất lượng cao nhất cho khách hàng.
              </p>
              <p>
                Chúng tôi cam kết sử dụng linh kiện chính hãng, tuân thủ nghiêm ngặt các quy định về an toàn bay
                và luôn đặt sự hài lòng của khách hàng lên hàng đầu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Interactive Cards Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Dịch vụ của chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceCards.map((card, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl aspect-[3/4] cursor-pointer"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    [
                      "1473968512647-3e447244af8f",
                      "1508614589041-895b88991e3e",
                      "1527977966376-1c8408f9f108",
                      "1563089145-599997674d42",
                      "1509565840034-3c385bbe6b61",
                    ][index]
                  }?auto=format&fit=crop&w=600&q=80`}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">{card.title}</h3>
                    <p className="text-white/80 text-sm">{card.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                  <div className="text-white text-center">
                    <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                    <p className="text-sm">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Service Boxes with Icons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Chi tiết dịch vụ
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedServices.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Tìm hiểu thêm</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
