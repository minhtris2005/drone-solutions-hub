import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import droneIcon from "@/assets/logo/logo-flycam-hitek.png";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  { name: "services.droneRepair", path: "/services/drone-repair" },
  { name: "services.surveyingDrone", path: "/services/surveying-drone" },
  { name: "services.deliveryDrone", path: "/services/delivery-drone" },
  { name: "services.flightPermit", path: "/services/flight-permit-service" },
  { name: "services.droneImport", path: "/services/drone-import" },
  { name: "services.droneFilming", path: "/services/drone-filming" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const servicesDropdownRef = useRef(null);
  const servicesTimeoutRef = useRef(null);

  // Hàm scroll lên đầu trang
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, []);

  // ----- SCROLL EFFECT -----
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ----- CLICK OUTSIDE DROPDOWN -----
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ----- HOVER HANDLERS -----
  const handleMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    };
  }, []);

  // ----- NAVIGATION LINKS -----
  const navLinks = [
    { name: t('nav.home'), href: "/", onClick: scrollToTop },
    { name: t('nav.about'), href: "/gioi-thieu", onClick: scrollToTop },
    { name: t('nav.services'), href: "/dich-vu", hasDropdown: true, onClick: scrollToTop },
    { name: t('nav.document'), href: "/tai-lieu", onClick: scrollToTop },
    { name: t('nav.blog'), href: "/blog", onClick: scrollToTop },
    { name: t('nav.contact'), href: "/lien-he", onClick: scrollToTop },
  ];

  // ----- RENDER SERVICES DROPDOWN -----
  const renderServicesDropdown = () => (
    <motion.div 
      className="absolute top-full left-0 mt-2 w-64 bg-pure-white dark:bg-pure-black rounded-lg shadow-lg border border-border overflow-hidden z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {services.map((service) => (
        <Link
          key={service.path}
          to={service.path}
          className="block px-4 py-3 text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red hover:bg-light-gray dark:hover:bg-warm-gray transition-colors"
          onClick={scrollToTop}
        >
          {t(service.name)}
        </Link>
      ))}
    </motion.div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-pure-white/95 dark:bg-pure-black/95 backdrop-blur-md ${isScrolled ? "shadow-lg" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo, Text và Hotline */}
          <div className="flex items-center gap-6">
            {/* Logo Container */}
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-4">
              {/* Logo Image */}
              
              
              {/* Text Column */}
              <div className="hidden lg:flex flex-col">
                <img 
                className="w-12 h-12 object-contain"
                src={droneIcon}
                alt="Hitek Flycam Logo"
              />
                <span className="font-bold text-sm text-pure-black dark:text-pure-white leading-tight">
                  HITEK FLYCAM
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
                ref={link.hasDropdown ? servicesDropdownRef : null}
              >
                {link.hasDropdown ? (
                  <div className="flex items-center cursor-pointer">
                    <Link
                      to={link.href}
                      className="text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red transition-colors font-medium"
                      onClick={link.onClick}
                    >
                      {link.name}
                    </Link>
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                    <AnimatePresence>
                      {isServicesOpen && renderServicesDropdown()}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red transition-colors font-medium"
                    onClick={link.onClick}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Controls và Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>

            {/* Mobile Controls và Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-pure-black dark:text-pure-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-in slide-in-from-top duration-200">
            {/* Mobile Logo Text */}
            <div className="px-4 pb-2">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-pure-black dark:text-pure-white">
                  HITEK FLYCAM
                </span>
                <span className="text-sm text-vibrant-red font-medium">
                  THE DRONE EXPERTS
                </span>
              </div>
            </div>

            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="flex items-center justify-between w-full px-4 py-2 text-left text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red hover:bg-light-gray dark:hover:bg-warm-gray rounded-md transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isMobileServicesOpen && (
                      <div className="pl-6 space-y-2">
                        {services.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            className="block px-4 py-2 text-sm text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red hover:bg-light-gray dark:hover:bg-warm-gray rounded-md transition-colors"
                            onClick={scrollToTop}
                          >
                            {t(service.name)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="block px-4 py-2 text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red hover:bg-light-gray dark:hover:bg-warm-gray rounded-md transition-colors"
                    onClick={scrollToTop}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Hotline Mobile */}
            <div className="px-4 py-2 flex items-center gap-2 border-t border-border mt-2 pt-4">
              <Phone className="w-5 h-5 text-vibrant-red" />
              <div className="text-sm font-medium text-vibrant-red">
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
