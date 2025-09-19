// components/PaymentStatus.tsx
"use client";

import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "@/context/AuthContext";

interface PaymentData {
  status: string | null;
  id: string | null;
  uuid: string | null;
  paymentID: string | null;
  amount: number | null;
  message: string | null;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    uuid: string;
    gateway_id: number;
    amount: number;
    status: string;
    remarks: string | null;
    message: string;
  };
}

const PaymentStatus = () => {
  const { msonline_auth } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    status: null,
    id: null,
    uuid: null,
    paymentID: null,
    amount: null,
    message: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!msonline_auth?.token) {
      router.push("/");
      return;
    }

    // Extract payment ID from query parameters
    const id = searchParams.get("id");

    if (!id) {
      setError("Payment ID is missing");
      setIsLoading(false);
      return;
    }

    // Fetch payment data from API using the ID from search params
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${msonline_auth.token}`,
            },
          }
        );

        if (response.data.status) {
          setPaymentData({
            status: response.data.data.status,
            id: response.data.data.id.toString(),
            uuid: response.data.data.uuid,
            paymentID: response.data.data.gateway_id.toString(),
            amount: response.data.data.amount,
            message: response.data.data.message,
          });
        } else {
          throw new Error(
            response.data.message || "Failed to fetch payment data"
          );
        }
      } catch (err) {
        console.error("Error fetching payment data:", err);
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || err.message || "An error occurred"
          );
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, [msonline_auth, router, searchParams]);

  // Show nothing while checking authentication or redirecting
  if (!msonline_auth?.token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Verifying Access</CardTitle>
            <CardDescription className="text-center">
              Please wait while we verify your access...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Processing Payment</CardTitle>
            <CardDescription className="text-center">
              Verifying your payment details...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Error</CardTitle>
            <CardDescription className="text-center text-red-500">
              {error}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (paymentData.status?.toLowerCase()) {
      case "success":
        return {
          title: "Payment Successful",
          description:
            paymentData.message ||
            "Your payment has been processed successfully.",
          icon: (
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          ),
          badge: <Badge className="bg-green-100 text-green-800">Success</Badge>,
          color: "text-green-600",
        };
      case "failed":
        return {
          title: "Payment Failed",
          description:
            paymentData.message ||
            "We couldn't process your payment. Please try again.",
          icon: (
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          ),
          badge: <Badge className="bg-red-100 text-red-800">Failed</Badge>,
          color: "text-red-600",
        };
      default:
        return {
          title: "Payment Processing",
          description:
            paymentData.message ||
            "Your payment is being processed. This may take a few moments.",
          icon: (
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-yellow-600 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          ),
          badge: (
            <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
          ),
          color: "text-yellow-600",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 lg:mt-44 mt-52">
      <div className="max-w-md mx-auto shadow-xl">
        <Card className="px-3">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">{statusConfig.icon}</div>
            <CardTitle>{statusConfig.title}</CardTitle>
            <CardDescription>{statusConfig.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Status:</span>
                {statusConfig.badge}
              </div>

              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Reference ID:</span>
                <span className="font-medium">{paymentData.id || "N/A"}</span>
              </div>

              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">UUID:</span>
                <span className="font-medium">{paymentData.uuid || "N/A"}</span>
              </div>

              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-medium">
                  {paymentData.paymentID || "N/A"}
                </span>
              </div>

              {paymentData.amount !== null && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">
                    ${paymentData.amount.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 px-4">
            {paymentData.status?.toLowerCase() === "failed" ? (
              <Button asChild className="w-full">
                <Link href="/dashboard">Try Payment Again</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentStatus;
