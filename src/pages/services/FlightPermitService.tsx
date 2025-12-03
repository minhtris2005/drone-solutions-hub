import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";

import fix from "@/assets/services/surveying_drone/bg.png";
import icon1 from "@/assets/services/surveying_drone/icon1.png";
import icon2 from "@/assets/services/surveying_drone/icon2.png";
import icon3 from "@/assets/services/surveying_drone/icon3.png";

export default function FlightPermitService() {
  // Dữ liệu cho HeroBanner
  const heroData = {
    title: "XIN GIẤY PHÉP BAY",
    subtitle: (
      <>
        Giải pháp hỗ trợ xin phép bay drone/­flycam hợp pháp tại Việt Nam,<br/>
        đảm bảo tuân thủ quy định của Bộ Quốc phòng và Bộ Công an.
      </>
    ),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
  };

  // Dữ liệu cho FeaturesSection
  const featuresData = {
    title: "Phạm vi",
    highlightedText: "dịch vụ",
    features: [
      {
        icon: icon1,
        title: "Xin phép bay cho quay phim, khảo sát, kiểm tra kỹ thuật, trình diễn và thử nghiệm.",
      },
      {
        icon: icon2,
        title: "Tư vấn pháp lý: quy định khu vực cấm bay, giới hạn độ cao, điều kiện thiết bị.",
      },
      {
        icon: icon3,
        title: "Đăng ký thiết bị & bảo hiểm bay thương mại theo tiêu chuẩn Việt Nam.",
      }
    ]
  };

  // Dữ liệu cho ProcessTimeline
  const processData = {
    title: "Quy trình triển khai",
    processes: [
      {
        step: "01",
        title: "Thu thập thông tin khu vực, mục đích và thời gian bay.",
      },
      {
        step: "02",
        title: "Kiểm tra điều kiện pháp lý & chuẩn bị hồ sơ xin phép.",
      },
      {
        step: "03",
        title: "Nộp và theo dõi hồ sơ với cơ quan quản lý.",
      },
      {
        step: "04",
        title: "Nhận giấy phép hợp lệ & hướng dẫn bay đúng quy định.",
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
          "Bay hợp pháp, an toàn,",
          { text: " không lo ", bold: true },
          "bị phạt hoặc thu hồi thiết bị."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          { text: "Tiết kiệm thời gian,", bold: true },
          " hồ sơ chuẩn ngay từ đầu."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Hỗ trợ tận nơi với đội ngũ am hiểu",
          { text: " quy định", bold: true },
          " pháp luật hàng không."
        ]
      }
    ]
  };

  // Dữ liệu cho FAQSection
  const faqData = {
    title: "Câu hỏi thường gặp",
    faqs: [
      {
        question: "Khi nào cần xin phép bay drone?",
        answer: "chưa có"
      },
      {
        question: "Hitek Flycam hỗ trợ xin phép bay ở những khu vực nào?",
        answer: "chưa có"
      },
      {
        question: "Thời gian xử lý hồ sơ xin phép là bao lâu?",
        answer: "chưa có"
      },
      {
        question: "Tôi có thể tự xin phép bay được không?",
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
