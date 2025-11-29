import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { name: "Sửa chữa Drone", path: "/dich-vu/sua-chua-drone" },
  { name: "Drone Trắc địa", path: "/dich-vu/drone-trac-dia" },
  { name: "Drone Vận chuyển", path: "/dich-vu/drone-van-chuyen" },
  { name: "Dịch vụ Phép bay", path: "/dich-vu/phep-bay" },
  { name: "Nhập khẩu Drone", path: "/dich-vu/nhap-khau" },
  { name: "Quay Flycam", path: "/dich-vu/quay-flycam" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-primary-foreground">
              DS
            </div>
            <span className="font-bold text-xl text-foreground hidden md:block">
              Drone Services
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Trang chủ
            </Link>
            <Link
              to="/gioi-thieu"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Giới thiệu
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link
                to="/dich-vu"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Dịch vụ
              </Link>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-3 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/tai-lieu"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Tài liệu
            </Link>
            <Link
              to="/blog"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              to="/lien-he"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Liên hệ
            </Link>
          </div>

          {/* Hotline */}
          <div className="hidden lg:flex items-center gap-2 text-foreground">
            <Phone className="w-5 h-5 text-primary" />
            <div className="text-sm font-medium">
              <div>028 99 95 95 88</div>
              <div>034 612 4230</div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-in slide-in-from-top duration-200">
            <Link
              to="/"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/gioi-thieu"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Giới thiệu
            </Link>
            <Link
              to="/dich-vu"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Dịch vụ
            </Link>
            {services.map((service) => (
              <Link
                key={service.path}
                to={service.path}
                className="block px-8 py-2 text-sm text-muted-foreground hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {service.name}
              </Link>
            ))}
            <Link
              to="/tai-lieu"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Tài liệu
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/lien-he"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Liên hệ
            </Link>
            <div className="px-4 py-2 flex items-center gap-2 text-foreground border-t border-border mt-2 pt-4">
              <Phone className="w-5 h-5 text-primary" />
              <div className="text-sm font-medium">
                <div>028 99 95 95 88</div>
                <div>034 612 4230</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
