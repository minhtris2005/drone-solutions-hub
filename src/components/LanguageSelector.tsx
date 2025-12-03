import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        className="text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red"
      >
        <Globe className="h-5 w-5" />
      </Button>
      <span className="text-sm font-medium text-pure-black dark:text-pure-white">
        {language === 'vi' ? 'VN' : 'EN'}
      </span>
    </div>
  );
}
