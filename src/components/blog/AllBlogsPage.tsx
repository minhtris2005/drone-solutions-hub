import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useNavigate } from "react-router-dom";
import { calculateReadTime, generateSlug } from "./BlogUtils";
import type { EnhancedBlogPost } from "./BlogTypes";

interface AllBlogsPageProps {
  getFallbackImage: (index: number) => string;
  onBack: () => void;
}

const AllBlogsPage: React.FC<AllBlogsPageProps> = ({ getFallbackImage, onBack }) => {
  const [allBlogs, setAllBlogs] = useState<EnhancedBlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        const postsWithDefaults: EnhancedBlogPost[] = data.map((post: any) => ({
          ...post,
          readTime: calculateReadTime(post.content || ''),
          slug: post.slug || generateSlug(post.title),
        }));
        setAllBlogs(postsWithDefaults);
      }
    } catch (error) {
      console.error('Error fetching all blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header với nút quay lại */}
        <div className="mb-8 md:mb-12">
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Quay lại đầu trang
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">TẤT CẢ BÀI VIẾT</h1>
          <div className="w-20 h-1 bg-[#d62323] mb-2"></div>
          <p className="text-gray-300">
            Khám phá tất cả {allBlogs.length} bài viết của chúng tôi
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d62323] mb-4"></div>
            <p className="text-gray-300">Đang tải tất cả bài viết...</p>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            {allBlogs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400">Chưa có bài viết nào.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {allBlogs.map((blog, index) => (
                  <article
                    key={blog.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-gray-800/70 border border-gray-700/50 flex flex-col h-full min-h-[500px] md:min-h-[550px]"
                    onClick={() => handleViewDetails(blog.id)}
                  >
                    {/* Blog Image */}
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={blog.image || getFallbackImage(index)}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Blog Content - FLEX GROW ĐỂ CHIẾM KHÔNG GIAN */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category và Read Time */}
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className="bg-[#d62323] text-black text-xs font-bold px-3 py-1 rounded-full">
                          {blog.category}
                        </div>
                        <span className="text-xs text-gray-400">
                          {blog.readTime} phút đọc
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold mb-3 line-clamp-2 flex-grow-0">
                        {blog.title}
                      </h2>

                      {/* Excerpt - CÓ THỂ GROW HOẶC KHÔNG */}
                      <div className="mb-4 flex-grow">
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                        </p>
                      </div>

                      {/* Meta Info - CỐ ĐỊNH Ở DƯỚI */}
                      <div className="mt-auto pt-4 border-t border-gray-700/50">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                              <span className="text-xs font-bold">👤</span>
                            </div>
                            <span className="font-medium">{blog.author || "Admin"}</span>
                          </div>
                          <span className="text-xs">
                            {new Date(blog.created_at).toLocaleDateString('vi-VN')}
                          </span>
                        </div>

                        {/* Read More Button - LUÔN Ở DƯỚI CÙNG */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(blog.id);
                          }}
                          className="w-full bg-gray-700/50 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors font-medium group"
                        >
                          <span className="flex items-center justify-center gap-2">
                            Đọc tiếp
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* Nút quay lại đầu trang */}
        <div className="mt-12 pt-8 border-t border-gray-700/50 flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors backdrop-blur-sm"
          >
            ↑ Quay lại đầu trang
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;