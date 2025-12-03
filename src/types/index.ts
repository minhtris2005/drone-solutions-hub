export type UserRole = 'user' | 'admin'

export interface User {
  id: string
  email: string
  role: UserRole
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  category: string;
  author: string;
  status: 'published' | 'draft';
  date: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  // Thêm các trường mới
  readTime?: string;           // Thời gian đọc
  views?: number;              // Số lượt xem
  likes?: number;              // Số lượt thích
  slug?: string;               // URL slug
  tags?: string[];            // Tags
  featured?: boolean;         // Bài nổi bật
  metaDescription?: string;   // Meta description cho SEO
}
// export interface Document {
//   id?: string
//   title: string
//   description: string
//   category: string
//   status: 'published' | 'draft'
//   date?: string
//   file_url: string
//   file_name?: string
//   file_size?: string
//   file_type?: string
//   author?: string
//   user_id?: string
//   created_at?: string
//   download_count?: number // Thêm dòng này
// }