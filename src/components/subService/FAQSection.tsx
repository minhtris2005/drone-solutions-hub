import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
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
  backgroundColor = "bg-pure-white",
  cardBackground = "bg-card",
  highlightColor = "text-vibrant-red",
}: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className={`py-20 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">
            {title}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${cardBackground} rounded-2xl border border-border overflow-hidden`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-card/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-vibrant-red flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-vibrant-red flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              {contactText}
            </p>
            <Button size="lg" className="bg-vibrant-red hover:bg-vibrant-red/90">
              {contactButtonText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
