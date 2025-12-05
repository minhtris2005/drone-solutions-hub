// components/contact/ContactFormFields.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormData } from "@/types/contact";
import { useEffect, useRef } from 'react';

interface ContactFormFieldsProps {
  formData: ContactFormData;
  errors: {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    location: string;
    message: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onValidateField: (fieldName: string, value: string) => void;
}

const ContactFormFields = ({ 
  formData, 
  errors, 
  onChange, 
  onSelectChange,
  onValidateField 
}: ContactFormFieldsProps) => {
  // Refs để lưu timeout cho từng trường
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Dữ liệu cho combobox dịch vụ
  const serviceOptions = [
    { value: '', label: 'Chọn dịch vụ...' },
    { value: 'sua-chua-drone', label: 'Sửa chữa drone' },
    { value: 'quay-flycam', label: 'Quay flycam' },
    { value: 'drone-trac-dia', label: 'Drone trắc địa' },
    { value: 'drone-van-chuyen', label: 'Drone vận chuyển' },
    { value: 'dich-vu-phep-bay', label: 'Dịch vụ phép bay' },
    { value: 'nhau-khau-drone', label: 'Nhập khẩu drone' },
    { value: 'khac', label: 'Dịch vụ khác' }
  ];

  // Hàm xử lý thay đổi với validation debounced
const handleChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  
  let newValue = value;
  
  // Xử lý chỉ cho phép nhập chữ cái cho trường name
if (name === 'name') {
  // KHÔNG filter gì cả - cho phép mọi ký tự
  newValue = value;
}
  
  // Xử lý tự động format số điện thoại
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
  
  // Gọi onChange callback
  onChange({
    ...e,
    target: {
      ...e.target,
      name,
      value: newValue
    }
  } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);

  // Debounced validation
  debouncedValidate(name, newValue);
};

  // Hàm xử lý thay đổi select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e);
    // Validation ngay lập tức cho select
    onValidateField(e.target.name, e.target.value);
  };

  // Hàm debounce validation
  const debouncedValidate = (fieldName: string, value: string) => {
    // Clear timeout cũ nếu có
    if (timeoutsRef.current[fieldName]) {
      clearTimeout(timeoutsRef.current[fieldName]);
    }

    // Nếu trường rỗng và chưa có giá trị trước đó, không cần debounce
    if (!value.trim()) {
      onValidateField(fieldName, value);
      return;
    }

    // Set timeout mới cho validation sau 200ms
    timeoutsRef.current[fieldName] = setTimeout(() => {
      onValidateField(fieldName, value);
    }, 200);
  };

  // Cleanup timeouts khi component unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <div className="space-y-2">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Họ và tên *
        </label>
        <Input 
          name="name"
          placeholder="Nhập họ và tên của bạn (chỉ chữ cái)" 
          value={formData.name}
          onChange={handleChangeWithValidation}
          required
          className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
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
      
      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Tên công ty
        </label>
        <Input 
          name="company"
          placeholder="Hitek" 
          value={formData.company}
          onChange={handleChangeWithValidation}
          className={errors.company ? 'border-red-500 focus-visible:ring-red-500' : ''}
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
      
      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email *
          </label>
          <Input 
            name="email"
            type="email" 
            placeholder="email@example.com" 
            value={formData.email}
            onChange={handleChangeWithValidation}
            required
            className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Số điện thoại *
          </label>
          <Input 
            name="phone"
            type="tel" 
            placeholder="0346124230" 
            value={formData.phone}
            onChange={handleChangeWithValidation}
            required
            className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Service & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Dịch vụ quan tâm
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleSelectChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {serviceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Địa điểm
          </label>
          <Input 
            name="location"
            placeholder="Hồ Chí Minh" 
            value={formData.location}
            onChange={handleChangeWithValidation}
            className={errors.location ? 'border-red-500 focus-visible:ring-red-500' : ''}
            maxLength={100}
          />
          <div className="flex justify-between items-center">
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
            <span className="text-xs text-muted-foreground mt-1 ml-auto">
              {formData.location.length}/100
            </span>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Nội dung *
        </label>
        <Textarea
          name="message"
          placeholder="Mô tả chi tiết yêu cầu của bạn..."
          rows={3}
          value={formData.message}
          onChange={handleChangeWithValidation}
          required
          className={errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}
          maxLength={1000}
        />
        <div className="flex justify-between items-center">
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
          <span className="text-xs text-muted-foreground mt-1 ml-auto">
            {formData.message.length}/1000
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactFormFields;