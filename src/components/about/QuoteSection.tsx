// components/about/QuoteSection.tsx
import { Quote } from "lucide-react";

const QuoteSection = () => {
  return (
    <section className="py-20 bg-pure-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-vibrant-red mx-auto mb-6" />
          <blockquote className="text-3xl font-light text-foreground italic leading-relaxed mb-8">
            Từ nền tảng của Hitek Drone – nơi công nghệ bay được tôn vinh bằng nghệ thuật,
            Hitek Flycam tiếp tục hành trình đó bằng công nghệ, dữ liệu và hiệu quả thực tế.
          </blockquote>
          <div className="text-lg font-semibold text-muted-foreground">
            - Đội ngũ Hitek Flycam -
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
