"use client";

import PackageCard from "@/components/package-card";
import { useTheme } from "@/lib/theme-provider";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function PackagesPreview() {
  const { theme } = useTheme();
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  const themeBackgroundClass = {
    orange: "orange-body-background-color",
    blue: "blue-body-background-color",
    dark: "dark-body-background-color",
  }[theme];

  const getPackage = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/init`
      );
      const dealsData = res.data.data.deals;
      setDeals(dealsData);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
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

  // Get diverse packages from different deal types (max 4)
  const getPreviewPackages = (): PackageItem[] => {
    if (deals.length === 0) return [];

    const allPackages: PackageItem[] = [];

    // Method 1: Get one package from each deal type (diverse selection)
    deals.forEach((deal) => {
      if (deal.items.length > 0) {
        // Get the first package from each deal type
        allPackages.push(deal.items[0]);
      }
    });

    // If we have fewer than 4 packages from method 1, add more from the deal with most packages
    if (allPackages.length < 4) {
      // Find the deal with most items
      const dealWithMostItems = deals.reduce((prev, current) =>
        prev.items.length > current.items.length ? prev : current
      );

      // Add additional packages from this deal
      const additionalNeeded = 4 - allPackages.length;
      dealWithMostItems.items.slice(1, 1 + additionalNeeded).forEach((item) => {
        if (allPackages.length < 4) {
          allPackages.push(item);
        }
      });
    }

    // Method 2: Alternative - Get packages based on price (cheapest from each category)
    // You can uncomment this if you prefer to show cheapest packages

    /*
    deals.forEach(deal => {
      if (deal.items.length > 0) {
        // Get the cheapest package from each deal type
        const cheapestPackage = deal.items.reduce((prev, current) => 
          prev.package.price < current.package.price ? prev : current
        );
        allPackages.push(cheapestPackage);
      }
    });
    */

    // Method 3: Alternative - Get packages based on speed (fastest from each category)
    // You can uncomment this if you prefer to show fastest packages

    /*
    deals.forEach(deal => {
      if (deal.items.length > 0) {
        // Get the fastest package from each deal type
        const fastestPackage = deal.items.reduce((prev, current) => 
          parseSpeed(prev.package.speed) > parseSpeed(current.package.speed) ? prev : current
        );
        allPackages.push(fastestPackage);
      }
    });
    */

    // Return only 4 packages maximum
    return allPackages.slice(0, 4);
  };

  // Alternative: Get all packages from all deals and select 4
  const getAllPackagesPreview = (): PackageItem[] => {
    if (deals.length === 0) return [];

    // Flatten all packages from all deals
    const allPackages: PackageItem[] = [];
    deals.forEach((deal) => {
      allPackages.push(...deal.items);
    });

    // Sort by price (ascending) and take first 4 (cheapest)
    return allPackages
      .sort((a, b) => a.package.price - b.package.price)
      .slice(0, 4);

    // Alternative sorting options (uncomment one):

    // Sort by speed (descending) - fastest first
    // return allPackages
    //   .sort((a, b) => parseSpeed(b.package.speed) - parseSpeed(a.package.speed))
    //   .slice(0, 4);

    // Sort by deal type priority (if you have priority order)
    // const priorityOrder = ["Ganaral Plans", "Business Plans", "Special Plans", "Other Plans"];
    // return allPackages
    //   .sort((a, b) => {
    //     const aIndex = priorityOrder.indexOf(a.deal_type);
    //     const bIndex = priorityOrder.indexOf(b.deal_type);
    //     return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    //   })
    //   .slice(0, 4);
  };

  // Choose which method to use
  const previewPackages = getAllPackagesPreview(); // Using all packages sorted by price
  // const previewPackages = getPreviewPackages(); // Using one from each type

  return (
    <section
      id="packages"
      className={`md:py-24 py-20 transition-colors duration-300 ${themeBackgroundClass}`}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-primary">
            Popular Packages
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter">
            Packages and rates at {process.env.NEXT_PUBLIC_COMPANY_NAME} BD are
            always very competitive and so they may change over time. Here are
            some of our popular packages
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading packages...</p>
          </div>
        ) : previewPackages.length > 0 ? (
          <>
            {/* Package Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {previewPackages.map((item, index) => (
                <PackageCard
                  key={`${item.id}-${index}`}
                  id={item.id}
                  title={item.title}
                  price={item.package.price}
                  speed={parseSpeed(item.package.speed)}
                  features={getFeatures(item.attributes)}
                  popular={false}
                  color="silver"
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-8 text-center">
              <div className="mt-12 text-center">
                <a
                  href="/packages"
                  className="btn btn-primary text-primary underline font-inter"
                >
                  View All Services
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No packages available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
