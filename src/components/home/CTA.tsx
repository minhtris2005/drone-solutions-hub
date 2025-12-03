import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Sẵn sàng bắt đầu dự án của bạn?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Liên hệ ngay để được tư vấn miễn phí và nhận báo giá tốt nhất
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link to="/lien-he">Liên hệ ngay</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <a href="tel:0289995958888">Gọi: 028 99 95 95 88</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
