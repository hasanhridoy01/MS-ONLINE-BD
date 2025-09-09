import PackagesSection from '@/components/packages-section';
import ContactSection from '@/components/contact-section';
import ServicesSection from '@/components/services-section';
import TrustedSection from '@/components/trusted-section';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <PackagesSection /> 
      <ServicesSection />
      {/* <TrustedSection /> */}
      <ContactSection />
     
    </main>
  );
}