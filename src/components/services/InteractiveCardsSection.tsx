import { Link } from "react-router-dom";
import image1 from "@/assets/bg_cut/flycam1.jpg";
import image2 from '@/assets/bg_cut/flycam2.jpg';
import image3 from '@/assets/bg_cut/flycam3.jpg';
import image4 from '@/assets/bg_cut/flycam4.jpg';
import image5 from '@/assets/bg_cut/flycam5.jpg';

// Tạo mapping giữa service và route
const serviceRoutes = {
  "Sửa chữa drone": "/services/drone-repair",
  "Drone trắc địa": "/services/surveying-drone", 
  "Drone vận chuyển": "/services/delivery-drone",
  "Dịch vụ Phép bay": "/services/flight-permit-service",
  "Nhập khẩu Drone": "/services/drone-import",
  "Quay flycam": "/services/drone-filming"
};

const serviceCards = [
  {
    title: "01",
    description: "Sửa chữa drone",
    detail: "Dịch vụ sửa chữa drone chuyên nghiệp, nhanh chóng và uy tín",
    image: image1
  },
  {
    title: "02", 
    description: "Drone trắc địa",
    detail: "Cung cấp giải pháp drone trắc địa chính xác cao",
    image: image2
  },
  {
    title: "03",
    description: "Drone vận chuyển", 
    detail: "Dịch vụ vận chuyển bằng drone tiện lợi và hiệu quả",
    image: image3
  },
  {
    title: "04",
    description: "Dịch vụ Phép bay",
    detail: "Tư vấn và xin giấy phép bay chuyên nghiệp",
    image: image4
  },
  {
    title: "05",
    description: "Nhập khẩu Drone",
    detail: "Nhập khẩu drone chính hãng với giá cả cạnh tranh",
    image: image5
  },
];

export default function InteractiveCardsSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="pb-3 text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 bg-clip-text text-transparent drop-shadow-lg leading-[1.2]">
          Chúng tôi cung cấp các giải pháp
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1">
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl h-[450px] md:h-[500px] lg:h-[550px] cursor-pointer"
            >
              {/* Hình ảnh */}
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Gradient overlay (luôn hiển thị) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Nội dung ban đầu */}
              <div className="relative h-full flex flex-col justify-end p-6 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                <div>
                  <h3 className="text-pure-white font-bold text-6xl mb-3 text-left">{card.title}</h3>
                  <p className="text-pure-white text-2xl font-bold text-left mb-4">{card.description}</p>
                  <div className="w-10 h-10 border border-gray-300 bg-transparent rounded-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Nội dung khi hover */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <div className="relative z-10 space-y-4">
                  <div className="text-left">
                    <h3 className="text-pure-white font-bold text-6xl mb-3">{card.title}</h3>
                    <p className="text-pure-white text-2xl font-bold mb-2">{card.description}</p>
                    <p className="text-pure-white text-sm mb-6 leading-relaxed">{card.detail}</p>
                  </div>
                  <Link 
                    to={serviceRoutes[card.description as keyof typeof serviceRoutes] || "#"}
                    className="block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="bg-white text-vibrant-red font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 w-full text-base text-left flex items-center justify-between group/btn">
                      <span>Tìm hiểu thêm</span>
                      <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </Link>
                </div>
                
                {/* Overlay màu đỏ khi hover */}
                <div className="absolute inset-0 bg-vibrant-red opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
