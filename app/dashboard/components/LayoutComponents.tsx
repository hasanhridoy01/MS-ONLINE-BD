"use client";

import React, { useState } from "react";
import { Sidebar } from "./SideBar";
import BottomNavigation from "./BottomNavigation";

const LayoutComponents = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Extract content rendering into a function
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <p>Profile</p>;
      case "settings":
        return <p>Settings</p>;
      default:
        return <p>Dashboard</p>;
    }
  };

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <aside className="flex-col hidden shadow-md md:flex md:w-64 bg-base-100">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden lg:my-0 my-10">
        <main className="flex-1 p-4 pb-20 overflow-y-auto md:p-6 lg:p-8 md:pb-8">
          {renderContent()}
        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default LayoutComponents;
