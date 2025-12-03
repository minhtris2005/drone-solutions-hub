import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock, Search, ChevronRight, BookOpen, Eye, Heart, TrendingUp, Filter, Tag, BarChart, ChevronLeft, ChevronRight as ChevronRightIcon, Camera, Shield, Zap, Navigation, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/services/supabase";
import { BlogPost } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Bg_flycam from "@/assets/home/bg.png";
import Lg_flycam from "@/assets/logo/logo-flycam-hitek.png";

interface EnhancedBlogPost extends BlogPost {
  readTime: string;
  views: number;
  likes: number;
  slug: string;
}

export default function Blog() {
  // Hero Animation Variants - SỬA LỖI TYPE Ở ĐÂY
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

  // Blog State
  const [blogPosts, setBlogPosts] = useState<EnhancedBlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<EnhancedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [popularPosts, setPopularPosts] = useState<EnhancedBlogPost[]>([]);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Tính toán số lượng bài viết hiển thị mỗi lần dựa trên kích thước màn hình
  const [postsPerRow, setPostsPerRow] = useState(3);
  
  // Lấy danh sách categories từ posts
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  useEffect(() => {
    fetchBlogPosts();
    updatePostsPerRow();
    window.addEventListener('resize', updatePostsPerRow);
    return () => window.removeEventListener('resize', updatePostsPerRow);
  }, []);

  useEffect(() => {
    filterAndSortPosts();
    updatePopularPosts();
  }, [blogPosts, searchTerm, sortBy, categoryFilter]);

  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide]);

  const updatePostsPerRow = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setPostsPerRow(1);
    } else if (width < 1024) {
      setPostsPerRow(2);
    } else {
      setPostsPerRow(3);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const postsWithDefaults: EnhancedBlogPost[] = (data || []).map((post: any) => ({
        ...post,
        readTime: calculateReadTime(post.content || ''),
        views: post.views || 0,
        likes: post.likes || 0,
        slug: post.slug || generateSlug(post.title),
        tags: post.tags || [],
        excerpt: post.excerpt || (post.content?.substring(0, 150) || '') + "..."
      }));
      
      setBlogPosts(postsWithDefaults);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Lỗi tải bài viết');
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} phút`;
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  };

  const filterAndSortPosts = () => {
    let filtered = [...blogPosts];

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at || b.date || '').getTime() - 
                 new Date(a.created_at || a.date || '').getTime();
        case "popular":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
    setCurrentSlide(0); // Reset về slide đầu tiên khi filter thay đổi
  };

  const updatePopularPosts = () => {
    const popular = [...blogPosts]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);
    setPopularPosts(popular);
  };

  const incrementViewCount = async (postId: string) => {
    if (updatingIds.has(postId)) return;

    try {
      setUpdatingIds(prev => new Set(prev).add(postId));

      const currentPost = blogPosts.find(post => post.id === postId);
      if (!currentPost) return;

      const newViews = (currentPost.views || 0) + 1;
      
      await supabase
        .from('blog_posts')
        .update({ 
          views: newViews,
          updated_at: new Date().toISOString()
        })
        .eq('id', postId);

      setBlogPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, views: newViews } : post
      ));

      updatePopularPosts();

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const handleReadMoreClick = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    await incrementViewCount(postId);
    setTimeout(() => navigate(`/blog/${postId}`), 100);
  };

  const handlePostClick = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    await incrementViewCount(postId);
    setTimeout(() => navigate(`/blog/${postId}`), 100);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSortBy("newest");
  };

  // Navigation functions
  const nextSlide = () => {
    const maxSlides = Math.ceil(filteredPosts.length / postsPerRow) - 1;
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0); // Quay lại slide đầu
    }
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(filteredPosts.length / postsPerRow) - 1;
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(maxSlides); // Đến slide cuối
    }
  };

  const scrollToSlide = (slideIndex: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 24; // gap-6 tương đương 24px
      const scrollPosition = (cardWidth + gap) * slideIndex * postsPerRow;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Tính tổng số liệu
  const totalPosts = blogPosts.length;
  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const avgViews = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;
  const totalCategories = categories.length - 1;

  // Fallback images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

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
                <span className="block">BLOG DRONE</span>
                <span className="block text-2xl md:text-4xl lg:text-5xl text-primary mt-2">
                  Kiến thức & Tin tức
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="mb-10"
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Cập nhật tin tức mới nhất, đánh giá chuyên sâu và hướng dẫn chi tiết 
                về công nghệ drone, kỹ thuật bay và các ứng dụng thực tiễn.
              </p>
            </motion.div>

            {/* Stats - chỉ hiển thị khi có data */}
            {totalPosts > 0 && (
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto"
              >
                {[
                  { number: totalPosts.toString(), label: "Bài viết" },
                  { number: totalViews.toLocaleString(), label: "Lượt xem" },
                  { number: totalCategories.toString(), label: "Danh mục" }
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
            )}
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Phần nội dung blog bên dưới - bắt đầu sau khi scroll */}
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
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-6 text-base rounded-2xl border-gray-300 dark:border-gray-700"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  {/* Category Filter */}
                  <div className="w-full md:w-48">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="py-6">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <SelectValue placeholder="Danh mục" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả danh mục</SelectItem>
                        {categories
                          .filter(cat => cat !== "all")
                          .map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
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
                        <SelectItem value="newest">Mới nhất</SelectItem>
                        <SelectItem value="popular">Phổ biến nhất</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  {(searchTerm || categoryFilter !== "all" || sortBy !== "newest") && (
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
              {(searchTerm || categoryFilter !== "all" || sortBy !== "newest") && (
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
                  {categoryFilter !== "all" && (
                    <Badge variant="secondary" className="gap-2">
                      Danh mục: {categoryFilter}
                      <button 
                        onClick={() => setCategoryFilter("all")} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {sortBy !== "newest" && (
                    <Badge variant="secondary" className="gap-2">
                      Sắp xếp: Phổ biến nhất
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Phần nội dung bài viết */}
          <div className="pb-20">
            {/* Kết quả tìm kiếm và Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {searchTerm ? `Kết quả tìm kiếm cho "${searchTerm}"` : "Bài viết mới nhất"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {filteredPosts.length} bài viết
                  {categoryFilter !== "all" && ` trong danh mục "${categoryFilter}"`}
                  {sortBy !== "newest" && ` - Sắp xếp theo phổ biến nhất`}
                </p>
              </div>
            </div>

            {/* Grid bài viết với horizontal scroll */}
            {filteredPosts.length === 0 ? (
              <Card className="py-16">
                <CardContent className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Không tìm thấy bài viết
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {searchTerm || categoryFilter !== "all" 
                      ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' 
                      : 'Sẽ sớm có bài viết mới'}
                  </p>
                  {(searchTerm || categoryFilter !== "all") && (
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
                  {filteredPosts.map((post, index) => {
                    const postImage = post.image || fallbackImages[index % fallbackImages.length];
                    const isUpdating = updatingIds.has(post.id);
                    
                    return (
                      <Card 
                        key={post.id} 
                        className="group overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full min-w-[300px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={postImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <Badge 
                            variant="secondary" 
                            className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                          >
                            {post.category}
                          </Badge>
                        </div>

                        <CardContent className="p-6 flex flex-col flex-grow">
                          <h3 
                            onClick={(e) => handlePostClick(e, post.id)}
                            className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
                          >
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                            {post.excerpt || post.content?.substring(0, 150) + "..."}
                          </p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.date || new Date(post.created_at || '').toLocaleDateString('vi-VN')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime}
                              </span>
                            </div>
                            
                            <span className={`flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full transition-all ${isUpdating ? 'bg-primary/10' : ''}`}>
                              <Eye className={`w-3 h-3 ${isUpdating ? 'animate-pulse' : ''}`} />
                              <span className="font-medium">
                                {isUpdating ? '...' : post.views.toLocaleString()}
                              </span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center text-sm">
                              <User className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{post.author}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleReadMoreClick(e, post.id)}
                              disabled={isUpdating}
                              className="text-primary hover:text-primary/80 hover:bg-primary/5"
                            >
                              {isUpdating ? (
                                <span className="flex items-center">
                                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                                  Đang xử lý...
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  Đọc thêm
                                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                {/* Navigation Buttons */}
                {filteredPosts.length > postsPerRow && (
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
                      {Array.from({ length: Math.ceil(filteredPosts.length / postsPerRow) }).map((_, index) => (
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
                      <ChevronRightIcon className="h-5 w-5" />
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