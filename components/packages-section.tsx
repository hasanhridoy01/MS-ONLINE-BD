"use client";

import { useTheme } from "@/lib/theme-provider";
import PackageCard from "./package-card";
import axios from "axios";
import { useEffect, useState } from "react";

interface Deal {
  type: string;
  items: PackageItem[];
}

interface PackageItem {
  id: string;
  title: string;
  attributes: Attribute[];
  deal_type: string;
  package: Package;
  package_description: string | null;
}

interface Attribute {
  label: string;
  value: string;
}

interface Package {
  id: number;
  code: string;
  name: string;
  type: string;
  price: number;
  bandwidth: string;
  speed: string;
  status: number;
  deletable: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  branch_id: number;
  router_id: number;
  reseller_id: number | null;
  reseller_commission: number;
}

export default function PackagesSection() {
  const { theme } = useTheme();
  const [deals, setDeals] = useState<Deal[]>([]);

  const themeBackgroundClass = {
    orange: "orange-body-background-color",
    blue: "blue-body-background-color",
    dark: "dark-body-background-color",
  }[theme];

  const getPackage = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/init`
      );
      setDeals(res.data.data.deals);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    getPackage();
  }, []);

  // Extract features from attributes
  const getFeatures = (attributes: Attribute[]): string[] => {
    return attributes.map((attr) => `${attr.label}: ${attr.value}`);
  };

  // Parse speed from string to number
  const parseSpeed = (speedString: string): number => {
    const match = speedString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <section
      id="packages"
      className={`md:py-24 py-20 transition-colors duration-300 ${themeBackgroundClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-primary">
            Popular Packages
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter">
            Packages and rates at Ms Online BD are always very competitive and
            so they may change over time. Here is the present package list:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((deal) =>
            deal.items
              .slice(0, 4)
              .map((item) => (
                <PackageCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.package.price}
                  speed={parseSpeed(item.package.speed)}
                  features={getFeatures(item.attributes)}
                  popular={false}
                  color="silver"
                />
              ))
          )}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/packages"
            className="btn btn-primary text-primary underline font-inter"
          >
            View All Packages
          </a>
        </div>
      </div>
    </section>
  );
}
