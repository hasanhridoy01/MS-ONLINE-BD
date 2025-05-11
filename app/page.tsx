import PackagesSection from '@/components/packages-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <PackagesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}