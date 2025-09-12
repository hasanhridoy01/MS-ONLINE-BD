"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import axios from "axios";
import useHandleSnackbar from "@/lib/HandleSnakbar";

export default function ContactSection() {
  const { theme } = useTheme();
  const handleSnackbarOpen = useHandleSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");

  const themeBackgroundClass = {
    orange: "orange-body-background-color",
    blue: "blue-body-background-color",
    dark: "dark-body-background-color",
  }[theme];

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setService(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create form data object
    const formData = {
      name,
      email,
      mobile,
      message,
      service,
    };
    try {
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        formData
      );

      handleSnackbarOpen("Successful", "success", 3000);
      // Reset form
      // setName("");
      // setEmail("");
      // setMobile("");
      // setMessage("");
      // setService("");
    } catch (error) {
      console.log("Error submitting form:", error);
      handleSnackbarOpen("Failed", "error", 3000);
    }
  };

  return (
    <section
      id="contact"
      className={`md:py-24 py-20 transition-colors duration-300 ${themeBackgroundClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-neutral-700">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter">
            Got any enquires about internet packages? We are here to help. Our
            helping team is at your service 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1">
                <div>
                  <label
                    htmlFor="Name"
                    className="block text-[15px] font-bold font-inter text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Full Name"
                    className="bg-white w-full px-3 py-2 border border-primary text-gray-700 rounded-[8px] text-[16px] font-medium font-inter focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[15px] font-bold font-inter text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="flex rounded-[8px] border border-primary overflow-hidden">
                    <span className="inline-flex items-center px-3 bg-white text-gray-700 text-[16px] font-medium font-inter">
                      +880
                    </span>
                    <div className="w-px bg-primary/40" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter Phone Number"
                      className="bg-white px-3 py-2 text-gray-700 text-[16px] font-medium font-inter w-full focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[15px] font-bold font-inter text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@mail.com"
                    className="bg-white border border-primary w-full px-3 py-2 text-gray-700 rounded-[8px] text-[16px] font-medium font-inter focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[15px] font-bold font-inter text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave us a message..."
                  rows={4}
                  className="bg-white border border-primary w-full px-3 py-2 text-gray-700 rounded-[8px] text-[16px] font-medium font-inter focus:outline-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-[15px] font-bold font-inter text-gray-700 mb-2">
                  Services
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newConnection"
                      name="service"
                      color="primary"
                      value="New Connection"
                      checked={service === "New Connection"}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-primary border-input rounded"
                    />
                    <label
                      htmlFor="newConnection"
                      className="ml-2 text-[16px] font-[600] font-inter text-primary/80"
                    >
                      New Connection
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="changeConnection"
                      name="service"
                      color="primary"
                      value="Internet Connection"
                      checked={service === "Internet Connection"}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-primary border-input rounded"
                    />
                    <label
                      htmlFor="changeConnection"
                      className="ml-2 text-[16px] font-[600] font-inter text-primary/80"
                    >
                      Internet Connection
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="otherService"
                      name="service"
                      color="primary"
                      value="Other"
                      checked={service === "Other"}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-primary border-input rounded"
                    />
                    <label
                      htmlFor="otherService"
                      className="ml-2 text-[16px] font-[600] font-inter text-primary/80"
                    >
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-6">
                <button
                  type="submit"
                  className="md:w-auto bg-primary text-white font-semibold py-3 px-6 rounded-[8px] border border-[#F2CEB9] hover:border-primary font-inter"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-[18px] font-semibold font-inter mb-1.5 text-neutral-700">
                Social media
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter mb-5">
                Keep an eye at our social media pages & never miss offers.
              </p>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">f</span>
                  </div>
                  <span className="text-[16px] font-semibold font-inter underline">
                    Like us.
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">in</span>
                  </div>
                  <span className="text-[16px] font-semibold font-inter underline">
                    Follow us.
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">yt</span>
                  </div>
                  <span className="text-[16px] font-semibold font-inter underline">
                    Subscribe to your channel.
                  </span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold font-inter mb-1.5 text-neutral-700">
                Reach us
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter mb-5">
                Call our team Sunday - Thursday from 10am - 8pm or mail anytime.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[16px] font-semibold font-inter text-neutral-700">
                      +09 639116116 | +880 1749090930
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="">
                    <a
                      href="mailto:info@exampleisp.com"
                      className="text-[16px] font-semibold font-inter text-neutral-700 underline hover:text-primary transition-colors"
                    >
                      info@netconnect.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold font-inter mb-1.5 text-neutral-700">
                Visit us
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto text-[14px] font-medium font-inter mb-5">
                Chat with us in person at our head office.
              </p>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <address className="not-italic text-[16px] font-semibold font-inter text-neutral-700 underline">
                  89/3 Water Works Road, Posta, Chawakbazar, Dhaka-1211, BD
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
