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
  const [successMessage, setSuccessMessage] = useState('');
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Reset success message sau 10 giây
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setSuccessMessage('');
      }, 10000); // 10 giây
    
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Validation functions
const validateName = (name: string) => {
  if (!name.trim()) return 'Họ tên là bắt buộc';
  if (name.length < 3) return 'Họ tên phải có ít nhất 3 ký tự';
  // KHÔNG kiểm tra regex - cho phép tất cả ký tự
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
  
  // Các trường khác giữ nguyên
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
    setSuccessMessage('');

    try {
      console.log('🔄 Submitting form...');
      
      // Gửi email qua Supabase Edge Function
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setSuccessMessage('✅ Gửi thành công! Chúng tôi sẽ liên hệ lại sớm và đã gửi email xác nhận cho bạn.');
        
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
        setSuccessMessage('❌ Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('❌ Form submit error:', error);
      setSubmitStatus('error');
      setSuccessMessage('❌ Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.');
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

          {/* Thông báo thành công */}
          {submitStatus === 'success' && successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                  <p className="mt-1 text-sm text-green-600 opacity-75">
                    Email xác nhận đã được gửi tới {formData.email || 'email của bạn'}
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitStatus('idle');
                        setSuccessMessage('');
                      }}
                      className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                    >
                      <span className="sr-only">Đóng</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Thông báo lỗi */}
          {submitStatus === 'error' && successMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{successMessage}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitStatus('idle');
                        setSuccessMessage('');
                      }}
                      className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                    >
                      <span className="sr-only">Đóng</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <FormStatus status={submitStatus} />
          <SubmitButton 
            isLoading={isLoading} 
            isValid={isFormValid()}
          />
          
          {/* Hiển thị trạng thái validation */}
          {/* <div className="text-sm text-muted-foreground pt-2 border-t border-border">
            <p className="mb-1">Lưu ý:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Các trường có dấu * là bắt buộc</li>
              <li>Họ tên có thể nhập tiếng Việt có dấu</li>
              <li>Số điện thoại phải là số điện thoại Việt Nam hợp lệ</li>
            </ul>
          </div> */}
        </form>
      </div>

      {/* Contact Information */}
      <ContactInfo />
    </div>
  );
};

export default ContactForm;