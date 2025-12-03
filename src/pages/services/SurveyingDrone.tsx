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

export default function SurveyingDrone() {
  // Dữ liệu cho HeroBanner
  const heroData = {
    title: "DRONE TRẮC ĐỊA",
    subtitle: (
      <>
        Giải pháp khảo sát và lập bản đồ kỹ thuật bằng drone, sử dụng công nghệ Lidar,<br />
        RTK-GPS và chụp ảnh đa phổ giúp thu thập dữ liệu không gian với độ chính xác cao
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
    highlightedText: "Drone Trắc Địa",
    features: [
      {
        icon: icon1,
        title: "Khảo sát địa hình phục vụ xây dựng, quy hoạch đô thị, mỏ khai thác.",
      },
      {
        icon: icon2,
        title: "Lập bản đồ 2D/3D, mô hình mặt đất (DEM/DTM), orthophoto và mesh 3D.",
      },
      {
        icon: icon3,
        title: "Đo diện tích, thể tích khối vật liệu, giám sát tiến độ thi công.",
      }
    ]
  };

  // Dữ liệu cho ProcessTimeline
  const processData = {
    title: "Quy trình triển khai",
    processes: [
      {
        step: "01",
        title: "Khảo sát hiện trường và xác định mục tiêu đo đạc.",
      },
      {
        step: "02",
        title: "Lập kế hoạch bay, phân vùng tọa độ và giới hạn an toàn.",
      },
      {
        step: "03",
        title: "Bay thu thập dữ liệu bằng drone Lidar hoặc RTK-GPS.",
      },
      {
        step: "04",
        title: "Xử lý ảnh, dựng bản đồ, đo thể tích và tạo mô hình 3D.",
      },
      {
        step: "05",
        title: "Bàn giao dữ liệu kèm báo cáo kỹ thuật chi tiết.",
      }
    ]
  };

  // Dữ liệu cho BenefitsSection
  const benefitsData = {
    imageUrl : "https://victory.com.vn/wp-content/uploads/2022/12/mavic-3m-nong-nghiep-5.png",
    title: "Lợi ích",
    highlightedText: "& cam kết",
    benefits: [
      {
        icon: CheckCircle,
        parts: [
          "Rút ngắn thời gian khảo sát ",
          { text: " tới 70% ", bold: true },
          "so với phương pháp truyền thống."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          { text: "Sai số thấp, dữ liệu ổn định, xử lý nhanh ", bold: true },
          "dành cho các công trình lớn."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Mọi chuyến bay và dữ liệu đều",
          { text: " tuân thủ tiêu chuẩn", bold: true },
          " pháp lý và kỹ thuật của Hitek Flycam."
        ]
      }
    ]
  };

  // Dữ liệu cho FAQSection
  const faqData = {
    title: "Câu hỏi thường gặp",
    faqs: [
      {
        question: "Ưu điểm của Drone Trắc địa so với phương pháp truyền thống?",
        answer: "chưa có"
      },
      {
        question: "Quy trình khảo sát mất thời gian bao lâu?",
        answer: "chưa có"
      },
      {
        question: "Drone của Hitek Flycam đạt độ chính xác như thế nào?",
        answer: "chưa có"
      },
      {
        question: "Dữ liệu đầu ra gồm những loại nào?",
        answer: "chưa có"
      },
      {
        question: "Dữ liệu đầu ra có thể tích hợp vào phần mềm thiết kế không?",
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
