"use client";

import React, { useState } from "react";
import { Sidebar } from "./SideBar";
import BottomNavigation from "./BottomNavigation";
import { AuthContext } from "@/context/AuthContext";
import Connection from "./Connection";
import BillingsTable from "./BillingsTable";
import PaymentTable from "./PaymentTable";

const LayoutComponents = () => {
  const { msonline_auth } = React.useContext<any>(AuthContext);
  const [activeTab, setActiveTab] = useState("connections");

  // Extract content rendering into a function
  const renderContent = () => {
    switch (activeTab) {
      case "paymentsTable":
        return <PaymentTable />;
      case "billingTable":
        return <BillingsTable />;
      // case "billing":
      //   return <Billings />;
      default:
        return <Connection />;
    }
  };

  if (!msonline_auth?.token) {
    return <p className="text-center py-10">Please Login</p>;
  }

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <aside className="flex-col hidden bg-primary/10 md:flex md:w-64 bg-base-100">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden lg:my-0 my-5">
        <main className="flex-1 p-4 pt-0 pb-0 pr-0 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default LayoutComponents;
