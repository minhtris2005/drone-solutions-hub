// components/documents/DocumentCard.tsx
import { FileText, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Document } from "@/types/document";
import { useState } from "react";
import DocumentDownloadModal from "./DocumentDownloadModal";
import { sendDocumentDownload } from "@/utils/documentService";

interface DocumentCardProps {
  document: Document;
  onDownload?: (doc: Document) => void;
}

const DocumentCard = ({ document: doc, onDownload }: DocumentCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const handleSubmitInfo = async (userInfo: {
    name: string;
    phone: string;
    email: string;
    company: string;
  }) => {
    try {
      // Gửi thông tin tải tài liệu
      const result = await sendDocumentDownload({
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        company: userInfo.company,
        document: {
          id: doc.id?.toString() || '',
          title: doc.title,
          description: doc.description,
          file_url: doc.fileUrl || doc.file_url,
          file_type: doc.fileType || doc.file_type,
          file_size: doc.fileSize || doc.file_size
        }
      });

      if (result.success) {
        console.log('✅ Document download recorded successfully');
        
        // Tải file về máy
        if (doc.fileUrl || doc.file_url) {
          const fileUrl = doc.fileUrl || doc.file_url;
          console.log('📥 Downloading file:', fileUrl);
          
          // Tạo link tải ẩn
          const link = document.createElement('a');
          link.href = fileUrl!;
          link.download = doc.title.replace(/\s+/g, '_') + '.' + (doc.fileType || doc.file_type || 'pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Gọi callback nếu có
          if (onDownload) {
            onDownload(doc);
          }
        }
        
        return result;
      } else {
        throw new Error(result.error || 'Failed to send document download info');
      }
    } catch (error) {
      console.error('❌ Error in document download:', error);
      throw error;
    }
  };

  return (
    <>
      <Card className="group relative overflow-hidden border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col h-full">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />
        
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
        
        {/* Header with Icon */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 p-6">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl rounded-full" />
              
              {/* Icon Container */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                <FileText className="w-10 h-10 text-purple-600 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6 flex flex-col flex-grow space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {doc.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-grow">
            {doc.description}
          </p>

          {/* File info */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {doc.fileType || doc.file_type && (
              <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded">
                {doc.fileType || doc.file_type}
              </span>
            )}
            {doc.fileSize || doc.file_size && (
              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
                {doc.fileSize || doc.file_size}
              </span>
            )}
          </div>

          {/* Download Count */}
          {doc.downloadCount !== undefined && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <Download className="w-3 h-3 inline-block mr-1" />
              {doc.downloadCount} lượt tải
            </div>
          )}

          {/* Action Button */}
          <Button 
            variant="default" 
            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
            onClick={handleViewDetails}
          >
            Tải tài liệu
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform duration-300" />
          </Button>
        </CardContent>

        {/* Hover Indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:w-3/4 group-hover:opacity-100 transition-all duration-500" />
      </Card>

      {/* Modal nhập thông tin */}
      <DocumentDownloadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitInfo}
        document={doc}
      />
    </>
  );
};

export default DocumentCard;