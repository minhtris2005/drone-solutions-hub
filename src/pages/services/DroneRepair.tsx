// pages/services/drone-repair.tsx
import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";

import fix from "@/assets/services/repairing_drone/fix.png";
import icon1 from "@/assets/services/repairing_drone/icon2.png";
import icon2 from "@/assets/services/repairing_drone/icon3.png";
import icon3 from "@/assets/services/repairing_drone/icon1.png";

export default function DroneRepair() {
  // Dữ liệu cho HeroBanner
  const heroData = {
    title: "SỬA CHỮA DRONE",
    subtitle: (
      <>
        Dịch vụ sửa chữa và bảo trì Drone chuyên nghiệp, giúp thiết bị của bạn luôn trong<br />
        tình trạng ổn định, an toàn và đạt hiệu suất cao nhất
      </>
    ),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
  };

  // Dữ liệu cho FeaturesSection
  const featuresData = {
    title: "Giải pháp kĩ thuật của",
    highlightedText: "Hitek Flycam",
    features: [
      {
        icon: icon1,
        title: "Kiểm tra & Thay thế linh kiện",
        description: "Kiểm tra tổng thể, chẩn đoán lỗi, thay thế linh kiện"
      },
      {
        icon: icon2,
        title: "Cập nhật & Hiệu chuẩn hệ thống bay",
        description: "Cập nhật phần mềm, hiệu chuẩn cảm biến IMU, compass, hệ thống GPS"
      },
      {
        icon: icon3,
        title: "Kiểm tra an toàn & Bảo hành sau sữa chữa",
        description: "Kiểm tra an toàn trước và sau bay, bảo hành dịch vụ sửa chữa"
      }
    ]
  };

  // Dữ liệu cho ProcessTimeline
  const processData = {
    title: "Quy trình triển khai",
    processes: [
      {
        step: "01",
        title: "Tiếp nhận yêu cầu và chẩn đoán sơ bộ thông qua hình ảnh/video hoặc dữ liệu lỗi do khách hàng cung cấp",
      },
      {
        step: "02",
        title: "Kiểm tra thực tế tại workshop hoặc hiện trường: phân tích lỗi, thiết lập kế hoạch sửa chữa",
      },
      {
        step: "03",
        title: "Thực hiện thay linh kiện, nâng cấp phần mềm, hiệu chuẩn cảm biến theo tiêu chuẩn kỹ thuật",
      },
      {
        step: "04",
        title: "Thử bay kiểm định (nếu cần) hoặc kiểm tra hệ thống kết nối dữ liệu & truyền hình ảnh, ghi lại báo cáo",
      },
      {
        step: "05",
        title: "Bàn giao thiết bị, cung cấp biên bản sửa chữa và bảo hành, hướng dẫn khách hàng về quy trình vận hành tiếp theo.",
      }
    ]
  };

  // Dữ liệu cho BenefitsSection
  const benefitsData = {
    imageUrl : "https://victory.com.vn/wp-content/uploads/2022/12/mavic-3m-nong-nghiep-5.png",
    title: "Lợi ích",
    highlightedText: "dành cho khách hàng",
    benefits: [
      {
        icon: CheckCircle,
        parts: [
          "Thiết bị luôn trong trạng thái ",
          { text: "vận hành ổn định và tối ưu", bold: true },
          ", giảm thiểu thời gian dừng máy và bảo trì ngoài kế hoạch."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Gia tăng ",
          { text: "tuổi thọ và độ bền", bold: true },
          " của hệ thống drone – giúp tiết kiệm chi phí thay thế lớn về lâu dài."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Tăng độ ",
          { text: "an toàn bay,", bold: true },
          " giảm rủi ro vận hành – đặc biệt quan trọng khi thực hiện bay kỹ thuật hoặc bay thương mại."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Hỗ trợ bởi ",
          { text: "đội ngũ kỹ thuật chuyên nghiệp", bold: true },
          " của Hitek Flycam, quy trình chuẩn và báo cáo rõ ràng."
        ]
      }
    ]
  };

  // Dữ liệu cho FAQSection
  const faqData = {
    title: "Câu hỏi thường gặp",
    faqs: [
      {
        question: "Bao lâu nên thực hiện bảo trì drone một lần?",
        answer: "chưa có"
      },
      {
        question: "Drone bị lệch hướng hoặc GPS kém có sửa được không?",
        answer: "chưa có"
      },
      {
        question: "Có nhận kiểm tra online hoặc gửi thiết bị từ xa được không?",
        answer: "chưa có"
      },
      {
        question: "Có bảo hành sau khi sửa chữa không?",
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
