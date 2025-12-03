import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";

import fix from "@/assets/services/video/fix.png";
import icon1 from "@/assets/services/video/icon1.png";
import icon2 from "@/assets/services/video/icon2.png";
import icon3 from "@/assets/services/video/icon3.png";
import icon4 from "@/assets/services/video/icon4.png";

export default function DroneImport() {
  // Dữ liệu cho HeroBanner
  const heroData = {
    title: "QUAY FLYCAM",
    subtitle: (
      <>
        Hitek Flycam mang đến dịch vụ quay phim, chụp ảnh trên không bằng drone<br/>
         chuyên nghiệp, phục vụ quảng cáo, truyền thông, sự kiện và du lịch.
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
        title: "Quay TVC & quảng cáo doanh nghiệp",
        description: "Resort, khu công nghiệp, bất động sản, nhà máy."
      },
      {
        icon: icon2,
        title: "Chụp ảnh/clip du lịch, quảng bá địa phương",
        description: "Toàn cảnh, panorama, fly-through."
      },
      {
        icon: icon3,
        title: "Ghi hình sự kiện & lễ hội",
        description: "Quay đa góc, trực tiếp (livestream) bằng nhiều drone."
      },
      {
        icon: icon4,
        title: "Xử lý hậu kỳ",
        description: "Chỉnh màu điện ảnh, dựng video, lồng tiếng, motion logo."
      }
    ]
  };

  // Dữ liệu cho ProcessTimeline
  const processData = {
    title: "Quy trình triển khai",
    processes: [
      {
        step: "01",
        title: "Tiếp nhận brief và tư vấn góc quay, storyboard.",
      },
      {
        step: "02",
        title: "Xin phép bay & chuẩn bị thiết bị phù hợp với địa điểm.",
      },
      {
        step: "03",
        title: "Tiến hành quay chụp với đội bay & đạo diễn phối hợp.",
      },
      {
        step: "04",
        title: "Dựng hậu kỳ, chỉnh màu, xuất bản theo format mong muốn.",
      },
      {
        step: "05",
        title: "Bàn giao video, ảnh và file nguồn (theo yêu cầu).",
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
          "Mang lại hình ảnh",
          { text: "thương hiệu ", bold: true },
          "mạnh mẽ, chuyên nghiệp."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Tiết kiệm thời gian, ",
          { text: " chi phí sản xuất", bold: true },
          " so với quay truyền thống."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Tối ưu an toàn, ",
          { text: " cấp phép", bold: true },
          " đầy đủ cho mọi chuyến bay."
        ]
      },
      {
        icon: CheckCircle,
        parts: [
          "Hậu kỳ chất lượng ",
          { text: " cao – chuẩn", bold: true },
          " màu phim điện ảnh."
        ]
      }
    ]
  };

  // Dữ liệu cho FAQSection
  const faqData = {
    title: "Câu hỏi thường gặp",
    faqs: [
      {
        question: "Có cần xin phép bay trước khi quay phim không?",
        answer: "chưa có"
      },
      {
        question: "Bao gồm hậu kỳ hoặc phối cảnh chuyên nghiệp không?",
        answer: "chưa có"
      },
      {
        question: "Kích thước video và ảnh hỗ trợ là gì?",
        answer: "chưa có"
      },
      {
        question: "Có thể quay được trong điều kiện gió mạnh/ban đêm không?",
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
