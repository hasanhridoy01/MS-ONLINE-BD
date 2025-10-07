"use client";

import PackageCard from "@/components/package-card";
import { useTheme } from "@/lib/theme-provider";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function Packages() {
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
      console.log(res.data.data.deals);
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
        {/* Header */}
        <div className="text-center mb-7">
          <h2 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-primary">
            Popular Packages
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter">
            Packages and rates at Ms Online BD are always very competitive and
            so they may change over time. Here is the present package list
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general">
          <div className="flex justify-center">
            <TabsList className="mb-2 flex items-center justify-center shadow-none bg-primary/10 w-fit rounded-md">
              <TabsTrigger
                value="general"
                className="px-4 py-2 rounded-t-md font-inter font-medium text-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                General Packages
              </TabsTrigger>
              <TabsTrigger
                value="BTRC"
                className="px-4 py-2 rounded-t-md font-medium font-inter text-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                BTRC Approved Packages
              </TabsTrigger>
            </TabsList>
          </div>

          {/* General Tab */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {deals
                .filter((deal) => deal.type === "Ganaral")
                .flatMap((deal) => deal.items).length > 0 ? (
                deals
                  .filter((deal) => deal.type === "Ganaral")
                  .flatMap((deal) =>
                    deal.items.map((item) => (
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
                  )
              ) : (
                <p className="col-span-full text-center text-muted-foreground">
                  No data available
                </p>
              )}
            </div>
          </TabsContent>

          {/* BTRC Tab */}
          <TabsContent value="BTRC">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {deals
                .filter((deal) => deal.type === "BTRC")
                .flatMap((deal) => deal.items).length > 0 ? (
                deals
                  .filter((deal) => deal.type === "BTRC")
                  .flatMap((deal) =>
                    deal.items.map((item) => (
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
                  )
              ) : (
                <p className="col-span-full text-center text-muted-foreground">
                  No data available
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
