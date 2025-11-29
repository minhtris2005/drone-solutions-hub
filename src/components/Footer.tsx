import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-lg">
                DS
              </div>
              <span className="font-bold text-lg">Drone Services</span>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Chuyên cung cấp dịch vụ drone chuyên nghiệp, sửa chữa và nhập khẩu thiết bị bay không người lái.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gioi-thieu" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/dich-vu" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link to="/tai-lieu" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Tài liệu
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/lien-he" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dich-vu/sua-chua-drone" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Sửa chữa Drone
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/drone-trac-dia" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Drone Trắc địa
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/drone-van-chuyen" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Drone Vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/phep-bay" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Dịch vụ Phép bay
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/nhap-khau" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Nhập khẩu Drone
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white/70">028 99 95 95 88</div>
                  <div className="text-white/70">034 612 4230</div>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                info@droneservices.vn
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                Tp. Hồ Chí Minh, Việt Nam
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          <p>© 2024 Drone Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
