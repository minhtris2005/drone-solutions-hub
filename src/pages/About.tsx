import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Users, TrendingUp, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Về chúng tôi
            </h1>
            <p className="text-xl text-muted-foreground">
              Đơn vị tiên phong trong lĩnh vực dịch vụ drone tại Việt Nam
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80"
                alt="About Us"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Hành trình phát triển
              </h2>
              <p className="text-muted-foreground">
                Được thành lập từ năm 2014, chúng tôi đã không ngừng nỗ lực để trở thành đơn vị hàng đầu
                trong lĩnh vực dịch vụ drone tại Việt Nam.
              </p>
              <p className="text-muted-foreground">
                Với đội ngũ kỹ thuật viên được đào tạo bài bản, trang thiết bị hiện đại và quy trình làm việc
                chuyên nghiệp, chúng tôi tự hào đã phục vụ hàng ngàn khách hàng trong nhiều lĩnh vực khác nhau.
              </p>
              <p className="text-muted-foreground">
                Sứ mệnh của chúng tôi là mang công nghệ bay không người lái đến gần hơn với mọi người,
                giúp doanh nghiệp và cá nhân tối ưu hóa công việc và sáng tạo không giới hạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">
            Giá trị cốt lõi
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Tận tâm",
                description: "Đặt khách hàng làm trung tâm trong mọi hoạt động",
              },
              {
                icon: Users,
                title: "Chuyên nghiệp",
                description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm và tận tụy",
              },
              {
                icon: TrendingUp,
                title: "Sáng tạo",
                description: "Không ngừng đổi mới và cải tiến dịch vụ",
              },
              {
                icon: Award,
                title: "Uy tín",
                description: "Cam kết chất lượng và bảo hành dài hạn",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Năm kinh nghiệm" },
              { number: "5000+", label: "Khách hàng tin tưởng" },
              { number: "50+", label: "Kỹ thuật viên chuyên nghiệp" },
              { number: "99%", label: "Khách hàng hài lòng" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-5xl font-bold text-primary">{stat.number}</div>
                <div className="text-lg text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
