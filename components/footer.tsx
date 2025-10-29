import Link from "next/link";
import { Facebook, Instagram, Youtube, Wifi } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Option {
  key: string;
  value: string;
}

// ✅ Type for API response structure (optional but good practice)
interface InitResponse {
  data: {
    options: Option[];
  };
}

export default function Footer() {
  const [options, setOptions] = useState<Option[]>([]);

  const getOptions = async () => {
    try {
     const res = await axios.get<InitResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/init`
      );

      console.log("Options response:", res.data.data.options);
      setOptions(res.data.data.options); 
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getOptions();
  }, []);
  return (
    <footer className="bg-gradient-to-b from-background to-background/90 transition-colors duration-300 pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          {/* <img src={options[0]?.value} alt={options[0]?.key} /> */}
          <img src="/logo.png" alt="" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-[16px] font-bold mb-5 font-montserrat">MENU</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground font-inter transition-colors text-[16px] font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/p/offer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Offer
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/p/about"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/p/pop"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Pop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[16px] font-bold mb-5 font-montserrat">
              OUR SERVICES
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/p/internet-connectivity"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Internet connectivity
                </Link>
              </li>
              <li>
                <Link
                  href="/p/data-connectivity"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Data connectivity
                </Link>
              </li>
              <li>
                <Link
                  href="/p/home-internet"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Home Internet
                </Link>
              </li>
              <li>
                <Link
                  href="/p/security-surveillance"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Security & Surveillance
                </Link>
              </li>
              <li>
                <Link
                  href="/p/customer-service"
                  className="text-muted-foreground hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                >
                  Customer Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[16px] font-bold mb-5 font-montserrat">
              OFFICE
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-4 text-muted-foreground text-[16px] font-medium font-inter">
                <Phone />
                <div>
                  <p>+09 639116116</p>
                  <p>+880 1749090930</p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-muted-foreground text-[16px] font-medium font-inter">
                <Mail />
                <div>
                  <a
                    href="mailto:info@netconnect.com"
                    className="hover:text-foreground transition-colors text-[16px] font-medium font-inter"
                  >
                    info@netconnect.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4 text-muted-foreground text-[16px] font-medium font-inter">
                <MapPin />
                <address className="not-italic">
                  89/3 Water Works Road, Posta,
                  <br /> Chawakbazar, Dhaka-1211, BD
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[16px] font-bold mb-5 font-montserrat">
              CONNECT
            </h3>
            <p className="text-muted-foreground mb-5 text-[16px] font-medium font-inter">
              Follow us on social media to find out the latest offers.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row justify-between md:items-center items-start gap-4 rounded-[12px] bg-primary/10 px-4">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium font-inter hover:text-foreground transition-colors">
              Copyright © {new Date().getFullYear()} MS ONLINE BD
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/p/terms-and-conditions"
              className="hover:text-foreground transition-colors text-sm font-medium font-inter"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/p/privacy-policy"
              className="hover:text-foreground transition-colors text-sm font-medium font-inter"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex space-x-4 text-sm hover:text-foreground transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium font-inter hover:text-foreground transition-colors">
                English
              </span>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M12 6.50003C12 6.50003 9.05404 10.5 7.99997 10.5C6.94589 10.5 4 6.5 4 6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Phone() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-phone text-primary"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function Mail() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-mail text-primary"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPin() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-map-pin text-primary"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
