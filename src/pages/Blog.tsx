import { useEffect, useRef, useState } from "react";
import { supabase } from "@/services/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import {
  BlogCarousel,
  ThumbnailCarousel,
  BlogControls,
  BlogSEO,
  AllBlogsPage,
  EnhancedBlogPost,
  getFallbackImage,
  getDefaultPosts,
  calculateReadTime,
  generateSlug,
  createThumbnailClone
} from "@/components/blog";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<EnhancedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPostId, setNextPostId] = useState<string | null>(null);
  const [prevPostId, setPrevPostId] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false); // Thêm state cho nút back to top
  
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const allBlogsRef = useRef<HTMLDivElement>(null); // Ref để scroll đến

  // Fetch dữ liệu blog chính (6 bài đầu)
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Thêm scroll listener để hiện nút "Back to Top"
  useEffect(() => {
    const handleScroll = () => {
      if (allBlogsRef.current) {
        const rect = allBlogsRef.current.getBoundingClientRect();
        setShowBackToTop(rect.top < 0); // Nếu AllBlogsPage đã scroll lên trên viewport
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cập nhật next/prev post ID
  useEffect(() => {
    if (blogPosts.length > 0) {
      const nextIndex = (currentIndex + 1) % blogPosts.length;
      const prevIndex = currentIndex === 0 ? blogPosts.length - 1 : currentIndex - 1;
      setNextPostId(blogPosts[nextIndex]?.id || null);
      setPrevPostId(blogPosts[prevIndex]?.id || null);
    }
  }, [currentIndex, blogPosts]);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      
      if (data) {
        const postsWithDefaults: EnhancedBlogPost[] = data.map((post: any) => ({
          ...post,
          readTime: calculateReadTime(post.content || ''),
          slug: post.slug || generateSlug(post.title),
        }));
        setBlogPosts(postsWithDefaults);
      } else {
        setBlogPosts(getDefaultPosts());
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts(getDefaultPosts());
    } finally {
      setLoading(false);
    }
  };

  // Hàm scroll xuống AllBlogsPage
  const scrollToAllBlogs = () => {
    if (allBlogsRef.current) {
      allBlogsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Hàm scroll lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Hàm chuyển slide với hiệu ứng
  const showSlider = (type: 'next' | 'prev') => {
    if (isAnimating || blogPosts.length <= 1) return;
    
    setIsAnimating(true);

    const targetPostId = type === 'next' ? nextPostId : prevPostId;
    if (!targetPostId) return;

    // Vô hiệu hóa nút khi đang animate
    if (nextBtnRef.current) nextBtnRef.current.disabled = true;
    if (prevBtnRef.current) prevBtnRef.current.disabled = true;

    if (type === 'next') {
      const thumbnailClone = createThumbnailClone(thumbnailContainerRef, targetPostId, false);
      
      if (thumbnailClone && backgroundImageRef.current) {
        const bgRect = backgroundImageRef.current.getBoundingClientRect();
        
        requestAnimationFrame(() => {
          thumbnailClone.style.left = `${bgRect.left}px`;
          thumbnailClone.style.top = `${bgRect.top}px`;
          thumbnailClone.style.width = `${bgRect.width}px`;
          thumbnailClone.style.height = `${bgRect.height}px`;
          thumbnailClone.style.borderRadius = '0';
        });
        
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % blogPosts.length);
        }, 300);
        
        setTimeout(() => {
          thumbnailClone.remove();
          setIsAnimating(false);
          if (nextBtnRef.current) nextBtnRef.current.disabled = false;
          if (prevBtnRef.current) prevBtnRef.current.disabled = false;
        }, 600);
      } else {
        setCurrentIndex(prev => (prev + 1) % blogPosts.length);
        setTimeout(() => setIsAnimating(false), 300);
      }
    } else {
      if (!backgroundImageRef.current) return;
      
      const bgRect = backgroundImageRef.current.getBoundingClientRect();
      const currentPost = blogPosts[currentIndex];
      
      const bgClone = document.createElement('div');
      bgClone.style.position = 'fixed';
      bgClone.style.left = `${bgRect.left}px`;
      bgClone.style.top = `${bgRect.top}px`;
      bgClone.style.width = `${bgRect.width}px`;
      bgClone.style.height = `${bgRect.height}px`;
      bgClone.style.backgroundImage = `url(${currentPost.image || getFallbackImage(currentIndex)})`;
      bgClone.style.backgroundSize = 'cover';
      bgClone.style.backgroundPosition = 'center';
      bgClone.style.zIndex = '1000';
      bgClone.style.pointerEvents = 'none';
      bgClone.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      bgClone.style.borderRadius = '0';
      document.body.appendChild(bgClone);
      
      const thumbnailClone = createThumbnailClone(thumbnailContainerRef, '', true);
      
      if (thumbnailClone) {
        const thumbnailRect = thumbnailClone.getBoundingClientRect();
        const newIndex = currentIndex === 0 ? blogPosts.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        
        requestAnimationFrame(() => {
          bgClone.style.left = `${thumbnailRect.left}px`;
          bgClone.style.top = `${thumbnailRect.top}px`;
          bgClone.style.width = `${thumbnailRect.width}px`;
          bgClone.style.height = `${thumbnailRect.height}px`;
          bgClone.style.borderRadius = '12px';
          
          if (backgroundImageRef.current) {
            backgroundImageRef.current.style.opacity = '0';
          }
        });
        
        setTimeout(() => {
          bgClone.remove();
          thumbnailClone.remove();
          
          if (backgroundImageRef.current) {
            backgroundImageRef.current.style.opacity = '1';
          }
          
          setIsAnimating(false);
          if (nextBtnRef.current) nextBtnRef.current.disabled = false;
          if (prevBtnRef.current) prevBtnRef.current.disabled = false;
        }, 600);
      } else {
        setCurrentIndex(prev => prev === 0 ? blogPosts.length - 1 : prev - 1);
        setTimeout(() => setIsAnimating(false), 300);
      }
    }
  };

  // Xử lý click thumbnail
  const handleThumbnailClick = (clickedIndex: number) => {
    if (!isAnimating && clickedIndex !== currentIndex) {
      setCurrentIndex(clickedIndex);
    }
  };

  // Xử lý click xem chi tiết
  const handleViewDetails = (postId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate(`/blog/${postId}`);
  };

  // Lấy các bài viết cho thumbnail
  const getThumbnailPosts = () => {
    if (blogPosts.length <= 1) return [];
    const thumbnailPosts = [];
    
    for (let i = 1; i < blogPosts.length; i++) {
      const index = (currentIndex + i) % blogPosts.length;
      thumbnailPosts.push({
        ...blogPosts[index],
        originalIndex: index
      });
    }
    
    return thumbnailPosts;
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <Skeleton className="w-32 h-8 bg-gray-800" />
        <div className="text-white text-xl ml-4">Đang tải bài viết...</div>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Không có bài viết nào</div>
      </div>
    );
  }

  const currentPost = blogPosts[currentIndex];
  const thumbnailPosts = getThumbnailPosts();

  return (
    <div className="relative">
      {/* Phần Blog Carousel chính */}
      <div 
        ref={carouselRef}
        className="w-full h-screen overflow-hidden relative bg-black"
      >
        <BlogSEO 
          blogPosts={blogPosts}
          currentPost={currentPost}
          currentIndex={currentIndex}
        />

        <BlogCarousel
          currentPost={currentPost}
          currentIndex={currentIndex}
          blogPostsLength={blogPosts.length}
          backgroundImageRef={backgroundImageRef}
          getFallbackImage={getFallbackImage}
        >
          <BlogControls
            isAnimating={isAnimating}
            onPrev={() => showSlider('prev')}
            onNext={() => showSlider('next')}
            onViewDetails={handleViewDetails}
            onViewAllPosts={scrollToAllBlogs} // Scroll xuống AllBlogs
            currentPostId={currentPost.id}
            prevBtnRef={prevBtnRef}
            nextBtnRef={nextBtnRef}
          />
        </BlogCarousel>

        <ThumbnailCarousel
          thumbnailPosts={thumbnailPosts}
          isAnimating={isAnimating}
          onThumbnailClick={handleThumbnailClick}
          getFallbackImage={getFallbackImage}
          thumbnailContainerRef={thumbnailContainerRef}
        />
      </div>

      {/* Phần AllBlogsPage - LUÔN HIỆN */}
      <div ref={allBlogsRef} className="relative">
        <AllBlogsPage
          getFallbackImage={getFallbackImage}
          onBack={scrollToTop} // Scroll lên đầu trang
        />
      </div>

      {/* Nút Back to Top - chỉ hiện khi scroll xuống */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#d62323] text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors animate-bounce"
          aria-label="Quay lại đầu trang"
        >
          ↑
        </button>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes showContent {
          0% { opacity: 0; transform: translateY(30px); filter: blur(5px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-showContent { animation: showContent 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        
        img { transition: opacity 0.5s ease-in-out; }
        
        @media (max-width: 768px) {
          .thumbnail { 
            max-width: 70vw !important; 
            right: 4px !important; 
            bottom: 4px !important; 
          }
          
          .thumbnail .item { 
            width: 100px !important; 
            height: 140px !important; 
          }
          
          .title { 
            font-size: 2.2rem !important; 
            margin-bottom: 0.75rem !important;
          }
          
          .topic { 
            font-size: 1.75rem !important; 
            margin-bottom: 2rem !important;
          }
          
          .max-w-xs {
            max-width: 180px !important;
          }
          
          .px-12 {
            padding-left: 2rem !important;
            padding-right: 2rem !important;
          }
          
          .tracking-\[0\.5em\] {
            letter-spacing: 0.3em !important;
          }
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}