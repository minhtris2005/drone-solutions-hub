// app/contact/page.tsx
import ContactForm from '@/components/contact/ContactForm';
import ContactHero from '@/components/contact/ContactHero';

export const metadata = {
  title: 'Liên hệ - Hitek Flycam',
  description: 'Liên hệ với Hitek Flycam để được tư vấn và hỗ trợ các dịch vụ drone chuyên nghiệp',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <ContactHero />

          {/* Contact Form Section */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
