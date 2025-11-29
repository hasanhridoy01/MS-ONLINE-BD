"use client";

import { useEffect, useState } from "react";

interface Option {
  key: string;
  value: string | null;
}

interface offerPopupProps {
  options: Option[];
}

export default function OfferPopup({ options }: offerPopupProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Helper function to get option value by key
  const getOptionValue = (key: string): string | null => {
    const option = options.find((opt) => opt.key === key);
    return option?.value || null;
  };

  // Get specific values for navbar
  const offerLogo = getOptionValue("Offer Banner");

  useEffect(() => {
    setMounted(true);
    const popupClosed = localStorage.getItem("offerPopupClosed");
    if (!popupClosed) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("offerPopupClosed", "true");
  };

  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-300">
      <div className="relative animate-in slide-in-from-bottom-10 duration-300 ease-out">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-10 text-gray-600 hover:text-gray-800 transition-colors duration-200 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-gray-200 hover:bg-gray-50"
          aria-label="Close offer popup"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Your Image Only */}
        {offerLogo ? (
          <img
            src={offerLogo}
            alt="Special Offer"
            className="rounded-xl shadow-2xl max-w-md w-full object-cover"
          />
        ) : (
          <img
            src="/add.png"
            alt="Special Offer"
            className="rounded-xl shadow-2xl max-w-md w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
