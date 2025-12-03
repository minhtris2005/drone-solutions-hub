import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";

import fix from "@/assets/services/delivery_drone/fix.png";
import icon1 from "@/assets/services/delivery_drone/icon1.png";
import icon2 from "@/assets/services/delivery_drone/icon2.png";
import icon3 from "@/assets/services/delivery_drone/icon3.png";

export default function DeliveryDrone() {
  // Dữ liệu cho HeroBanner
  const heroData = {
    title: "DRONE VẬN CHUYỂN",
    subtitle: (
      <>
        Giải pháp vận chuyển hàng hóa bằng drone được thiết kế cho khu công nghiệp,<br/>
        nông nghiệp và khu vực khó tiếp cận — tối ưu hóa chi phí, thời gian và nhân lực.
      </>
    ),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
  };

  // Dữ liệu cho FeaturesSection
  const featuresData = {
    title: "Ứng dụng của",
    highlightedText: " Drone Vận Chuyển",
    features: [
      {
        icon: icon1,
        title: "Giao nhận nội khu: kho, nhà máy, khu sản xuất.",
      },
      {
        icon: icon2,
        title: "Vận chuyển mẫu, tài liệu, linh kiện trong nông nghiệp hoặc công nghiệp.",
      },
      {
        icon: icon3,
        title: "Dịch vụ giao hàng thử nghiệm và mô hình logistics drone.",
      }
    ]
  };

  // Dữ liệu cho ProcessTimeline
  const processData = {
    title: "Quy trình triển khai",
    processes: [
      {
        step: "01",
        title: "Phân tích nhu cầu & trọng lượng hàng hóa.",
      },
      {
        step: "02",
        title: "Lập bản đồ đường bay, điểm cất/hạ, hành trình tự động.",
      },
      {
        step: "03",
        title: "Cấu hình thiết bị, kiểm tra an toàn & xin phép bay.",
      },
      {
        step: "04",
        title: "Tiến hành bay thử, ghi log dữ liệu và bàn giao quy trình vận hành.",
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
          { text: "Rút ngắn thời gian", bold: true },
          " giao nhận, giảm nhân lực vận hành."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Hỗ trợ khu vực khó tiếp cận,",
          { text: " giảm rủi ro", bold: true },
          " logistics truyền thống."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Tối ưu chi phí,",
          { text: " kiểm soát", bold: true },
          " hành trình theo thời gian thực."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Tăng hiệu quả",
          { text: " sản xuất", bold: true },
          " và vận hành nội khu."
        ]
      }
    ]
  };

  // Dữ liệu cho FAQSection
  const faqData = {
    title: "Câu hỏi thường gặp",
    faqs: [
      {
        question: "Ứng dụng phổ biến của drone vận chuyển là gì?",
        answer: "chưa có"
      },
      {
        question: "Drone vận chuyển có thể mang tải trọng bao nhiêu?",
        answer: "chưa có"
      },
      {
        question: "Hệ thống điều hướng có an toàn không?",
        answer: "chưa có"
      },
      {
        question: "Điều kiện vận hành trong thời tiết xấu như thế nào?",
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
