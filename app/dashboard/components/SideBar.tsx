import React from "react";
import { Home, Users, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "users", label: "Users", icon: Users },
  ];
  return (
    <div className="md:flex md:w-64 md:flex-col bg-base-100">
      <div className="flex flex-col flex-1 h-full">
        {/* Logo */}
        <div className="p-5 border-b border-primary/20">
          <h1 className="text-2xl font-bold text-primary/70 font-inter">DashBoard</h1>
          <p className="mt-1 text-sm text-foreground font-medium font-inter">Admin Panel</p>
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
                  : "text-foreground text-[16px] font-medium font-inter"
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
          <div className="p-3 mb-3 border-2 border-primary/10 rounded-sm">
            <p className="text-sm  text-muted-foreground hover:text-foreground transition-colors  font-medium font-inter">
              Zahid Hasan Hridoy
            </p>
            <p className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium font-inter">
              Hridoy@gmail.com
            </p>
          </div>
          <button className="flex items-center w-full px-4 py-2 transition-colors duration-200 rounded-lg text-error hover:bg-error/10">
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
