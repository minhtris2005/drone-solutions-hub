// types/document-download.ts
export interface DocumentDownload {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_company?: string;
  document_id?: string;
  document_title: string;
  document_description?: string;
  document_url?: string;
  document_type?: string;
  document_size?: string;
  download_count: number;
  download_at: string;
  admin_email_sent: boolean;
  user_email_sent: boolean;
  status: 'downloaded' | 'processed' | 'contacted';
  email_error_details?: any;
  created_at: string;
  updated_at: string;
}

export interface DocumentDownloadRequest {
  name: string;
  phone: string;
  email: string;
  company?: string;
  document: {
    id: string;
    title: string;
    description?: string;
    file_url?: string;
    file_type?: string;
    file_size?: string;
  };
}