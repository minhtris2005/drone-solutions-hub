import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
  {
    title: "Hướng dẫn bảo trì Drone",
    description: "Tài liệu chi tiết về cách bảo dưỡng và chăm sóc drone",
    category: "Kỹ thuật",
  },
  {
    title: "Quy định pháp luật về bay Drone",
    description: "Tổng hợp các quy định pháp luật liên quan đến drone tại Việt Nam",
    category: "Pháp lý",
  },
  {
    title: "Catalog sản phẩm Drone 2024",
    description: "Danh mục các dòng drone chính hãng và phụ kiện",
    category: "Sản phẩm",
  },
  {
    title: "Hướng dẫn xin phép bay",
    description: "Quy trình và thủ tục xin phép bay drone chi tiết",
    category: "Pháp lý",
  },
  {
    title: "Kỹ thuật bay an toàn",
    description: "Tài liệu đào tạo về kỹ thuật bay và an toàn bay",
    category: "Đào tạo",
  },
  {
    title: "Bảng giá dịch vụ",
    description: "Bảng giá chi tiết các dịch vụ drone",
    category: "Giá cả",
  },
];

export default function Documents() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Tài liệu
            </h1>
            <p className="text-xl text-muted-foreground">
              Thư viện tài liệu hữu ích về drone và dịch vụ của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {doc.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {doc.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {doc.description}
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
