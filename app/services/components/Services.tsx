"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-provider";
import axios from "axios";
import ServicesCard from "@/components/services-card";

interface ServiceItem {
  id: number;
  type: string;
  title: string;
  description: string | null;
  external_link: string | null;
  attachment: string;
}

interface ServiceCategory {
  type: string;
  items: ServiceItem[];
}

export default function Services() {
  const { theme } = useTheme();
  const [services, setServices] = useState<ServiceCategory[]>([]);

  const themeBackgroundClass = {
    orange: "orange-body-background-color",
    blue: "blue-body-background-color",
    dark: "dark-body-background-color",
  }[theme];
  
  const getServices = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/init`
      );

      console.log("Services response:", res.data);
      setServices(res.data.data.features); // Changed from services to features
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // Flatten all service items from all categories
  const allServiceItems = services.flatMap(category => category.items);

  return (
    <section
      id="services"
      className={`md:py-24 py-20 transition-colors duration-300 ${themeBackgroundClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-primary">
            Other Services
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter">
            Ms Online now comes with an wide array of other services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allServiceItems.map((item) => (
            <ServicesCard
              key={item.id}
              icon={item.attachment}
              type={item.type}
              title={item.title}
              description={item.description ? item.description.replace(/<[^>]*>/g, '') : 'No description available'}
              link={item.external_link || '#'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}