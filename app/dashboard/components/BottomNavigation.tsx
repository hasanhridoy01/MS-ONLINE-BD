import React from "react";
import { Home, CreditCard, Receipt, LogOut, BluetoothConnected } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  const menuItems = [
    { id: "connections", label: "Connections", icon: BluetoothConnected },
    { id: "billing", label: "Billing", icon: Receipt },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-primary/10 rounded-sm md:hidden">
      <div className="flex items-center justify-around py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "text-primary text-[16px] font-medium font-inter shadow-sm rounded-sm"
                  : "text-foreground text-[16px] font-medium font-inter"
              }`}
            >
              <Icon
                className={`h-5 w-5 mb-1 ${
                  activeTab === item.id ? "text-primary" : ""
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNavigation;
