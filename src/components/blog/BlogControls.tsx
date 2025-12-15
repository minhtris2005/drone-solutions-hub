import React from "react";
import { BlogControlsProps } from "./BlogTypes";

const BlogControls: React.FC<BlogControlsProps> = ({
  isAnimating,
  onPrev,
  onNext,
  onViewDetails,
  onViewAllPosts, // ĐÃ CÓ PROP NÀY
  currentPostId,
  prevBtnRef,
  nextBtnRef
}) => {
  return (
    <>
      {/* Container cho tất cả button - CANH TRÁI */}
      <div className="space-y-10 opacity-0 animate-showContent animation-delay-600">
        <div className="flex">
          {/* Single Button - XEM CHI TIẾT */}
          <div>
            <button
              onClick={(e) => onViewDetails(currentPostId, e)}
              className="mr-3 bg-[#d62323] text-black font-medium tracking-wider py-3 px-10 hover:bg-red-400 transition-colors text-lg min-w-[220px] text-left rounded-3xl"
              aria-label={`Xem chi tiết bài viết`}
            >
              XEM CHI TIẾT →
            </button>
          </div>
          {/* Nút XEM TẤT CẢ BÀI VIẾT - SỬA LẠI Ở ĐÂY */}
          <div>
            <button
              onClick={onViewAllPosts}
              className="bg-[#d62323] text-black font-medium tracking-wider py-3 px-10 hover:bg-red-400 transition-colors text-lg min-w-[220px] text-left rounded-3xl"
              aria-label={`Xem tất cả bài viết`}
            >
              XEM TẤT CẢ BÀI VIẾT
            </button>
          </div>
        </div>
        

        {/* Navigation Arrows - NẰM NGANG DƯỚI NÚT XEM CHI TIẾT */}
        <div className="flex items-center gap-4">
          <button
            ref={prevBtnRef}
            onClick={onPrev}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
            disabled={isAnimating}
            aria-label="Xem bài viết trước"
          >
            &lt;
          </button>
          
          <span className="text-white/70 text-sm">Chuyển bài</span>
          
          <button
            ref={nextBtnRef}
            onClick={onNext}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
            disabled={isAnimating}
            aria-label="Xem bài viết tiếp theo"
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogControls;