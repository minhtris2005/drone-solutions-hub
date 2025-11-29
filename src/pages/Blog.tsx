import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "Top 5 mẫu Drone tốt nhất năm 2024",
    excerpt: "Tổng hợp các mẫu drone được đánh giá cao nhất về hiệu suất và tính năng trong năm nay.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    date: "15 Tháng 3, 2024",
    author: "Nguyễn Văn A",
    category: "Sản phẩm",
  },
  {
    title: "Hướng dẫn bay Drone an toàn cho người mới",
    excerpt: "Những kiến thức cơ bản và tips hữu ích giúp bạn bay drone an toàn và hiệu quả.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    date: "10 Tháng 3, 2024",
    author: "Trần Thị B",
    category: "Hướng dẫn",
  },
  {
    title: "Ứng dụng Drone trong nông nghiệp hiện đại",
    excerpt: "Cách công nghệ drone đang thay đổi và tối ưu hóa ngành nông nghiệp.",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    date: "5 Tháng 3, 2024",
    author: "Lê Văn C",
    category: "Công nghệ",
  },
  {
    title: "Quy định mới về bay Drone tại Việt Nam",
    excerpt: "Cập nhật những quy định pháp luật mới nhất về hoạt động bay không người lái.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    date: "1 Tháng 3, 2024",
    author: "Phạm Thị D",
    category: "Pháp lý",
  },
  {
    title: "Xu hướng quay phim Flycam năm 2024",
    excerpt: "Những xu hướng mới trong lĩnh vực quay phim và chụp ảnh bằng drone.",
    image: "https://images.unsplash.com/photo-1509565840034-3c385bbe6b61?auto=format&fit=crop&w=800&q=80",
    date: "25 Tháng 2, 2024",
    author: "Hoàng Văn E",
    category: "Nhiếp ảnh",
  },
  {
    title: "Bảo dưỡng Drone - Những điều cần biết",
    excerpt: "Hướng dẫn chi tiết về cách bảo dưỡng drone để kéo dài tuổi thọ thiết bị.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    date: "20 Tháng 2, 2024",
    author: "Vũ Thị F",
    category: "Bảo trì",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Tin tức, hướng dẫn và kiến thức về drone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <Link
                    to="#"
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Đọc thêm <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
