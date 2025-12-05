import vi from './locales/vi.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import kr from './locales/kr.json';

export type Language = 'vi' | 'en' | 'ja' | 'kr';

export const translations = {
  vi,
  en,
  ja,
  kr,
} as const;

// Simplified type - accept any string to avoid deep recursion issues
export type TranslationKey = string;
