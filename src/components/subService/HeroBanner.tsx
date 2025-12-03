import { ReactNode } from "react";

interface HeroBannerProps {
  title: string;
  subtitle: string | ReactNode;
  backgroundImage: string;
  overlayOpacity?: number;
  overlayColor?: string;
  height?: string;
  titleSize?: string;
  subtitleSize?: string;
}

export default function HeroBanner({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.2,
  overlayColor = "black",
  height = "400px",
  titleSize = "text-6xl",
  subtitleSize = "text-2xl",
}: HeroBannerProps) {
  return (
    <div className="pt-20">
      <div className={`relative ${height} overflow-hidden`}>
        {/* Lớp bóng mờ màu đen */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(to right, ${overlayColor}, ${overlayColor})`,
            opacity: overlayOpacity 
          }} 
        />

        {/* Ảnh nền */}
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Nội dung ở giữa */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center px-4">
            <h1 className={`${titleSize} font-bold mb-4`}>{title}</h1>
            <div className={`${subtitleSize} opacity-90`}>{subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
