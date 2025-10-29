"use client";

import React from "react";
import { useTheme } from "@/lib/theme-provider";

interface DynamicContextProps {
  title: string;
  content: string;
}

const DynamicContext = ({ title, content }: DynamicContextProps) => {
  const { theme } = useTheme();

  const themeBackgroundClass = {
    orange: "orange-body-background-color",
    blue: "blue-body-background-color",
    dark: "dark-body-background-color",
  }[theme];

  return (
    <div
      className={`md:py-24 py-20 transition-colors duration-300 ${themeBackgroundClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-primary">
            {title}
          </h1>
        </div>
        <div
          className="prose prose-lg max-w-none font-inter"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

    </div>
  );
};

export default DynamicContext;
