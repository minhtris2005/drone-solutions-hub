// components/contact/ContactForm.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import ContactFormFields from './ContactFormFields';
import ContactInfo from './ContactInfo';
import FormStatus from './FormStatus';
import SubmitButton from './SubmitButton';
import { ContactFormData } from '@/types/contact';
import { sendContactEmail } from '@/utils/emailService';

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Validation functions
  const validateName = (name: string) => {
    if (!name.trim()) return 'Họ tên là bắt buộc';
    if (name.length < 3) return 'Họ tên phải có ít nhất 3 ký tự';
    if (!/^[A-Za-zÀ-ỹ\s]+$/.test(name)) return 'Họ tên chỉ được chứa chữ cái và khoảng trắng';
    return '';
  };

  const validateCompany = (company: string) => {
    if (company && company.length < 3) return 'Tên công ty phải có ít nhất 3 ký tự';
    return '';
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return 'Email là bắt buộc';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email không hợp lệ';
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return 'Số điện thoại là bắt buộc';
    // Chấp nhận số điện thoại Việt Nam (bắt đầu bằng 0, 84, +84)
    const phoneRegex = /^(0|\+84|84)(\d{9,10})$/;
    const cleanedPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanedPhone)) return 'Số điện thoại không hợp lệ';
    return '';
  };

  const validateService = (service: string) => {
    // Trường service là optional nên không validate bắt buộc
    return '';
  };

  const validateLocation = (location: string) => {
    if (location && location.length < 3) return 'Địa điểm phải có ít nhất 3 ký tự';
    return '';
  };

  const validateMessage = (message: string) => {
    if (!message.trim()) return 'Nội dung là bắt buộc';
    if (message.length < 3) return 'Nội dung phải có ít nhất 3 ký tự';
    return '';
  };

  // Hàm validate từng trường
  const validateField = (fieldName: string, value: string) => {
    const validatorMap: Record<string, (value: string) => string> = {
      name: validateName,
      company: validateCompany,
      email: validateEmail,
      phone: validatePhone,
      service: validateService,
      location: validateLocation,
      message: validateMessage
    };
    
    const validator = validatorMap[fieldName];
    const error = validator ? validator(value) : '';
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    return error;
  };

  // Validate toàn bộ form khi submit
  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      company: validateCompany(formData.company),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      service: validateService(formData.service),
      location: validateLocation(formData.location),
      message: validateMessage(formData.message)
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  // Kiểm tra form có hợp lệ không
  const isFormValid = () => {
    return (
      validateName(formData.name) === '' &&
      validateEmail(formData.email) === '' &&
      validatePhone(formData.phone) === '' &&
      validateMessage(formData.message) === ''
    );
  };

  // Cleanup timeouts khi component unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let newValue = value;
    
    // Xử lý chỉ cho phép nhập chữ cái cho trường name
    if (name === 'name') {
      newValue = value.replace(/[^A-Za-zÀ-ỹ\s]/g, '');
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
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Debounced validation
    debouncedValidate(name, newValue);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation ngay lập tức cho select
    validateField(name, value);
  };

  // Hàm debounce validation
  const debouncedValidate = (fieldName: string, value: string) => {
    // Clear timeout cũ nếu có
    if (timeoutsRef.current[fieldName]) {
      clearTimeout(timeoutsRef.current[fieldName]);
    }

    // Nếu trường rỗng và chưa có giá trị trước đó, không cần debounce
    if (!value.trim()) {
      validateField(fieldName, value);
      return;
    }

    // Set timeout mới cho validation sau 200ms
    timeoutsRef.current[fieldName] = setTimeout(() => {
      validateField(fieldName, value);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear tất cả timeouts trước khi validate
    Object.values(timeoutsRef.current).forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });

    // Validate form ngay lập tức khi submit
    if (!validateForm()) {
      console.log('❌ Form có lỗi validation');
      return;
    }

    setIsLoading(true);
    setSubmitStatus('loading');

    try {
      console.log('🔄 Submitting form...');
      
      // Gửi email qua Supabase Edge Function
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ 
          name: '', 
          company: '', 
          email: '', 
          phone: '', 
          service: '', 
          location: '', 
          message: '' 
        });
        // Reset errors
        setErrors({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: '',
          location: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('❌ Form submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Gửi tin nhắn
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ContactFormFields 
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            onValidateField={validateField}
          />

          <FormStatus status={submitStatus} />
          <SubmitButton 
            isLoading={isLoading} 
            isValid={isFormValid()}
          />
          
          {/* Hiển thị trạng thái validation */}
          <div className="text-sm text-muted-foreground pt-2 border-t border-border">
            <p className="mb-1">Lưu ý:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Các trường có dấu * là bắt buộc</li>
              <li>Họ tên chỉ chấp nhận chữ cái và khoảng trắng</li>
            </ul>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <ContactInfo />
    </div>
  );
};

export default ContactForm;