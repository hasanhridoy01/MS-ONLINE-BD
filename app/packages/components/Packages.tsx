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
  const [activeTab, setActiveTab] = useState<string>("");
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
      // console.log("API Response:", res.data.data.deals);
      const dealsData = res.data.data.deals;
      setDeals(dealsData);

      // Set the first deal type as default active tab
      if (dealsData.length > 0) {
        setActiveTab(dealsData[0].type);
      }
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

  // Get unique deal types for tabs
  const dealTypes = deals.map((deal) => deal.type);

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
            Packages and rates at {process.env.NEXT_PUBLIC_COMPANY_NAME} BD are
            always very competitive and so they may change over time. Here is
            the present package list
          </p>
        </div>

        {/* Dynamic Tabs */}
        {dealTypes.length > 0 ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex items-center justify-center shadow-none rounded-md bg-transparent border-b-2 border-primary/20 pb-0 mb-8 overflow-x-auto">
              {dealTypes.map((dealType) => (
                <TabsTrigger
                  key={dealType}
                  value={dealType}
                  className="px-4 py-2 rounded-t-md font-inter font-medium text-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap transition-all duration-200"
                >
                  {dealType}
                </TabsTrigger>
              ))}
            </TabsList>

            {dealTypes.map((dealType) => {
              const currentDeal = deals.find((deal) => deal.type === dealType);
              const packageItems = currentDeal?.items || [];

              return (
                <TabsContent key={dealType} value={dealType} className="mt-0">
                  {packageItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {packageItems.map((item) => (
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
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No packages available for {dealType}
                      </p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
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
