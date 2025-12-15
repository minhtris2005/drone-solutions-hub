import React from "react";
import { ThumbnailCarouselProps } from "./BlogTypes";
import { useNavigate } from "react-router-dom";

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  thumbnailPosts,
  isAnimating,
  onThumbnailClick,
  getFallbackImage,
  thumbnailContainerRef
}) => {
  const navigate = useNavigate();

  // Hàm xử lý click vào thumbnail
  const handleThumbnailClick = (postId: string, originalIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAnimating) return;
    
    // Điều hướng đến trang chi tiết blog luôn
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="thumbnail-section absolute bottom-8 right-8 z-20">
      {/* Tiêu đề "Các bài viết nổi bật" */}
      <div className="text-white mb-4">
        <h3 className="text-xl font-bold">CÁC BÀI VIẾT NỔI BẬT</h3>
        <div className="w-16 h-1 bg-[#d62323] mt-2"></div>
      </div>
      
      <div 
        ref={thumbnailContainerRef}
        className="thumbnail flex gap-3 overflow-x-auto px-2 py-2"
        aria-label="Các bài viết khác"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#ef4444 transparent',
          maxWidth: '50vw',
        }}
      >
        {thumbnailPosts.map((post) => (
          <article
            key={post.id}
            data-post-id={post.id}
            className="item w-36 h-48 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative"
            onClick={(e) => handleThumbnailClick(post.id, post.originalIndex, e)}
            aria-label={`Bài viết: ${post.title}`}
          >
            <img
              src={post.image || getFallbackImage(post.originalIndex)}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
              <h2 className="title text-white font-bold text-sm line-clamp-2">
                {post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}
              </h2>
              <div className="des text-white/80 text-xs mt-1">
                {post.category}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* CSS cho scrollbar và thumbnail-section */}
      <style>{`
        .thumbnail::-webkit-scrollbar {
          height: 6px;
        }
        .thumbnail::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .thumbnail::-webkit-scrollbar-thumb {
          background: #ef4444;
          border-radius: 3px;
        }
        .thumbnail::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
        
        .thumbnail-section {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          padding: 16px;
          border-radius: 12px;
        }
        
        @media (max-width: 768px) {
          .thumbnail-section {
            right: 4px;
            bottom: 4px;
            max-width: 80vw;
            padding: 12px;
          }
          
          .thumbnail {
            max-width: 70vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ThumbnailCarousel;