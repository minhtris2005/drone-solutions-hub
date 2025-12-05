// types/document.ts
export interface Document {
  id?: string | number;
  title: string;
  description: string;
  category: string;
  date?: string;
  status?: 'published' | 'draft';
  downloadCount?: number;
  download_count?: number;
  file_url?: string;
  fileUrl?: string;
  file_type?: string;
  fileType?: string;
  file_size?: string;
  fileSize?: string;
  file_name?: string;
  tags?: string[];
  author?: string;
  user_id?: string;
  created_at?: string;
}
