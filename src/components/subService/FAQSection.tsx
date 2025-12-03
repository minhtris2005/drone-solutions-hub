import { useState } from "react";
import { Plus, Minus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
  contactText?: string;
  contactButtonText?: string;
  backgroundColor?: string;
  cardBackground?: string;
  highlightColor?: string;
}

export default function FAQSection({
  title,
  faqs,
  contactText = "Vẫn còn thắc mắc? Liên hệ ngay với chúng tôi",
  contactButtonText = "Liên hệ tư vấn",
  backgroundColor = "bg-background",
  cardBackground = "bg-card",
  highlightColor = "text-primary",
}: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className={`py-16 md:py-24 ${backgroundColor}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tìm câu trả lời cho những thắc mắc thường gặp
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${cardBackground} rounded-xl border border-border/50 shadow-sm overflow-hidden transition-all duration-200 ${
                  openFaq === index ? "ring-1 ring-primary/20" : ""
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between"
                >
                  <div className="flex items-center w-full">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                      <span className="text-sm font-medium text-secondary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-grow text-left">
                      <span className="text-base md:text-lg font-semibold text-foreground">
                        {faq.question}
                      </span>
                    </div>
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
                
                {openFaq === index && (
                  <div className="px-5 pb-5 pt-2 border-t border-border/30">
                    <div className="pl-12">
                      <div className="bg-secondary/5 rounded-lg p-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center pt-4 border-t border-border/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 mb-6">
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              Cần hỗ trợ thêm?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {contactText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
              >
                {contactButtonText}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border hover:bg-secondary/10"
              >
                Xem thêm câu hỏi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
