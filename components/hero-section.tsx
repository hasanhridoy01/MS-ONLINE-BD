'use client';

import { useTheme } from '@/lib/theme-provider';
import { ArrowRight, Globe } from 'lucide-react';
import NewConnection from './NewConnection';

export default function HeroSection() {
  const { theme } = useTheme();

  const themeBackgroundClass = {
    orange: 'hero-orange-bg-image',
    blue: 'hero-blue-bg-image',
    dark: 'hero-dark-bg-image',
  }[theme];

  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center md:pt-56 pt-52 ${themeBackgroundClass}`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-[28px] md:text-[40px] lg:text-[40px] font-[400] tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 animate-gradient md:leading-[38px] leading-[28px] font-montserrat">
            Fast and Reliable <span className="text-primary">Internet</span>
          </h1>

          <h2 className="text-[28px] md:text-[40px] lg:text-[40px] font-[400] md:leading-[38px] leading-[28px] mb-6 font-montserrat">
            For Your <span className="text-primary">Home and Business</span>
          </h2>

          <p className="text-foreground/80 text-[14px] font-medium font-inter mb-6 max-w-lg">
            {process.env.NEXT_PUBLIC_COMPANY_NAME} delivers fast, reliable internet with personalized local
            support, ensuring seamless connectivity across the world.
          </p>

          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full text-sm mb-6">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-foreground/90 text-[14px] font-medium font-inter">
              The fastest IPv6 connection
            </span>
          </div>

          <button className="group bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-[8px] font-semibold text-base transition-all flex items-center gap-2 border border-primary/70">
            <NewConnection />
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
