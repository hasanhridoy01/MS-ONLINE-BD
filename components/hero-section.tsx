import { ArrowRight, Globe } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative md:mt-44 mt-36 py-28 mb-10 overflow-hidden bg-gradient-to-b from-background to-background/90 transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-[28px] md:text-[40px] lg:text-[40px] font-[400] tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 animate-gradient md:leading-[38px] leading-[28px] font-montserrat">
            Fast and Reliable <span className="text-primary">Internet</span>
          </h1>

          <h2 className="text-[28px] md:text-[40px] lg:text-[40px] font-[400] md:leading-[38px] leading-[28px] mb-6 font-montserrat">
            For Your <span className="text-primary">Home and Business</span>
          </h2>

          <p className="text-foreground/80 text-[14px] font-medium font-inter mb-6 max-w-lg">
            NetConnect delivers fast, reliable internet with personalized local
            support, ensuring seamless connectivity across the world.
          </p>

          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full text-sm mb-6">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-foreground/90 text-[14px] font-medium font-inter">
              The fastest IPv6 connection
            </span>
          </div>

          <button className="group bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-[8px] font-semibold text-base transition-all flex items-center gap-2 border border-primary/70">
            Get a new connection NOW!
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
