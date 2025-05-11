import React from "react";

interface ServicesCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  color?: "silver" | "gold" | "platinum" | "diamond";
}

const colorVariants = {
  silver: {
    bg: "bg-primary/10",
    accent: "text-primary",
    button: "border border-primary/40 text-primary hover:bg-primary/10",
  },
  gold: {
    bg: "bg-primary/10",
    accent: "text-primary",
    button: "border border-primary/40 text-primary hover:bg-primary/10",
  },
  platinum: {
    bg: "bg-primary/10",
    accent: "text-primary",
    button: "border border-primary/40 text-primary hover:bg-primary/10",
  },
  diamond: {
    bg: "bg-primary/10",
    accent: "text-primary",
    button: "border border-primary/40 text-primary hover:bg-primary/10",
  },
};

export default function ServicesCard({
  icon,
  title,
  description,
  link,
  color = "silver", // default to silver if not specified
}: ServicesCardProps) {
  const variant = colorVariants[color];

  return (
    <div
      className={`rounded-[8px] py-6 px-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${variant.bg}`}
    >
      <div className="w-16 h-16 mb-4">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>
      <h4
        className={`text-[18px] font-semibold font-inter mb-2 text-neutral-700`}
      >
        {title}
      </h4>
      <p className="text-[14px] text-neutral-500 leading-relaxed mb-4 text-justify">
        {description}
      </p>
      <a
        href={link}
        className={`text-sm font-semibold font-inter inline-flex items-center gap-1 ${variant.accent} hover:underline float-right`}
      >
        Read more <span className={`${variant.accent}`}>→</span>
      </a>
    </div>
  );
}
