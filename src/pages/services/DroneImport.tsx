import { Wrench, Clock, Shield, CheckCircle } from "lucide-react";
import bg from "@/assets/services/importing_drone/bg.jpg";
import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";

export default function DroneImport() {
  // Dữ liệu cho HeroBanner
  const heroData = {
    title: "NHẬP KHẨU DRONE",
    subtitle: (
      <>
        Giải pháp nhập khẩu, phân phối và tư vấn lựa chọn thiết bị drone công nghiệp,<br />
        giúp doanh nghiệp sở hữu thiết bị hợp pháp, chính hãng, tối ưu cho từng lĩnh vực sử dụng.
      </>
    ),
    backgroundImage: bg,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
    overlayOpacity: 0.8,
    overlayColor: "black"
  };

  // Dữ liệu cho FeaturesSection
  const featuresData = {
    title: "Phạm vi dịch vụ",
    features: [
      {
        icon: "/path/to/wrench-icon.png", // Thay bằng icon thực tế
        title: "Tư vấn lựa chọn drone",
        description: "Phù hợp mục đích khảo sát, quay phim, logistics, hoặc nông nghiệp."
      },
      {
        icon: "/path/to/clock-icon.png", // Thay bằng icon thực tế
        title: "Hỗ trợ lắp đặt & hiệu chuẩn",
        description: "Hỗ trợ lắp đặt & hiệu chuẩn ban đầu, kiểm định thiết bị."
      },
      {
        icon: "/path/to/shield-icon.png", // Thay bằng icon thực tế
        title: "Thủ tục nhập khẩu đầy đủ",
        description: "CO, CQ, hải quan, đăng ký và bảo hành chính hãng."
      }
    ],
    backgroundColor: "bg-light-gray",
    highlightColor: "text-vibrant-red"
  };

  // Dữ liệu cho ProcessTimeline
  const processData = {
    title: "Quy trình triển khai",
    processes: [
      {
        step: "01",
        title: "Xác định nhu cầu và ngân sách khách hàng.",
      },
      {
        step: "02",
        title: "Đề xuất thiết bị, model và báo giá minh bạch",
      },
      {
        step: "03",
        title: "Tiến hành nhập khẩu, làm thủ tục hải quan, kiểm định",
      },
      {
        step: "04",
        title: "Hỗ trợ lắp đặt & hiệu chuẩn ban đầu, kiểm định thiết bị",
      },
    ],
    lineColor: "from-vibrant-red/30 via-vibrant-red/50 to-vibrant-red/30",
    stepColor: "from-vibrant-red to-red-600",
    backgroundColor: "bg-pure-white"
  };

  // Dữ liệu cho BenefitsSection
  const benefitsData = {
    title: "Lợi ích dành cho khách hàng",
    benefits: [
      {
        icon: CheckCircle,
        parts: [
          "Rút ngắn thời gian khảo sát ",
          { text: "tới 70%", bold: true },
          " so với phương pháp truyền thống"
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          { text: "Sai số thấp, dữ liệu ổn định, xử lý nhanh", bold: true },
          " dành cho các công trình lớn."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Mọi chuyến bay và dữ liệu đều ",
          { text: "tuân thủ tiêu chuẩn", bold: true },
          " pháp lý và kỹ thuật của Hitek Flycam."
        ]
      },
    ],
    backgroundColor: "bg-light-gray",
    iconColor: "bg-green-500",
    highlightColor: "text-vibrant-red",
    columns: "md:grid-cols-2 lg:grid-cols-3" // Custom số cột
  };

  // Dữ liệu cho FAQSection
  const faqData = {
    title: "Câu hỏi thường gặp",
    faqs: [
      {
        question: "Hitek Flycam nhập khẩu những thương hiệu nào?",
        answer: "Chúng tôi chuyên nhập khẩu các thương hiệu drone hàng đầu như DJI, Autel, Parrot và các hãng chuyên dụng khác phù hợp với nhu cầu khảo sát, quay phim, và ứng dụng công nghiệp."
      },
      {
        question: "Thủ tục nhập khẩu gồm những gì?",
        answer: "Thủ tục bao gồm: Xin giấy phép nhập khẩu, làm thủ tục hải quan, kiểm tra chất lượng, đăng ký thiết bị với cơ quan quản lý và hoàn tất các thủ tục pháp lý theo quy định của Việt Nam."
      },
      {
        question: "Drone có được bảo hành chính hãng không?",
        answer: "Tất cả drone nhập khẩu qua Hitek Flycam đều được bảo hành chính hãng toàn cầu. Chúng tôi hỗ trợ xử lý các yêu cầu bảo hành và sửa chữa trong thời gian bảo hành theo chính sách của nhà sản xuất."
      },
      {
        question: "Có hỗ trợ nào sau khi bàn giao thiết bị không?",
        answer: "Chúng tôi hỗ trợ đào tạo sử dụng, hướng dẫn vận hành, cập nhật phần mềm và tư vấn kỹ thuật miễn phí trong 6 tháng đầu. Ngoài ra, chúng tôi còn hỗ trợ dịch vụ bảo trì định kỳ và sửa chữa khi cần."
      },
    ],
    contactText: "Vẫn còn thắc mắc? Liên hệ ngay với chúng tôi",
    contactButtonText: "Liên hệ tư vấn",
    backgroundColor: "bg-pure-white",
    highlightColor: "text-vibrant-red"
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner {...heroData} />
      <FeaturesSection {...featuresData} />
      <ProcessTimeline {...processData} />
      <BenefitsSection {...benefitsData} />
      <FAQSection {...faqData} />
    </div>
  );
}
