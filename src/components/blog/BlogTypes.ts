import { BlogPost } from "@/types";

export interface EnhancedBlogPost extends BlogPost {
  readTime: string;
  slug: string;
}

export interface BlogCarouselProps {
  currentPost: EnhancedBlogPost;
  currentIndex: number;
  backgroundImageRef: React.RefObject<HTMLImageElement>;
  getFallbackImage: (index: number) => string;
}

export interface ThumbnailCarouselProps {
  thumbnailPosts: Array<EnhancedBlogPost & { originalIndex: number }>;
  isAnimating: boolean;
  onThumbnailClick: (clickedIndex: number) => void;
  getFallbackImage: (index: number) => string;
  thumbnailContainerRef: React.RefObject<HTMLDivElement>;
}

export interface BlogControlsProps {
  isAnimating: boolean;
  onPrev: () => void;
  onNext: () => void;
  onViewDetails: (postId: string, e?: React.MouseEvent) => void;
  onViewAllPosts?: () => void; // THÊM PROP NÀY
  currentPostId: string;
  prevBtnRef: React.RefObject<HTMLButtonElement>;
  nextBtnRef: React.RefObject<HTMLButtonElement>;
}

export interface BlogContentProps {
  currentPost: EnhancedBlogPost;
  currentIndex: number;
  blogPostsLength: number;
}