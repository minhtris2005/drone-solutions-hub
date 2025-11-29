import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Liên hệ
            </h1>
            <p className="text-xl text-muted-foreground">
              Hãy để chúng tôi giúp bạn với dự án drone của bạn
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Gửi tin nhắn
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Họ và tên
                  </label>
                  <Input placeholder="Nhập họ và tên của bạn" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Số điện thoại
                  </label>
                  <Input type="tel" placeholder="0123 456 789" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Dịch vụ quan tâm
                  </label>
                  <Input placeholder="Ví dụ: Sửa chữa drone, Quay flycam..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nội dung
                  </label>
                  <Textarea
                    placeholder="Mô tả chi tiết yêu cầu của bạn..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Gửi tin nhắn
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Thông tin liên hệ
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Hotline
                      </h3>
                      <p className="text-muted-foreground">028 99 95 95 88</p>
                      <p className="text-muted-foreground">034 612 4230</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <p className="text-muted-foreground">
                        info@droneservices.vn
                      </p>
                      <p className="text-muted-foreground">
                        support@droneservices.vn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Địa chỉ
                      </h3>
                      <p className="text-muted-foreground">
                        Quận 1, Tp. Hồ Chí Minh, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Giờ làm việc
                      </h3>
                      <p className="text-muted-foreground">
                        Thứ 2 - Thứ 6: 8:00 - 18:00
                      </p>
                      <p className="text-muted-foreground">
                        Thứ 7: 8:00 - 12:00
                      </p>
                      <p className="text-muted-foreground">Chủ nhật: Nghỉ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-secondary rounded-2xl h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Bản đồ Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
