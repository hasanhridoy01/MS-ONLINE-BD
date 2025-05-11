import PackagesSection from '@/components/packages-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import ServicesSection from '@/components/services-section';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <PackagesSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}