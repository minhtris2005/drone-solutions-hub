import { motion } from "framer-motion";
import { FileText, Download, Calendar, ExternalLink, Search, Filter, X, ChevronLeft, ChevronRight, Tag, ChevronDown, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import Bg_flycam from "@/assets/home/bg.png";
import Lg_flycam from "@/assets/logo/logo-flycam-hitek.png";

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  downloadCount: number;
  fileUrl: string;
  fileType: string;
  fileSize?: string;
  tags?: string[];
}

export default function Documents() {
  // Hero Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  } as const;

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  } as const;

  // Dữ liệu fix cứng
  const allDocuments: Document[] = [
    // ... (giữ nguyên dữ liệu documents)
    {
      id: 1,
      title: "Hướng dẫn sử dụng DJI Mavic 3",
      description: "Hướng dẫn chi tiết vận hành và bảo quản drone DJI Mavic 3",
      category: "Kỹ thuật",
      date: "15/03/2024",
      downloadCount: 245,
      fileUrl: "/documents/dji-mavic3-guide.pdf",
      fileType: "PDF",
      fileSize: "5.2 MB",
      tags: ["DJI", "Mavic 3", "Hướng dẫn"]
    },
    {
      id: 2,
      title: "Quy định bay không người lái tại Việt Nam 2024",
      description: "Cập nhật mới nhất về quy định bay UAV của Cục Hàng không Việt Nam",
      category: "Pháp lý",
      date: "10/03/2024",
      downloadCount: 189,
      fileUrl: "/documents/drone-regulations-vietnam.pdf",
      fileType: "PDF",
      fileSize: "3.8 MB",
      tags: ["Quy định", "Pháp luật", "UAV"]
    },
    {
      id: 3,
      title: "Catalog sản phẩm DJI 2024",
      description: "Danh mục đầy đủ các sản phẩm drone DJI mới nhất 2024",
      category: "Sản phẩm",
      date: "05/03/2024",
      downloadCount: 156,
      fileUrl: "/documents/dji-catalog-2024.pdf",
      fileType: "PDF",
      fileSize: "12.5 MB",
      tags: ["DJI", "Catalog", "Sản phẩm mới"]
    },
    {
      id: 4,
      title: "Hướng dẫn nhiếp ảnh bằng drone",
      description: "Kỹ thuật chụp ảnh và quay video chuyên nghiệp bằng drone",
      category: "Hướng dẫn",
      date: "01/03/2024",
      downloadCount: 312,
      fileUrl: "/documents/drone-photography-guide.pdf",
      fileType: "PDF",
      fileSize: "7.9 MB",
      tags: ["Nhiếp ảnh", "Quay phim", "Kỹ thuật"]
    },
    {
      id: 5,
      title: "Bảng giá dịch vụ thuê drone 2024",
      description: "Bảng giá các gói dịch vụ thuê drone chụp ảnh, quay phim",
      category: "Giá cả",
      date: "25/02/2024",
      downloadCount: 198,
      fileUrl: "/documents/drone-rental-prices.pdf",
      fileType: "PDF",
      fileSize: "2.1 MB",
      tags: ["Giá cả", "Thuê drone", "Dịch vụ"]
    },
    {
      id: 6,
      title: "Quy trình bảo trì định kỳ drone",
      description: "Hướng dẫn bảo trì và bảo dưỡng drone định kỳ",
      category: "Kỹ thuật",
      date: "20/02/2024",
      downloadCount: 134,
      fileUrl: "/documents/drone-maintenance.pdf",
      fileType: "PDF",
      fileSize: "4.3 MB",
      tags: ["Bảo trì", "Bảo dưỡng", "Kỹ thuật"]
    },
    {
      id: 7,
      title: "Hướng dẫn bay FPV cho người mới",
      description: "Tài liệu hướng dẫn bay FPV từ cơ bản đến nâng cao",
      category: "Hướng dẫn",
      date: "15/02/2024",
      downloadCount: 267,
      fileUrl: "/documents/fpv-beginner-guide.pdf",
      fileType: "PDF",
      fileSize: "6.7 MB",
      tags: ["FPV", "Người mới", "Hướng dẫn"]
    },
    {
      id: 8,
      title: "Chính sách bảo hành sản phẩm drone",
      description: "Điều khoản và điều kiện bảo hành các sản phẩm drone",
      category: "Pháp lý",
      date: "10/02/2024",
      downloadCount: 178,
      fileUrl: "/documents/warranty-policy.pdf",
      fileType: "PDF",
      fileSize: "3.5 MB",
      tags: ["Bảo hành", "Chính sách", "Pháp lý"]
    },
    {
      id: 9,
      title: "Tài liệu đào tạo pilot drone chuyên nghiệp",
      description: "Giáo trình đào tạo phi công drone chuyên nghiệp",
      category: "Đào tạo",
      date: "05/02/2024",
      downloadCount: 223,
      fileUrl: "/documents/pilot-training.pdf",
      fileType: "PDF",
      fileSize: "9.8 MB",
      tags: ["Đào tạo", "Pilot", "Chuyên nghiệp"]
    },
    {
      id: 10,
      title: "Hướng dẫn sửa chữa drone cơ bản",
      description: "Các bước sửa chữa lỗi thường gặp trên drone",
      category: "Kỹ thuật",
      date: "01/02/2024",
      downloadCount: 156,
      fileUrl: "/documents/drone-repair-guide.pdf",
      fileType: "PDF",
      fileSize: "5.6 MB",
      tags: ["Sửa chữa", "Khắc phục", "Kỹ thuật"]
    },
    {
      id: 11,
      title: "Báo cáo thị trường drone Việt Nam 2023",
      description: "Phân tích thị trường và xu hướng drone tại Việt Nam",
      category: "Báo cáo",
      date: "28/01/2024",
      downloadCount: 189,
      fileUrl: "/documents/drone-market-report.pdf",
      fileType: "PDF",
      fileSize: "8.4 MB",
      tags: ["Báo cáo", "Thị trường", "Xu hướng"]
    },
    {
      id: 12,
      title: "Hướng dẫn lập kế hoạch bay an toàn",
      description: "Quy trình lập kế hoạch và đánh giá rủi ro trước khi bay",
      category: "An toàn",
      date: "25/01/2024",
      downloadCount: 201,
      fileUrl: "/documents/flight-planning.pdf",
      fileType: "PDF",
      fileSize: "4.2 MB",
      tags: ["An toàn", "Kế hoạch bay", "Rủi ro"]
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedTag, setSelectedTag] = useState<string>("Tất cả");
  const [sortBy, setSortBy] = useState<"date" | "downloads" | "name">("date");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [docsPerRow, setDocsPerRow] = useState(3);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Lấy danh sách category duy nhất
  const categories = ["Tất cả", ...Array.from(new Set(allDocuments.map(doc => doc.category)))];
  
  // Lấy tất cả tags duy nhất
  const allTags = ["Tất cả", ...Array.from(new Set(allDocuments.flatMap(doc => doc.tags || [])))];

  useEffect(() => {
    updateDocsPerRow();
    window.addEventListener('resize', updateDocsPerRow);
    return () => window.removeEventListener('resize', updateDocsPerRow);
  }, []);

  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide]);

  const updateDocsPerRow = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setDocsPerRow(1);
    } else if (width < 1024) {
      setDocsPerRow(2);
    } else {
      setDocsPerRow(3);
    }
  };

  // Lọc tài liệu
  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = searchTerm === "" || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Tất cả" || doc.category === selectedCategory;
    
    const matchesTag = selectedTag === "Tất cả" || (doc.tags && doc.tags.includes(selectedTag));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Sắp xếp tài liệu
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "date":
        const dateA = a.date.split('/').reverse().join('-');
        const dateB = b.date.split('/').reverse().join('-');
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      case "downloads":
        return b.downloadCount - a.downloadCount;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleDownload = (doc: Document) => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`Đang tải: ${doc.title}`);
  };

  const handleView = (doc: Document) => {
    window.open(doc.fileUrl, '_blank', 'noopener,noreferrer');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Kỹ thuật': 'bg-blue-50 text-blue-700 border-blue-200',
      'Pháp lý': 'bg-green-50 text-green-700 border-green-200',
      'Sản phẩm': 'bg-purple-50 text-purple-700 border-purple-200',
      'Hướng dẫn': 'bg-orange-50 text-orange-700 border-orange-200',
      'Giá cả': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Đào tạo': 'bg-pink-50 text-pink-700 border-pink-200',
      'Báo cáo': 'bg-teal-50 text-teal-700 border-teal-200',
      'An toàn': 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tất cả");
    setSelectedTag("Tất cả");
    setCurrentSlide(0);
  };

  // Navigation functions
  const nextSlide = () => {
    const maxSlides = Math.ceil(sortedDocuments.length / docsPerRow) - 1;
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(sortedDocuments.length / docsPerRow) - 1;
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(maxSlides);
    }
  };

  const scrollToSlide = (slideIndex: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 24;
      const scrollPosition = (cardWidth + gap) * slideIndex * docsPerRow;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const totalDownloads = allDocuments.reduce((sum, doc) => sum + doc.downloadCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-gray-50/50 to-background dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      {/* Hero Section chiếm full màn hình */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={Bg_flycam}
            alt="Drone Background"
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-primary/10 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
        </div>

        {/* Floating Drone Elements */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-30 left-10 hidden lg:block"
        >
          <div className="w-8 h-8 bg-primary/20 rounded-full blur-sm" />
          <img
            src={Lg_flycam}
            alt="Flycam Logo"
            className="w-10 h-10 absolute inset-0 m-auto"
          />
        </motion.div>
        
        <motion.div
          animate={{
            ...floatingAnimation,
            y: [5, -5, 5],
            transition: { ...floatingAnimation.transition, delay: 1 }
          }}
          className="absolute top-1/3 right-20 hidden lg:block"
        >
          <div className="w-10 h-10 bg-primary/15 rounded-full blur-sm" />
          <img
            src={Lg_flycam}
            alt="Flycam Logo"
            className="w-10 h-10 absolute inset-0 m-auto"
          />
        </motion.div>

        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1.5 }
          }}
          className="absolute bottom-32 left-1/4 hidden lg:block"
        >
          <Shield className="w-7 h-7 text-primary/30" />
        </motion.div>

        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 }
          }}
          className="absolute bottom-20 right-1/4 hidden lg:block"
        >
          <Zap className="w-6 h-6 text-primary/25" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
                <img
                  src={Lg_flycam}
                  alt="Hitek Flycam Logo"
                  className="relative w-32 h-32 md:w-48 md:h-48 object-contain mx-auto"
                />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                <span className="block">THƯ VIỆN TÀI LIỆU</span>
                <span className="block text-2xl md:text-4xl lg:text-5xl text-primary mt-2">
                  Drone & Công nghệ
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="mb-10"
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Khám phá bộ sưu tập tài liệu chuyên sâu, hướng dẫn chi tiết và tài nguyên hữu ích 
                về công nghệ drone, kỹ thuật bay và dịch vụ chuyên nghiệp.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto"
            >
              {[
                { number: allDocuments.length.toString(), label: "Tài liệu" },
                { number: totalDownloads.toLocaleString(), label: "Lượt tải" },
                { number: (categories.length - 1).toString(), label: "Danh mục" },
                { number: (allTags.length - 1).toString(), label: "Thẻ phân loại" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border"
                >
                  <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Phần nội dung tài liệu bên dưới */}
      <section className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Search và Filters Card */}
          <Card className="mb-8 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Box */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Tìm kiếm tài liệu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-6 text-base rounded-2xl border-gray-300 dark:border-gray-700"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  {/* Category Filter */}
                  <div className="w-full md:w-48">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="py-6">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <SelectValue placeholder="Danh mục" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tag Filter */}
                  <div className="w-full md:w-48">
                    <Select value={selectedTag} onValueChange={setSelectedTag}>
                      <SelectTrigger className="py-6">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <SelectValue placeholder="Thẻ" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {allTags.map(tag => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort Filter */}
                  <div className="w-full md:w-48">
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger className="py-6">
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          <SelectValue placeholder="Sắp xếp" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Mới nhất</SelectItem>
                        <SelectItem value="downloads">Nhiều lượt tải</SelectItem>
                        <SelectItem value="name">Theo tên A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  {(searchTerm || selectedCategory !== "Tất cả" || selectedTag !== "Tất cả") && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="py-6"
                    >
                      Xóa bộ lọc
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || selectedCategory !== "Tất cả" || selectedTag !== "Tất cả") && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Đang lọc:</span>
                  {searchTerm && (
                    <Badge variant="secondary" className="gap-2">
                      Tìm: "{searchTerm}"
                      <button 
                        onClick={() => setSearchTerm("")} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedCategory !== "Tất cả" && (
                    <Badge variant="secondary" className="gap-2">
                      Danh mục: {selectedCategory}
                      <button 
                        onClick={() => setSelectedCategory("Tất cả")} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedTag !== "Tất cả" && (
                    <Badge variant="secondary" className="gap-2">
                      Thẻ: {selectedTag}
                      <button 
                        onClick={() => setSelectedTag("Tất cả")} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {sortBy !== "date" && (
                    <Badge variant="secondary" className="gap-2">
                      Sắp xếp: {sortBy === "downloads" ? "Nhiều lượt tải" : "Theo tên A-Z"}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Phần nội dung tài liệu */}
          <div className="pb-20">
            {/* Kết quả tìm kiếm */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {searchTerm ? `Kết quả tìm kiếm cho "${searchTerm}"` : "Tài liệu mới nhất"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {sortedDocuments.length} tài liệu
                {selectedCategory !== "Tất cả" && ` trong danh mục "${selectedCategory}"`}
                {selectedTag !== "Tất cả" && ` với thẻ "${selectedTag}"`}
                {sortBy !== "date" && ` - Sắp xếp theo ${sortBy === "downloads" ? "nhiều lượt tải" : "tên A-Z"}`}
              </p>
            </div>

            {/* Grid tài liệu với horizontal scroll */}
            {sortedDocuments.length === 0 ? (
              <Card className="py-16">
                <CardContent className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Không tìm thấy tài liệu
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {searchTerm || selectedCategory !== "Tất cả" || selectedTag !== "Tất cả"
                      ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' 
                      : 'Sẽ sớm có tài liệu mới'}
                  </p>
                  {(searchTerm || selectedCategory !== "Tất cả" || selectedTag !== "Tất cả") && (
                    <Button onClick={clearFilters} variant="outline">
                      Xóa bộ lọc
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="relative">
                {/* Container với horizontal scroll */}
                <div 
                  ref={scrollContainerRef}
                  className="flex overflow-x-hidden scroll-smooth gap-6 pb-4"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {sortedDocuments.map((doc) => (
                    <Card 
                      key={doc.id} 
                      className="group overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full min-w-[300px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
                        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                            <FileText className="w-10 h-10 text-primary" />
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`absolute top-3 left-3 backdrop-blur-sm ${getCategoryColor(doc.category)}`}
                        >
                          {doc.category}
                        </Badge>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {doc.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow text-sm">
                          {doc.description}
                        </p>

                        {/* Tags */}
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {doc.tags.slice(0, 3).map(tag => (
                              <span 
                                key={tag} 
                                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {doc.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {doc.downloadCount.toLocaleString()} lượt
                            </span>
                          </div>
                          
                          <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            {doc.fileType} • {doc.fileSize}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                          <Button 
                            variant="default" 
                            className="flex-1"
                            onClick={() => handleDownload(doc)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Tải xuống
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleView(doc)}
                            title="Xem trước"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Navigation Buttons */}
                {sortedDocuments.length > docsPerRow && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevSlide}
                      className="h-10 w-10 rounded-full"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    {/* Dot indicators */}
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: Math.ceil(sortedDocuments.length / docsPerRow) }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentSlide 
                              ? 'w-8 bg-primary' 
                              : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                          }`}
                          aria-label={`Đến trang ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSlide}
                      className="h-10 w-10 rounded-full"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}