"use client";

import { useTheme } from "@/lib/theme-provider";
import PackageCard from "./package-card";

export default function PackagesSection() {
  const { theme } = useTheme();

  const themeBackgroundClass = {
    orange: "orange-body-background-color",
    blue: "blue-body-background-color",
    dark: "dark-body-background-color",
  }[theme];

  const packages = [
    {
      title: "Silver",
      price: 525,
      speed: 10,
      features: [
        "Facebook Speed: 100Mbps",
        "YouTube Speed: 100Mbps",
        "FTP Speed: 100Mbps",
        "IPv6 is available",
      ],
    },
    {
      title: "Gold",
      price: 630,
      speed: 15,
      features: [
        "Facebook Speed: 100Mbps",
        "YouTube Speed: 100Mbps",
        "FTP Speed: 100Mbps",
        "IPv6 is available",
      ],
      popular: true,
    },
    {
      title: "Platinum",
      price: 840,
      speed: 20,
      features: [
        "Facebook Speed: 100Mbps",
        "YouTube Speed: 100Mbps",
        "FTP Speed: 100Mbps",
        "IPv6 is available",
      ],
    },
    {
      title: "Diamond",
      price: 1050,
      speed: 30,
      features: [
        "Facebook Speed: 100Mbps",
        "YouTube Speed: 100Mbps",
        "FTP Speed: 100Mbps",
        "IPv6 is available",
      ],
    },
  ];

  return (
    <section
      id="packages"
      className=
      {`md:py-28 py-20 transition-colors duration-300 ${themeBackgroundClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-neutral-700">
            Popular Packages
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter">
            Packages and rates at Ms Online BD are always very competitive and
            so they may change over time. Here is the present package list:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
