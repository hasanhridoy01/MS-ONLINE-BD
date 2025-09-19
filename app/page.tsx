import PackagesSection from '@/components/packages-section';
import ContactSection from '@/components/contact-section';
import ServicesSection from '@/components/services-section';
import TrustedSection from '@/components/trusted-section';
import HeroSection from '@/components/hero-section';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />
      <PackagesSection /> 
      <ServicesSection />
      {/* <TrustedSection /> */}
      <ContactSection />
    </main>
  );
}