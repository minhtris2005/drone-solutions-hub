import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";

import fix from "@/assets/services/importing_drone/bg.jpg";
import icon1 from "@/assets/services/delivery_drone/icon1.png";
import icon2 from "@/assets/services/delivery_drone/icon2.png";
import icon3 from "@/assets/services/delivery_drone/icon3.png";

export default function DroneImport() {
  // Dữ liệu cho HeroBanner
  const heroData = {
    title: "NHẬP KHẨU DRONE",
    subtitle: (
      <>
        Giải pháp nhập khẩu, phân phối và tư vấn lựa chọn thiết bị drone công nghiệp,<br/>
         giúp doanh nghiệp sở hữu thiết bị hợp pháp, chính hãng, tối ưu cho từng lĩnh vực sử dụng.
      </>
    ),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
  };

  // Dữ liệu cho FeaturesSection
  const featuresData = {
    title: "Giải pháp logistics",
    highlightedText: " thế hệ mới",
    features: [
      {
        icon: icon1,
        title: "Tư vấn lựa chọn drone: phù hợp mục đích khảo sát, quay phim, logistics, hoặc nông nghiệp.",
      },
      {
        icon: icon2,
        title: "Hỗ trợ lắp đặt & hiệu chuẩn ban đầu, kiểm định thiết bị",
      },
      {
        icon: icon3,
        title: "Thủ tục nhập khẩu: CO, CQ, hải quan, đăng ký và bảo hành chính hãng.",
      }
    ]
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
        title: "Đề xuất thiết bị, model và báo giá minh bạch.",
      },
      {
        step: "03",
        title: "Tiến hành nhập khẩu, làm thủ tục hải quan, kiểm định.",
      },
      {
        step: "04",
        title: "Hỗ trợ lắp đặt & hiệu chuẩn ban đầu, kiểm định thiết bị.",
      }
    ]
  };

  // Dữ liệu cho BenefitsSection
  const benefitsData = {
    imageUrl : "https://victory.com.vn/wp-content/uploads/2022/12/mavic-3m-nong-nghiep-5.png",
    title: "Lợi ích dành cho",
    highlightedText: "khách hàng",
    benefits: [
      {
        icon: CheckCircle,
        parts: [
          { text: "Nhập khẩu chính ngạch ", bold: true },
          "đảm bảo giấy tờ pháp lý & bảo hành."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Tiết kiệm chi phí",
          { text: " 10–20 %", bold: true },
          " so với mua lẻ hoặc qua đại lý."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Hỗ trợ ",
          { text: " toàn diện", bold: true },
          " từ nhập khẩu đến bảo trì."
        ]
      }
    ]
  };

  // Dữ liệu cho FAQSection
  const faqData = {
    title: "Câu hỏi thường gặp",
    faqs: [
      {
        question: "Hitek Flycam nhập khẩu những thương hiệu nào?",
        answer: "chưa có"
      },
      {
        question: "Thủ tục nhập khẩu gồm những gì?",
        answer: "chưa có"
      },
      {
        question: "Drone có được bảo hành chính hãng không?",
        answer: "chưa có"
      },
      {
        question: "Có hỗ trợ nào sau khi bàn giao thiết bị không?",
        answer: "chưa có"
      },
    ]
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
