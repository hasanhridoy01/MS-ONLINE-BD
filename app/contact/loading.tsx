import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
    </div>
  );
};

export default loading;
