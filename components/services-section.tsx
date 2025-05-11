import React from "react";
import ServicesCard from "./services-card";

export default function ServicesSection() {
  const services = [
    {
      icon: "/Frame 24.png",
      title: "Internet Connectivity",
      description:
        "Dedicated High speed internet connectivity through primary and secondary link. LAN & WAN connectivity, High availability conne...",
      link: "#",
    },
    {
      icon: "/Frame 24 (1).png",
      title: "Security & Surveillance",
      description:
        "Welcome to Ms Online BD , your trusted broadband internet service provider! In addition to promoting access to fast internet service , Sa...",
      link: "#",
    },
    {
      icon: "/Frame 24 (2).png",
      title: "LAN & Maintenance",
      description:
        "Comprehensive LAN solutions and maintenance for your internet service needs in the Dhaka division. Experience seamless connectivity",
      link: "#",
    },
    {
      icon: "/Frame 24 (3).png",
      title: "Bulk SMS Service",
      description:
        "Ms Online BD provides promotional Bulk SMS to all ANS Operators for our corporate customers. Our bulk SMS Service is a fully scalable comm",
      link: "#",
    },
    {
      icon: "/Frame 24 (4).png",
      title: "Home Internet",
      description:
        "Welcome to Ms Online BD  “Home Internet,” where you can get a reliable, fast connection to the internet. With outstanding internet",
      link: "#",
    },
    {
      icon: "/Frame 24 (5).png",
      title: "Data Connectivity",
      description:
        "Enhancing Efficiency and Communication Businesses of all sizes are using the power of data in today’s data-driven world to encour",
      link: "#",
    },
    {
      icon: "/Frame 24 (6).png",
      title: "Customer Service",
      description:
        "Thank you for visiting Ms Online, your trusted internet service provider! At Sam, we think that providing excellent customer service is the ve...",
      link: "#",
    },
    {
      icon: "/Frame 24 (7).png",
      title: "Online Payment Gateway",
      description:
        "Ms Online BD  provides instant and secure transaction to merchants through the online payment gateway. We have a single platform for all typ...",
      link: "#",
    },
  ];
  return (
    <section
      id="services"
      className="md:py-28 py-20 bg-[#FAFDFF] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-neutral-700">
            Other Services
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter">
            Ms Online now comes with an wide array of other services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((pkg, index) => (
            <ServicesCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
