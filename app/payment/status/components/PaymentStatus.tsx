// components/PaymentStatus.tsx
'use client';

import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";

interface PaymentData {
  status: string | null;
  id: string | null;
  uuid: string | null;
  paymentID: string | null;
}

const PaymentStatus = () => {
  const { msonline_auth } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    status: null,
    id: null,
    uuid: null,
    paymentID: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [contactEmail, setContactEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!msonline_auth?.token) {
      router.push("/"); 
      return;
    }

    // Extract query parameters
    const status = searchParams.get('status');
    const id = searchParams.get('id');
    const uuid = searchParams.get('uuid');
    const paymentID = searchParams.get('paymentID');

    setPaymentData({
      status,
      id,
      uuid,
      paymentID
    });
    
    setIsLoading(false);
  }, [msonline_auth, router, searchParams]);

  const handleContactSupport = () => {
    // Handle contact support logic here
    console.log("Contact support with email:", contactEmail);
    setIsDialogOpen(false);
    setContactEmail("");
  };

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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (paymentData.status) {
      case 'success':
        return {
          title: 'Payment Successful',
          description: 'Your payment has been processed successfully.',
          icon: (
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          ),
          badge: <Badge className="bg-green-100 text-green-800">Success</Badge>,
          color: 'text-green-600'
        };
      case 'failed':
        return {
          title: 'Payment Failed',
          description: 'We couldn\'t process your payment. Please try again.',
          icon: (
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          ),
          badge: <Badge className="bg-red-100 text-red-800">Failed</Badge>,
          color: 'text-red-600'
        };
      default:
        return {
          title: 'Payment Processing',
          description: 'Your payment is being processed. This may take a few moments.',
          icon: (
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-yellow-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          ),
          badge: <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>,
          color: 'text-yellow-600'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 lg:mt-44 mt-52">
      <div className="max-w-md mx-auto shadow-xl">
        <Card className="px-3">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {statusConfig.icon}
            </div>
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
                <span className="font-medium">{paymentData.id || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">UUID:</span>
                <span className="font-medium">{paymentData.uuid || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-medium">{paymentData.paymentID || 'N/A'}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3 px-4">
            {paymentData.status === 'failed' ? (
              <Button asChild className="w-full">
                <Link href="/dashboard">Try Payment Again</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
            
            <div className="flex gap-3 w-full">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    Contact Support
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact Support</DialogTitle>
                    <DialogDescription>
                      Having issues with your payment? Provide your email and our support team will contact you shortly.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleContactSupport}>
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentStatus;