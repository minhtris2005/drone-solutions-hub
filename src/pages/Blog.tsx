import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock, Search, ChevronRight, Eye, Filter, Tag, ChevronLeft, ChevronRight as ChevronRightIcon, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  // ================== SEO SCHEMA FUNCTIONS ==================
  
  // Tạo Organization Schema cho toàn bộ website
  const generateOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Hitek Flycam",
      "url": window.location.origin,
      "logo": `${window.location.origin}${Lg_flycam}`,
      "description": "Chuyên trang chia sẻ kiến thức, tin tức và đánh giá về công nghệ drone, flycam tại Việt Nam",
      "sameAs": [
        "https://facebook.com/hitekflycam",
        "https://youtube.com/hitekflycam"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+84-28-9995-9588",
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": "Vietnamese"
      },
      "founder": {
        "@type": "Person",
        "name": "Hitek Flycam Team"
      },
      "foundingDate": "2020",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ho Chi Minh City",
        "addressRegion": "Vietnam",
        "addressCountry": "VN"
      }
    };
  };

  // Tạo Breadcrumb Schema
  const generateBreadcrumbSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": window.location.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog Drone",
          "item": `${window.location.origin}/blog`
        }
      ]
    };
  };

  // Tạo Website Schema
  const generateWebsiteSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Hitek Flycam Blog",
      "url": window.location.origin,
      "description": "Blog chia sẻ kiến thức về drone, flycam, công nghệ chụp ảnh từ trên cao tại Việt Nam",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/blog?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "vi-VN",
      "copyrightYear": new Date().getFullYear(),
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Hitek Flycam"
      }
    };
  };

  // Tạo BlogPosting Schema cho từng bài viết
  const generateBlogPostSchema = (post: EnhancedBlogPost) => {
    const postUrl = `${window.location.origin}/blog/${post.id}`;
    const postImage = post.image || fallbackImages[0];
    const readTimeMinutes = parseInt(post.readTime.replace(' phút', '')) || 5;
    const publishDate = post.created_at || post.date;
    const modifiedDate = post.updated_at || publishDate;
    
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.content?.substring(0, 160) || "Bài viết về drone và công nghệ flycam tại Việt Nam",
      "image": postImage,
      "datePublished": publishDate,
      "dateModified": modifiedDate,
      "author": {
        "@type": "Person",
        "name": post.author || "Hitek Flycam Team",
        "url": window.location.origin
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hitek Flycam",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}${Lg_flycam}`,
          "width": "200",
          "height": "200"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl
      },
      "url": postUrl,
      "articleSection": post.category,
      "keywords": post.tags ? post.tags.join(", ") : "drone, flycam, công nghệ, quay phim, chụp ảnh, UAV, việt nam",
      "wordCount": post.content ? post.content.split(/\s+/).length : 0,
      "timeRequired": `PT${readTimeMinutes}M`,
      "thumbnailUrl": postImage,
      "isAccessibleForFree": true,
      "inLanguage": "vi-VN",
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": {
          "@type": "ViewAction"
        },
        "userInteractionCount": post.views || 0
      },
      "commentCount": post.comments || 0
    };
  };

  // Tạo CollectionPage Schema cho trang blog tổng
  const generateCollectionPageSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Blog Drone - Kiến thức & Tin tức | Hitek Flycam",
      "description": "Tổng hợp bài viết, tin tức, đánh giá và hướng dẫn về công nghệ drone, flycam tại Việt Nam",
      "url": window.location.href,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": filteredPosts.length,
        "itemListElement": filteredPosts.slice(0, 10).map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "url": `${window.location.origin}/blog/${post.id}`,
            "name": post.title,
            "description": post.excerpt || "",
            "datePublished": post.created_at || post.date
          }
        }))
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": window.location.origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${window.location.origin}/blog`
          }
        ]
      }
    };
  };

  // Tạo Blog Schema tổng
  const generateBlogSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Hitek Flycam Blog",
      "description": "Chuyên trang tin tức và kiến thức về drone, flycam tại Việt Nam",
      "url": `${window.location.origin}/blog`,
      "publisher": {
        "@type": "Organization",
        "name": "Hitek Flycam",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}${Lg_flycam}`,
          "width": "200",
          "height": "200"
        }
      },
      "blogPost": filteredPosts.slice(0, 10).map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `${window.location.origin}/blog/${post.id}`,
        "datePublished": post.created_at || post.date,
        "author": {
          "@type": "Person",
          "name": post.author || "Hitek Flycam"
        },
        "articleSection": post.category
      })),
      "inLanguage": "vi-VN",
      "isFamilyFriendly": true,
      "copyrightYear": new Date().getFullYear()
    };
  };

  // Tạo FAQ Schema cho phần hỏi đáp thường gặp
  const generateFAQSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Blog Hitek Flycam viết về chủ đề gì?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blog Hitek Flycam chuyên chia sẻ kiến thức, tin tức, đánh giá và hướng dẫn về công nghệ drone, flycam, kỹ thuật bay và ứng dụng thực tiễn tại Việt Nam. Chúng tôi cập nhật các thông tin mới nhất về thiết bị bay không người lái, kỹ thuật quay phim chụp ảnh từ trên cao, và các ứng dụng của drone trong đời sống."
          }
        },
        {
          "@type": "Question",
          "name": "Có những loại drone nào được đề cập trong blog?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chúng tôi đề cập đến đa dạng các loại drone từ drone chụp ảnh, quay phim chuyên nghiệp (DJI, Autel, Skydio), drone racing, đến drone công nghiệp, nông nghiệp và drone tự chế. Các hãng drone phổ biến như DJI, Parrot, Yuneec, Autel Robotics đều được đánh giá chi tiết."
          }
        },
        {
          "@type": "Question",
          "name": "Tần suất cập nhật bài viết mới là bao lâu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blog được cập nhật thường xuyên với ít nhất 3-5 bài viết mới mỗi tuần. Chúng tôi cập nhật tin tức công nghệ drone hàng ngày, đánh giá sản phẩm mới hàng tuần, và hướng dẫn kỹ thuật chi tiết hàng tháng."
          }
        },
        {
          "@type": "Question",
          "name": "Tôi có thể tìm bài viết theo chủ đề nào?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blog có các chủ đề chính: Đánh giá sản phẩm, Hướng dẫn kỹ thuật, Tin tức công nghệ, Pháp lý drone, Ứng dụng thực tế, Kinh nghiệm bay, Bảo trì sửa chữa, và So sánh sản phẩm. Bạn có thể sử dụng bộ lọc theo danh mục để tìm bài viết phù hợp."
          }
        },
        {
          "@type": "Question",
          "name": "Blog có hướng dẫn xin giấy phép bay drone không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Có, chúng tôi có chuyên mục về pháp lý drone với đầy đủ hướng dẫn xin giấy phép bay tại Việt Nam, các quy định về độ cao, khu vực cấm bay, thủ tục hành chính và kinh nghiệm thực tế khi xin phép bay drone cho mục đích thương mại."
          }
        }
      ]
    };
  };

  // Tạo LocalBusiness Schema
  const generateLocalBusinessSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Hitek Flycam",
      "image": `${window.location.origin}${Lg_flycam}`,
      "@id": window.location.origin,
      "url": window.location.origin,
      "telephone": "+84-28-9995-9588",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Đường ABC",
        "addressLocality": "Ho Chi Minh City",
        "postalCode": "700000",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.8231,
        "longitude": 106.6297
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      "priceRange": "$$",
      "sameAs": [
        "https://facebook.com/hitekflycam",
        "https://youtube.com/hitekflycam"
      ]
    };
  };

  // Function để thêm schema script vào head
  const addSchemaScript = (schemaData: any, id: string) => {
    // Xóa script cũ nếu tồn tại
    const oldScript = document.getElementById(id);
    if (oldScript) {
      oldScript.remove();
    }
    
    // Tạo script mới
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);
  };

  // Function xóa schema script
  const removeSchemaScript = (id: string) => {
    const script = document.getElementById(id);
    if (script) {
      script.remove();
    }
  };

  // ================== END SEO SCHEMA FUNCTIONS ==================

  // Thêm schema khi component mount
  useEffect(() => {
    // Thêm các schema cơ bản
    addSchemaScript(generateOrganizationSchema(), 'schema-organization');
    addSchemaScript(generateBreadcrumbSchema(), 'schema-breadcrumb');
    addSchemaScript(generateWebsiteSchema(), 'schema-website');
    addSchemaScript(generateLocalBusinessSchema(), 'schema-local-business');
    addSchemaScript(generateFAQSchema(), 'schema-faq');

    // Thêm schema cho blog và collection page
    setTimeout(() => {
      addSchemaScript(generateBlogSchema(), 'schema-blog');
      addSchemaScript(generateCollectionPageSchema(), 'schema-collection-page');
    }, 100);

    // Cleanup khi component unmount
    return () => {
      ['schema-organization', 'schema-breadcrumb', 'schema-website', 
       'schema-local-business', 'schema-faq', 'schema-blog', 
       'schema-collection-page'].forEach(id => {
        removeSchemaScript(id);
      });
    };
  }, []);

  // Thêm schema cho bài viết khi filteredPosts thay đổi
  useEffect(() => {
    // Xóa các schema bài viết cũ
    const oldPostScripts = document.querySelectorAll('[id^="schema-post-"]');
    oldPostScripts.forEach(script => script.remove());

    // Thêm schema cho 6 bài viết đầu tiên (hoặc tất cả nếu ít hơn 6)
    const postsToSchema = filteredPosts.slice(0, 6);
    postsToSchema.forEach((post, index) => {
      setTimeout(() => {
        addSchemaScript(generateBlogPostSchema(post), `schema-post-${post.id}`);
      }, index * 50); // Stagger để tránh blocking
    });
  }, [filteredPosts]);

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
        excerpt: post.excerpt || (post.content?.substring(0, 150) || '') + "...",
        updated_at: post.updated_at || post.created_at,
        comments: post.comments || 0
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
        (post.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
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
    setCurrentSlide(0);
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

  const nextSlide = () => {
    const maxSlides = Math.ceil(filteredPosts.length / postsPerRow) - 1;
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(filteredPosts.length / postsPerRow) - 1;
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
  const lineClampStyles = `
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 48px; /* Chiều cao tối thiểu cho 2 dòng */
  }
