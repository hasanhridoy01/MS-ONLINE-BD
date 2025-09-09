import React from "react";
import LayoutComponents from "./components/LayoutComponents";

export default function page() {
  return (
    <div className="p-6 lg:mt-52 mb-5 mt-56">
      <div className="container mx-auto p-4 border border-primary/20">
        <LayoutComponents />
      </div>
    </div>
  );
}