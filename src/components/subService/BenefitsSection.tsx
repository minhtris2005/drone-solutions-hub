import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface BenefitPart {
  text: string;
  bold?: boolean;
}

interface Benefit {
  icon: LucideIcon;
  parts: (string | BenefitPart)[];
}

interface BenefitsSectionProps {
  title: string;
  highlightedText?: string;
  benefits: Benefit[];
  imageUrl: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
  highlightColor?: string;
  iconColor?: string;
  subtitle?: string;
}

export default function BenefitsSection({
  title,
  highlightedText,
  benefits,
  imageUrl,
  imageAlt = "Benefits illustration",
  imagePosition = 'left',
  backgroundColor = "bg-background",
  highlightColor = "text-primary",
  iconColor = "bg-primary",
  subtitle,
}: BenefitsSectionProps) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className={`py-16 md:py-20 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            {title}
            {highlightedText && <span className={highlightColor}> {highlightedText}</span>}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Main Content - Two Columns */}
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isImageLeft ? '' : 'lg:flex-row-reverse'}`}>
          {/* Left Column - Image */}
          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-gray-700">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-auto object-cover rounded-2xl"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              </div>
            </div>
            
          </div>

          {/* Right Column - Benefits List */}
          <div className="lg:w-1/2">
            <div className="space-y-6 md:space-y-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 md:gap-6 group"
                >
                  {/* Icon Container */}
                  <div className="flex-shrink-0">
                    <div className={`relative w-12 h-12 md:w-14 md:h-14 ${iconColor} rounded-xl flex items-center justify-center shadow-lg`}>
                      <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      
                      {/* Step Number (Optional) */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-background dark:bg-gray-800 rounded-full border-2 border-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="bg-card dark:bg-gray-800/50 rounded-xl p-4 md:p-5 border border-border dark:border-gray-700 shadow-sm">
                      <p className="text-foreground dark:text-white leading-relaxed">
                        {benefit.parts.map((part, i) => 
                          typeof part === 'string' ? part : (
                            <span key={i} className="font-bold text-primary dark:text-primary-light">
                              {part.text}
                            </span>
                          )
                        )}
                      </p>
                    </div>
                    
                    {/* Connecting Line (except last item) */}
                    {index < benefits.length - 1 && (
                      <div className="ml-6 md:ml-7 mt-2 md:mt-3">
                        <div className="w-0.5 h-4 md:h-6 bg-gradient-to-b from-primary/30 to-transparent"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Stats or Additional Content (Optional) */}
      </div>
    </section>
  );
}
