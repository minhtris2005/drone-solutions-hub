// components/contact/ContactFormFields.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormData } from "@/types/contact";

interface ContactFormFieldsProps {
  formData: ContactFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactFormFields = ({ formData, onChange }: ContactFormFieldsProps) => {
  return (
    <div className="space-y-2">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Họ và tên *
        </label>
        <Input 
          name="name"
          placeholder="Nhập họ và tên của bạn" 
          value={formData.name}
          onChange={onChange}
          required
        />
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
          onChange={onChange}
        />
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
            onChange={onChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Số điện thoại *
          </label>
          <Input 
            name="phone"
            type="tel" 
            placeholder="0123 456 789" 
            value={formData.phone}
            onChange={onChange}
            required
          />
        </div>
      </div>

      {/* Service & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Dịch vụ quan tâm
          </label>
          <Input 
            name="service"
            placeholder="Ví dụ: Sửa chữa drone, Quay flycam..." 
            value={formData.service}
            onChange={onChange}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Địa điểm
          </label>
          <Input 
            name="location"
            placeholder="Hồ Chí Minh" 
            value={formData.location}
            onChange={onChange}
          />
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
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default ContactFormFields;
