"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PaymentProcessingProps {
  paymentURL: string;
}

const PaymentProcessing: React.FC<PaymentProcessingProps> = ({
  paymentURL,
}) => {
  const [message, setMessage] = useState("Processing your payment...");
  const router = useRouter();

  useEffect(() => {
    // Step 1: Show "Processing..."
    const timer1 = setTimeout(() => {
      setMessage("Redirecting you to your payment page...");
    }, 2000);

    // Step 2: Redirect after another 2s
    const timer2 = setTimeout(() => {
      window.location.href = paymentURL; 
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [paymentURL]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      <p className="mt-4 text-base font-medium text-white">{message}</p>
    </div>
  );
};

export default PaymentProcessing;