`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-gray-50/50 to-background dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      {/* Debug Schema Info (chỉ hiển thị trong development) */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg text-xs max-w-xs z-50 opacity-90 shadow-xl">
          <div className="font-bold mb-2 flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>SEO Schema Đã Thêm</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Organization Schema</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Website Schema</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>LocalBusiness Schema</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>FAQ Schema (5 câu hỏi)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>Blog Schema</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>{filteredPosts.length} BlogPosting Schemas</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-gray-700 text-gray-400">
            Kiểm tra: F12 → Elements → Tìm "application/ld+json"
          </div>
        </div>
      )} */}
      <style>{lineClampStyles}</style>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={Bg_flycam}
            alt="Nền drone chuyên nghiệp - Hitek Flycam Drone Services Việt Nam"
            className="w-full h-full object-cover"
            loading="eager"
            width="1920"
            height="1080"
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
            alt="Logo Hitek Flycam - Drone Camera Việt Nam"
            className="w-10 h-10 absolute inset-0 m-auto"
            loading="lazy"
            width="40"
            height="40"
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
            alt="Logo Flycam Hitek - Thiết bị bay không người lái UAV"
            className="w-10 h-10 absolute inset-0 m-auto"
            loading="lazy"
            width="40"
            height="40"
          />
        </motion.div>

        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1.5 }
          }}
          className="absolute bottom-32 left-1/4 hidden lg:block"
        >
          <Shield className="w-7 h-7 text-primary/30" aria-label="Bảo hành drone 2 năm chính hãng" />
        </motion.div>

        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 }
          }}
          className="absolute bottom-20 right-1/4 hidden lg:block"
        >
          <Zap className="w-6 h-6 text-primary/25" aria-label="Drone tốc độ cao 120km/h pin lâu" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto text-center"
          >
            {/* Logo với semantic markup */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
                <img
                  src={Lg_flycam}
                  alt="Logo Hitek Flycam - Chuyên drone Việt Nam uy tín"
                  className="relative w-32 h-32 md:w-48 md:h-48 object-contain mx-auto"
                  loading="eager"
                  width="192"
                  height="192"
                />
              </div>
            </motion.div>

            {/* Main Heading với SEO headings */}
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                <span className="block">BLOG DRONE</span>
                <span className="block text-2xl md:text-4xl lg:text-5xl text-primary mt-2">
                  Kiến thức & Tin tức Flycam
                </span>
              </h1>
              <meta itemProp="headline" content="Blog Drone - Kiến thức & Tin tức về Flycam tại Việt Nam" />
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="mb-10"
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Cập nhật tin tức mới nhất, đánh giá chuyên sâu và hướng dẫn chi tiết 
                về công nghệ drone, kỹ thuật bay và các ứng dụng thực tiễn tại Việt Nam.
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

      {/* Phần nội dung blog bên dưới */}
      <section className="min-h-screen py-20" itemScope itemType="https://schema.org/Blog">
        <meta itemProp="name" content="Hitek Flycam Blog" />
        <meta itemProp="description" content="Chuyên trang tin tức và kiến thức về drone, flycam tại Việt Nam" />
        <meta itemProp="url" content={window.location.href} />
        
        <div className="container mx-auto px-4">
          {/* Search và Filters Card */}
          <Card className="mb-8 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Box với ARIA label */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                  <Input
                    placeholder="Tìm kiếm bài viết về drone, flycam, UAV, camera bay..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-6 text-base rounded-2xl border-gray-300 dark:border-gray-700"
                    aria-label="Tìm kiếm bài viết trong blog drone Hitek Flycam Việt Nam"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  {/* Category Filter */}
                  <div className="w-full md:w-48">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="py-6" aria-label="Lọc theo danh mục drone">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" aria-hidden="true" />
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
                      <SelectTrigger className="py-6" aria-label="Sắp xếp bài viết drone">
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4" aria-hidden="true" />
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
                      aria-label="Xóa tất cả bộ lọc tìm kiếm bài viết drone"
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
                        aria-label={`Xóa tìm kiếm "${searchTerm}"`}
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
                        aria-label={`Xóa lọc danh mục ${categoryFilter}`}
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
                  {searchTerm ? `Kết quả tìm kiếm cho "${searchTerm}"` : "Bài viết mới nhất về Drone"}
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
                    <Search className="w-10 h-10 text-gray-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Không tìm thấy bài viết
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {searchTerm || categoryFilter !== "all" 
                      ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' 
                      : 'Sẽ sớm có bài viết mới về drone'}
                  </p>
                  {(searchTerm || categoryFilter !== "all") && (
                    <Button onClick={clearFilters} variant="outline" aria-label="Xóa tất cả bộ lọc tìm kiếm">
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
                    const postUrl = `/blog/${post.id}`;
                    
                    return (
                    <Card 
                      key={post.id} 
                      className="group overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full w-full md:w-[398px] flex-shrink-0 min-h-[460px] md:min-h-[480px]" // Thêm min-height cố định
                      itemScope
                      itemType="https://schema.org/BlogPosting"
                      itemProp="blogPost"
                    >
                      <link itemProp="url" href={`${window.location.origin}${postUrl}`} />
                      
                      <div className="relative">
                        <img
                          src={postImage}
                          alt={`${post.title} - Hình ảnh minh họa bài viết về drone flycam tại Việt Nam`}
                          className="w-[398px] h-[192px] object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          width="398"
                          height="192"
                          itemProp="image"
                        />
                        <Badge 
                          variant="secondary" 
                          className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                          itemProp="articleSection"
                        >
                          {post.category}
                        </Badge>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 
                          onClick={(e) => handlePostClick(e, post.id)}
                          className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
                          itemProp="headline"
                        >
                          <a href={postUrl} itemProp="url" className="hover:no-underline">
                            {post.title}
                          </a>
                        </h3>

                        <p 
                          className="text-muted-foreground mb-4 flex-grow" 
                          itemProp="description"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: '1.5rem',
                            maxHeight: '3rem' /* 2 dòng x 1.5rem */
                          }}
                        >
                          {post.excerpt || post.content?.substring(0, 150)}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-3">
                            <time 
                              className="flex items-center gap-1"
                              dateTime={post.created_at || post.date}
                              itemProp="datePublished"
                            >
                              <Calendar className="w-3 h-3" aria-hidden="true" />
                              {post.date || new Date(post.created_at || '').toLocaleDateString('vi-VN')}
                            </time>
                            <span className="flex items-center gap-1" itemProp="timeRequired">
                              <Clock className="w-3 h-3" aria-hidden="true" />
                              {post.readTime}
                            </span>
                          </div>
                          
                          <span 
                            className={`flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full transition-all ${isUpdating ? 'bg-primary/10' : ''}`}
                          >
                            <Eye className={`w-3 h-3 ${isUpdating ? 'animate-pulse' : ''}`} aria-hidden="true" />
                            <span className="font-medium">
                              {isUpdating ? '...' : post.views.toLocaleString()}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                            <span className="text-gray-600 dark:text-gray-400" itemProp="author">
                              <span itemProp="name">{post.author}</span>
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleReadMoreClick(e, post.id)}
                            disabled={isUpdating}
                            className="text-primary hover:text-primary/80 hover:bg-primary/5"
                            aria-label={`Đọc thêm bài viết về ${post.title}`}
                          >
                            {isUpdating ? (
                              <span className="flex items-center">
                                <span className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full" aria-hidden="true" />
                                Đang xử lý...
                              </span>
                            ) : (
                              <span className="flex items-center">
                                Đọc thêm
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                              </span>
                            )}
                          </Button>
                        </div>

                        {/* Hidden meta data for SEO */}
                        <meta itemProp="dateModified" content={post.updated_at || post.created_at || post.date} />
                        <meta itemProp="mainEntityOfPage" content={`${window.location.origin}${postUrl}`} />
                        {post.tags && post.tags.length > 0 && (
                          <meta itemProp="keywords" content={post.tags.join(", ")} />
                        )}
                        <meta itemProp="wordCount" content={post.content ? post.content.split(/\s+/).length.toString() : "0"} />
                        <meta itemProp="inLanguage" content="vi-VN" />
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
                      aria-label="Xem bài viết drone trước đó"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
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
                          aria-label={`Đến trang bài viết drone ${index + 1}`}
                          aria-current={index === currentSlide ? "page" : undefined}
                        />
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSlide}
                      className="h-10 w-10 rounded-full"
                      aria-label="Xem bài viết drone tiếp theo"
                    >
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
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