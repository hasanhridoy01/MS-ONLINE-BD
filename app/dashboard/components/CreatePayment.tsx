"use client";

import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import useHandleSnackbar from "@/lib/HandleSnakbar";
import { AuthContext } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaymentProcessing from "./PaymentProcessing";

export interface DealType {
  id: number;
  name: string;
}

export interface Package {
  id: number;
  name: string;
  price: number;
}

export interface ConnectionType {
  id: number;
  customerID: string;
  extended_due_date: string;
  status: "Active" | "Inactive";
  package: Package;
  bill: any | null;
}

export interface DataResponse {
  status: boolean;
  message: string;
  data: ConnectionType[];
}

export default function CreatePayment() {
  const router = useRouter();
  const { msonline_auth } = useContext(AuthContext);
  const handleSnackbarOpen = useHandleSnackbar();
  const [amount, setAmount] = useState("");
  const [selectedDealId, setSelectedDealId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [deals, setDeals] = useState<DealType[]>([]);
  const [dealsLoading, setDealsLoading] = useState<boolean>(false);
  const [connections, setConnections] = useState<ConnectionType[]>([]);
  const [connectionLoading, setConnectionLoading] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [paymentURL, setPaymentURL] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDealId) {
      handleSnackbarOpen("Please select a payment gateway", "error", 3000);
      return;
    }

    try {
      const formData = {
        customer_id: selectedConnectionId,
        gateway_id: selectedDealId,
        amount: amount,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.token}`,
          },
        }
      );

      // Handle successful response
      if (res.data.status) {
        setSelectedConnectionId("");
        setAmount("");
        setSelectedDealId("");
        setOpen(false);

        // Redirect to payment URL or show success
        if (res.data.data.paymentURL) {
          // Show processing animation
          setProcessing(true);
          setPaymentURL(res.data.data.paymentURL);
        } else {
          router.push("/dashboard");
        }

        handleSnackbarOpen("Payment created successfully", "success", 3000);
      } else {
        handleSnackbarOpen(
          res.data.message || "Failed to create payment",
          "error",
          3000
        );
      }
    } catch (error) {
      console.error("Payment creation error:", error);
      handleSnackbarOpen("Failed to create payment", "error", 3000);
    }
  };

  // Fetch gateways when dialog opens
  useEffect(() => {
    if (open) {
      getGetway();
      getConnections();
    }
  }, [open]);

  const getGetway = async () => {
    setDealsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gateway`
      );
      setDeals(res.data.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setDealsLoading(false);
    }
  };

  const getConnections = async () => {
    setConnectionLoading(true);
    try {
      const res = await axios.get<DataResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/connections`,
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.token}`,
          },
        }
      );
      setConnections(res.data.data);
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setConnectionLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 transition-colors rounded-[6px] font-inter text-sm">
            CREATE PAYMENT
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-2">
              <DialogTitle>Create Payment</DialogTitle>
              <DialogDescription>
                Enter your customer ID and select a payment gateway to create a
                payment.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="customer-id">Customer ID</Label>
                <Select
                  value={selectedConnectionId}
                  onValueChange={setSelectedConnectionId} // Update selected deal ID
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Connections</SelectLabel>
                      {connectionLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading Connection...
                        </SelectItem>
                      ) : (
                        connections.map((connection) => (
                          <SelectItem
                            key={connection.id}
                            value={connection.id.toString()}
                          >
                            {connection.customerID}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Gateway selection dropdown */}
              <div className="grid gap-3">
                <Label htmlFor="gateway">Payment Gateway</Label>
                <Select
                  value={selectedDealId}
                  onValueChange={setSelectedDealId} // Update selected deal ID
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Payment Gateways</SelectLabel>
                      {dealsLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading gateways...
                        </SelectItem>
                      ) : (
                        deals.map((deal) => (
                          <SelectItem key={deal.id} value={deal.id.toString()}>
                            {deal.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="amount-id">Amount</Label>
                <Input
                  id="amount-id"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <DialogFooter className="lg:mt-4 mt-5">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="rounded-[7px] lg:mt-0 mt-3"
                >
                  CANCEL
                </Button>
              </DialogClose>
              <Button type="submit" className="rounded-[7px]">
                CREATE
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {processing && paymentURL && (
        <PaymentProcessing paymentURL={paymentURL} />
      )}
    </div>
  );
}
