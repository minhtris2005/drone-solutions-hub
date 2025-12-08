// components/documents/DocumentDownloadModal.tsx
import { useState, useEffect, useRef } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Loader2, FileText, CheckCircle } from "lucide-react";
import { Document } from "@/types/document";

interface DocumentDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userInfo: {
    name: string;
    phone: string;
    email: string;
    company: string;
  }) => Promise<void>;
  document: Document;
  onDownloadComplete?: () => void;
}

const DocumentDownloadModal = ({
  isOpen,
  onClose,
  onSubmit,
  document,
  onDownloadComplete
}: DocumentDownloadModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Refs để lưu timeout cho từng trường (GIỐNG ContactFormFields)
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Hàm validation GIỐNG HỆT ContactFormFields
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          return "Vui lòng nhập họ tên";
        }
        if (value.trim().length < 3) {
          return "Họ tên phải có ít nhất 3 ký tự";
        }
        // KHÔNG giới hạn chỉ nhập chữ cái (giống ContactFormFields)
        return "";
      
      case 'phone':
        if (!value.trim()) {
          return "Vui lòng nhập số điện thoại";
        }
        // Kiểm tra định dạng số điện thoại Việt Nam (giống ContactFormFields)
        const phoneRegex = /^(0[0-9]{9,10}|84[0-9]{9,10})$/;
        const cleanPhone = value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
          return "Số điện thoại không hợp lệ";
        }
        return "";
      
      case 'email':
        if (!value.trim()) {
          return "Vui lòng nhập email";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Email không hợp lệ";
        }
        return "";
      
      case 'company':
        // Company là tùy chọn, không bắt buộc validate (giống ContactFormFields)
        if (value.length > 100) {
          return "Tên công ty không được quá 100 ký tự";
        }
        return "";
      
      default:
        return "";
    }
  };

  // Hàm debounced validation GIỐNG HỆT ContactFormFields
  const debouncedValidate = (fieldName: string, value: string) => {
    // Clear timeout cũ nếu có
    if (timeoutsRef.current[fieldName]) {
      clearTimeout(timeoutsRef.current[fieldName]);
    }

    // Nếu trường rỗng, validate ngay lập tức (giống ContactFormFields)
    if (!value.trim()) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
      return;
    }

    // Set timeout mới cho validation sau 200ms (giống ContactFormFields)
    timeoutsRef.current[fieldName] = setTimeout(() => {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }, 200);
  };

  // Hàm xử lý thay đổi với validation debounced GIỐNG HỆT ContactFormFields
  const handleChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let newValue = value;
    
    // Xử lý tự động format số điện thoại GIỐNG HỆT ContactFormFields
    if (name === 'phone') {
      // Loại bỏ tất cả ký tự không phải số
      const numbers = value.replace(/\D/g, '');
      
      // Nếu bắt đầu bằng 84, giữ nguyên 84
      if (numbers.startsWith('84')) {
        newValue = numbers;
      } 
      // Nếu bắt đầu bằng 0, giữ nguyên 0
      else if (numbers.startsWith('0')) {
        newValue = numbers;
      }
      // Nếu không bắt đầu bằng gì cả nhưng có số
      else if (numbers) {
        newValue = '0' + numbers;
      } else {
        newValue = '';
      }
    }
    
    // Cập nhật form data
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Debounced validation GIỐNG HỆT ContactFormFields
    debouncedValidate(name, newValue);
  };

  // Cleanup timeouts khi component unmount (giống ContactFormFields)
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate từng trường (bắt buộc ngoại trừ company)
    const requiredFields = ['name', 'phone', 'email'];
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate company nếu có nhập
    if (formData.company.trim()) {
      const companyError = validateField('company', formData.company);
      if (companyError) {
        newErrors.company = companyError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      setIsSuccess(true);
      
      // Gọi callback nếu có
      if (onDownloadComplete) {
        onDownloadComplete();
      }
      
      // Tự động đóng modal sau 3 giây
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", phone: "", email: "", company: "" });
        setErrors({});
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadNow = () => {
    // Kiểm tra xem có đang chạy trong trình duyệt không
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.error('Cannot download file in non-browser environment');
      return;
    }

    // Tải file ngay lập tức
    if (document.fileUrl || document.file_url) {
      const fileUrl = document.fileUrl || document.file_url;
      const link = document.createElement('a');
      link.href = fileUrl!;
      link.download = document.title.replace(/\s+/g, '_') + '.' + (document.fileType || document.file_type || 'pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <div className="relative">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold mb-2">
                Tải thành công!
              </DialogTitle>
              <DialogDescription className="text-white/90">
                Tài liệu đang được tải về máy của bạn
              </DialogDescription>
            </div>
            
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{document.title}</h3>
              <p className="text-gray-600 mb-6">Đã được tải về thành công</p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700 font-medium">
                  ✅ Chúng tôi đã gửi xác nhận đến email của bạn
                </p>
                <p className="text-green-600 text-sm mt-2">
                  Đội ngũ chuyên gia sẽ liên hệ hỗ trợ bạn sớm nhất
                </p>
              </div>
              
              <Button 
                onClick={handleDownloadNow}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Download className="w-5 h-5 mr-2" />
                Tải lại tài liệu
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                Modal sẽ tự đóng sau 3 giây...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8" />
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    Tải tài liệu
                  </DialogTitle>
                  <DialogDescription className="text-white/80">
                    Vui lòng điền thông tin để tải tài liệu
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Document Info */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl mb-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {document.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {document.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {(document.fileType || document.file_type) && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium">
                        {document.fileType || document.file_type}
                      </span>
                    )}
                    {(document.fileSize || document.file_size) && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                        {document.fileSize || document.file_size}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Form Fields */}
              <div className="space-y-4">
                {/* Họ tên - GIỐNG HỆT ContactFormFields */}
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onChange={handleChangeWithValidation}
                    className={`h-12 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''} placeholder:text-gray-400`}
                    disabled={isLoading}
                    maxLength={50}
                  />
                  <div className="flex justify-between items-center">
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                    <span className="text-xs text-muted-foreground mt-1 ml-auto">
                      {formData.name.length}/50
                    </span>
                  </div>
                </div>

                {/* Số điện thoại - GIỐNG HỆT ContactFormFields */}
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0346124230"
                    value={formData.phone}
                    onChange={handleChangeWithValidation}
                    className={`h-12 ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}placeholder:text-gray-400`}
                    disabled={isLoading}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Email - GIỐNG HỆT ContactFormFields */}
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChangeWithValidation}
                    className={`h-12 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}placeholder:text-gray-400`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Tên công ty - GIỐNG HỆT ContactFormFields */}
                <div>
                  <Label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Tên công ty (tùy chọn)
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Nhập tên công ty của bạn"
                    value={formData.company}
                    onChange={handleChangeWithValidation}
                    className={`h-12 ${errors.company ? 'border-red-500 focus-visible:ring-red-500' : ''}placeholder:text-gray-400`}
                    disabled={isLoading}
                    maxLength={100}
                  />
                  <div className="flex justify-between items-center">
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                    )}
                    <span className="text-xs text-muted-foreground mt-1 ml-auto">
                      {formData.company.length}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="text-xs text-gray-500 text-center">
                <p>
                  Bằng việc tải tài liệu, bạn đồng ý với{" "}
                  <a href="/privacy" className="text-purple-600 hover:underline font-medium">
                    Chính sách bảo mật
                  </a>{" "}
                  của Hitek Flycam.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-12"
                  disabled={isLoading}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Tải xuống ngay
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDownloadModal;