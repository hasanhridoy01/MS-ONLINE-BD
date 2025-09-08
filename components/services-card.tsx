import React from "react";
import { cn } from "@/lib/utils";

interface ServicesCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export default function ServicesCard({
  icon,
  title,
  description,
  link,
}: ServicesCardProps) {
  return (
    <div
      className={cn(
        "rounded-[8px] p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border bg-primary/10 border-primary/10"
      )}
    >
      <div className="w-16 h-16 mb-4 mx-auto">
        <img
          src={icon}
          alt={title}
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'/%3E%3C/svg%3E";
          }}
        />
      </div>

      <h4
        className={cn("text-[18px] font-semibold font-inter mb-3 text-center text-primary")}
      >
        {title}
      </h4>

      <p className="text-[14px] text-neutral-600 leading-relaxed mb-4 text-justify min-h-[60px]">
        {description.length > 120
          ? `${description.substring(0, 120)}...`
          : description}
      </p>

      {link !== "#" && (
        <a
          href={link}
          target={link.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={cn(
            "text-sm font-semibold font-inter inline-flex items-center gap-1 float-right text-primary/80"
          )}
        >
          External Link <span>→</span>
        </a>
      )}
    </div>
  );
}
