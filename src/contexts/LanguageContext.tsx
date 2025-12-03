import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.services': 'Dịch vụ',
    'nav.document': 'Tài liệu',
    'nav.blog': 'Blog',
    'nav.contact': 'Liên hệ',
    'services.droneRepair': 'Sửa chữa Drone',
    'services.surveyingDrone': 'Drone Trắc địa',
    'services.deliveryDrone': 'Drone Vận chuyển',
    'services.flightPermit': 'Dịch vụ Phép bay',
    'services.droneImport': 'Nhập khẩu Drone',
    'services.droneFilming': 'Quay Flycam',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.document': 'Documents',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'services.droneRepair': 'Drone Repair',
    'services.surveyingDrone': 'Surveying Drone',
    'services.deliveryDrone': 'Delivery Drone',
    'services.flightPermit': 'Flight Permit Service',
    'services.droneImport': 'Drone Import',
    'services.droneFilming': 'Drone Filming',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
