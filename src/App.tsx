import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext' // Thêm import này
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Import public pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Documents from "./pages/Documents";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/blog/BlogDetail";
import Contact from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Import service pages
import DroneRepair from "@/pages/services/DroneRepair";
import SurveyingDrone from "@/pages/services/SurveyingDrone";
import DeliveryDrone from "@/pages/services/DeliveryDrone";
import DroneImport from "@/pages/services/DroneImport";
import FlightPermitService from "@/pages/services/FlightPermitService";
import DroneFilming from "@/pages/services/DroneFilming";

// Import admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import BlogManagement from "./pages/admin/BlogManagement";
import DocumentManagement from "./pages/admin/DocumentManagement";

const queryClient = new QueryClient();

// Component con để dùng useLocation
const AppContent = () => {
  const location = useLocation();

  // Chỉ hiện HeroSection trên những route này
  const showHeroOn = ["/", "/dich-vu"];
  const showHero = showHeroOn.includes(location.pathname);

  // Kiểm tra xem có phải là route admin không
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Kiểm tra có phải là trang đăng nhập admin không
  const isAdminLogin = location.pathname === '/admin/login';

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {/* Chỉ hiện FloatingVideo trên public routes, không hiện trên admin */}
      <Routes>
        {/* ========== ADMIN ROUTES ========== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/blog" element={
          <ProtectedRoute>
            <BlogManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/documents" element={
          <ProtectedRoute>
            <DocumentManagement />
          </ProtectedRoute>
        } />

        {/* ========== PUBLIC ROUTES ========== */}
        
        {/* Các route dịch vụ cụ thể */}
        <Route path="/services/drone-repair" element={<DroneRepair />} />
        <Route path="/services/surveying-drone" element={<SurveyingDrone />} />
        <Route path="/services/delivery-drone" element={<DeliveryDrone />} />
        <Route path="/services/drone-import" element={<DroneImport />} />
        <Route path="/services/flight-permit-service" element={<FlightPermitService />} />
        <Route path="/services/drone-filming" element={<DroneFilming />} />

        {/* Routes chính */}
        <Route path="/" element={<Home />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/dich-vu" element={<Services />} />
        <Route path="/dich-vu/:slug" element={<Services />} />
        <Route path="/tai-lieu" element={<Documents />} />
        <Route path="/blog" element={<Blog />} />
         {/* Trang chi tiết (QUAN TRỌNG) */}
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/lien-he" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        {/* Bọc ứng dụng bằng LanguageProvider */}
        <LanguageProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppContent />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
