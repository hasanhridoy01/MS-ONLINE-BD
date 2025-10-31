"use client";
import { useTheme } from "@/lib/theme-provider";
import { Download } from "lucide-react";

export default function Packages() {
  const { theme } = useTheme();

  const themeBackgroundClass = {
    orange: "orange-body-background-color",
    blue: "blue-body-background-color",
    dark: "dark-body-background-color",
  }[theme];

  const pdfUrl = "https://billing.msonlinebd.com/default/MS-Online-1.pdf";

  return (
    <section
      id="packages"
      className={`md:py-24 py-20 transition-colors duration-300 ${themeBackgroundClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-9">
          <h2 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-primary">
            BTRC Approved Packages
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter">
            Packages and rates at {process.env.NEXT_PUBLIC_COMPANY_NAME} BD are always very competitive and
            so they may change over time. Here is the present package list:
          </p>
        </div>

        {/* 📄 PDF Viewer Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
              <h3 className="font-inter font-semibold text-gray-800 text-sm md:text-base">
                MS Online - BTRC Approved Package List
              </h3>
              <a
                href={pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>

            {/* Iframe */}
            <div className="h-[500px] md:h-[700px]">
              <iframe
                src={pdfUrl}
                title="msonline PDF"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
