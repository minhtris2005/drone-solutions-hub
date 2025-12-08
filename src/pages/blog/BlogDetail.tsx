import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/services/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Share2, Bookmark, Clock, User, Tag, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Các components riêng cho từng loại content
const HeadingBlock = ({ element, level }: any) => (
  <div className="relative group">
    <div 
      className={`font-bold text-gray-900 mb-6 mt-8 ${level === 'h1' ? 'text-3xl md:text-4xl' : level === 'h2' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
    <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <a href={`#${element.text?.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-red-500">
        #
      </a>
    </div>
  </div>
);

const ImageBlock = ({ element }: any) => (
  <figure className="my-8 group">
    <div className="overflow-hidden rounded-2xl">
      <img
        src={element.src}
        alt={element.alt || element.text || "Blog image"}
        className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-cover"
        loading="lazy"
      />
    </div>
    {element.text && (
      <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
        {element.text}
      </figcaption>
    )}
  </figure>
);

const TextBlock = ({ element }: any) => (
  <div 
    className="text-lg leading-relaxed text-gray-700 mb-6"
    dangerouslySetInnerHTML={{ __html: element.html }}
  />
);

const QuoteBlock = ({ element }: any) => (
  <blockquote className="border-l-4 border-red-500 pl-6 py-3 my-8 bg-gradient-to-r from-red-50 to-transparent">
    <div 
      className="text-xl italic text-gray-800"
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
  </blockquote>
);

const CodeBlock = ({ element }: any) => (
  <div className="my-8 relative group">
    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button size="sm" variant="outline" className="text-xs">
        Copy
      </Button>
    </div>
    <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm">
      <code dangerouslySetInnerHTML={{ __html: element.html }} />
    </pre>
  </div>
);

const TableBlock = ({ element }: any) => (
  <div className="my-8 overflow-x-auto rounded-xl border border-gray-200">
    <div 
      className="min-w-full divide-y divide-gray-200"
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
  </div>
);

const ListBlock = ({ element, isOrdered }: any) => (
  <div className={`my-6 ${isOrdered ? 'pl-6' : 'pl-5'}`}>
    <div 
      className="space-y-2"
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
  </div>
);

export default function BlogDetail() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    loadPost();
    incrementViewCount();
    loadRelatedPosts();
  }, [id]);

 const loadPost = async () => {
  try {
    let query = supabase
      .from("blog_posts")
      .select("*")
      .eq(id ? "id" : "slug", id || slug);

    // Nếu không phải admin, chỉ lấy bài published
    const { data: sessionData } = await supabase.auth.getSession();
    const isAdmin = sessionData.session?.user?.email?.includes('admin') || false;
    
    if (!isAdmin) {
      query = query.eq('status', 'published');
    }

    const { data, error } = await query.single();

    if (error) {
      console.error("Error loading post:", error);
      setPost(null);
      setLoading(false);
      return;
    }

    setPost(data);
    setLoading(false);
  } catch (error) {
    console.error("Error loading post:", error);
    setPost(null);
    setLoading(false);
  }
};

  const incrementViewCount = async () => {
    // Logic tăng view count
    setViewCount(prev => prev + 1);
  };

  const loadRelatedPosts = async () => {
    if (!post) return;
    
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .neq("id", post.id)
      .eq("category", post.category)
      .limit(3);
    
    setRelatedPosts(data || []);
  };

  const parsedContent = useMemo(() => {
    if (!post?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const elements = Array.from(doc.body.children);
    
    return elements.map((element, index) => {
      const html = element.outerHTML;
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent?.trim();
      const src = element.querySelector('img')?.getAttribute('src') || element.getAttribute('src');
      const alt = element.querySelector('img')?.getAttribute('alt') || element.getAttribute('alt');
      
      // Xác định loại block
      let type = 'text';
      if (['h1', 'h2', 'h3'].includes(tagName)) type = 'heading';
      else if (tagName === 'img' || html.includes('<img')) type = 'image';
      else if (tagName === 'table') type = 'table';
      else if (tagName === 'ul') type = 'list';
      else if (tagName === 'ol') type = 'orderedList';
      else if (tagName === 'blockquote') type = 'quote';
      else if (tagName === 'pre' || tagName === 'code') type = 'code';
      
      return {
        id: `block-${index}`,
        type,
        html: DOMPurify.sanitize(html),
        tagName,
        text,
        src,
        alt,
        level: tagName,
        isOrdered: tagName === 'ol'
      };
    });
  }, [post?.content]);

  const renderBlock = (block: any, index: number) => {
    const props = { element: block, key: block.id };
    
    switch (block.type) {
      case 'heading':
        return <HeadingBlock {...props} level={block.tagName} />;
      case 'image':
        return <ImageBlock {...props} />;
      case 'quote':
        return <QuoteBlock {...props} />;
      case 'code':
        return <CodeBlock {...props} />;
      case 'table':
        return <TableBlock {...props} />;
      case 'list':
        return <ListBlock {...props} isOrdered={false} />;
      case 'orderedList':
        return <ListBlock {...props} isOrdered={true} />;
      default:
        return <TextBlock {...props} />;
    }
  };

  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200); // 200 từ/phút
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8" />
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!post) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon cảnh báo */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Bài viết không tồn tại
        </h1>
        
        {/* Mô tả */}
        <p className="text-gray-600 mb-8 text-lg">
          Bài viết bạn đang tìm có thể đã bị xóa, chuyển sang chế độ nháp hoặc URL không chính xác.
        </p>
        
        {/* Nút hành động */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => navigate('/blog')}
            className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-6 text-lg"
            size="lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại trang blog
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="px-6 py-6 text-lg"
            size="lg"
          >
            Về trang chủ
          </Button>
        </div>
        
        {/* Thông tin bổ sung */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Gặp vấn đề? Liên hệ hỗ trợ:{" "}
            <a 
              href="mailto:support@hitekflycam.com" 
              className="text-red-600 hover:underline"
            >
              support@hitekflycam.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section với ảnh cover */}
      {post.image && (
        <div className="relative h-[400px] md:h-[500px] w-full">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/blog')}
                className="text-white hover:bg-white/20 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header nếu không có ảnh cover */}
        {!post.image && (
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </div>
        )}

        {/* Article Container */}
        <article className="bg-white rounded-2xl shadow-lg p-6 md:p-10 -mt-20 relative z-10">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
            <Badge variant="outline" className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {post.category}
            </Badge>
            
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.author}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime} phút đọc</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{viewCount} lượt xem</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl text-gray-600 mb-8 italic border-l-4 border-red-500 pl-4 py-2 bg-red-50/50">
              {post.excerpt}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-8 py-4 border-y">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Lưu lại
              </Button>
            </div>
            
            <div className="text-sm text-gray-500">
              Đăng ngày: {new Date(post.date || post.created_at).toLocaleDateString("vi-VN", {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Content Blocks */}
          <div className="prose prose-lg max-w-none">
            {parsedContent.map((block, index) => renderBlock(block, index))}
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {JSON.parse(post.tags || '[]').map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Về tác giả</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg">{post.author}</h4>
                <p className="text-gray-600 mt-2">
                  Tác giả chuyên viết về {post.category.toLowerCase()}. 
                  Đã xuất bản nhiều bài viết chất lượng trên blog này.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div 
                  key={related.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/blog/${related.id}`)}
                >
                  {related.image && (
                    <img 
                      src={related.image} 
                      alt={related.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {related.category}
                    </Badge>
                    <h3 className="font-bold line-clamp-2">{related.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section (nếu có) */}
        <div className="mt-12">
          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Bình luận (0)</TabsTrigger>
              <TabsTrigger value="share">Chia sẻ</TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
              <div className="bg-white rounded-xl p-6">
                <p className="text-center text-gray-500 py-8">
                  Tính năng bình luận đang được phát triển
                </p>
              </div>
            </TabsContent>
            <TabsContent value="share">
              <div className="bg-white rounded-xl p-6">
                <div className="flex justify-center gap-4">
                  <Button variant="outline">Facebook</Button>
                  <Button variant="outline">Twitter</Button>
                  <Button variant="outline">LinkedIn</Button>
                  <Button variant="outline">Copy Link</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}