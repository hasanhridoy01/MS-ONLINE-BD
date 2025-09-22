import React from "react";
import {
  Home,
  CreditCard,
  Receipt,
  LogOut,
  BluetoothConnected,
  Plus,
} from "lucide-react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import CreatePayment from "./CreatePayment";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface Profile {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

interface DataResponse {
  status: boolean;
  message: string;
  data: Profile;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { msonline_auth } = React.useContext<any>(AuthContext);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(false);

  const menuItems = [
    { id: "connections", label: "Connections", icon: BluetoothConnected },
    // { id: "billing", label: "Billings", icon: Receipt },
    { id: "billingTable", label: "Billing Table", icon: Receipt },
    { id: "paymentsTable", label: "Payments Table", icon: CreditCard },
  ];

  const getProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get<DataResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/profile`,
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.token}`,
          },
        }
      );
      setProfile(res.data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="md:flex md:w-64 md:flex-col h-full">
      <div className="flex flex-col flex-1 h-full">
        {/* Logo */}
        <div className="p-5 border-b border-primary/20">
          <h1 className="text-2xl font-bold text-primary/70 font-kalam text-center">
            DashBoard
          </h1>
        </div>

        {/* Navigation (Scrollable) */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary text-[16px] font-medium font-inter shadow-sm rounded-sm"
                    : "text-muted-foreground text-[16px] font-medium font-inter"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout (Sticky at Bottom) */}
        <div className="p-4 mt-auto border-t border-primary/20">
          <div className="w-full my-3 flex justify-center">
            <CreatePayment triggerLabel={'Pay Bill'} />
          </div>
          <div className="p-5 mb-4 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-background shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              👤 Profile Info
            </h3>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium">
                <span className="text-foreground font-semibold">Name:</span>{" "}
                {profile ? profile.name : "Loading..."}
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                <span className="text-foreground font-semibold">Email:</span>{" "}
                {profile ? profile.email : ""}
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                <span className="text-foreground font-semibold">Mobile:</span>{" "}
                {profile ? profile.mobile : ""}
              </p>
            </div>
          </div>

          {/* <button className="flex items-center w-full px-4 py-2 transition-colors duration-200 rounded-lg text-error hover:bg-error/10">
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button> */}
        </div>
      </div>
    </div>
  );
}
