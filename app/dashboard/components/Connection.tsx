"use client";

import React from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Billings from "./Billings";

// ------------------ Types ------------------
export interface Package {
  id: number;
  name: string;
  price: number;
}

export interface ConnectionType {
  id: number;
  customerID: string;
  extended_due_date: string; // ISO date string
  status: "Active" | "Inactive";
  package: Package;
  bill: any | null;
}

export interface DataResponse {
  status: boolean;
  message: string;
  data: ConnectionType[];
}

export interface CustomerType {
  id: number;
  customerID: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  package: Package;
  bill: any | null;
  // Add other customer fields as needed
}

export interface CustomerResponse {
  status: boolean;
  message: string;
  data: CustomerType;
}

// ------------------ Component ------------------
const Connection = () => {
  const router = useRouter();
  const { msonline_auth } = React.useContext<any>(AuthContext);
  const [connections, setConnections] = React.useState<ConnectionType[]>([]);
  const [customer, setCustomer] = React.useState<CustomerType | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<number | null>(null);
  const [customerLoading, setCustomerLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showBillings, setShowBillings] = React.useState(false);

  const getConnections = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const getCustomer = async (customerID: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/${customerID}`,
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.token}`,
          },
        }
      );
      setCustomer(res.data.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const handleBackToConnections = () => {
    setCustomer(null);
    setShowBillings(false);
    setSelectedCustomerId(null);
  };

  const handleBackToCustomerDetails = () => {
    setShowBillings(false);
  };

  const handleBillings = (customerId: number) => {
    setSelectedCustomerId(customerId);
    setShowBillings(true);
  };

  React.useEffect(() => {
    getConnections();
  }, []);

  // If showing billings, render Billings component
  if (showBillings && selectedCustomerId) {
    return (
      <div className="p-2">
        <Button
          onClick={handleBackToCustomerDetails}
          variant="outline"
          className="mb-4"
        >
          ← Back to Customer Details
        </Button>
        <Billings customerId={selectedCustomerId} />
      </div>
    );
  }

  // If customer data exists, show customer details
  if (customer) {
    return (
      <div className="p-2">
        <Button
          onClick={handleBackToConnections}
          variant="outline"
          className="mb-4"
        >
          ← Back to Connections
        </Button>

        <Card className="shadow-sm border border-primary/30">
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            {customerLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Customer ID:</p>
                    <p>{customer.customerID}</p>
                  </div>
                  <div>
                    <p className="font-medium">Status:</p>
                    <Badge
                      variant={
                        customer?.status === "Active"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {customer?.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Name:</p>
                  <p>{customer.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Email:</p>
                    <p>{customer.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p>{customer.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Address:</p>
                  <p>{customer.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Package:</p>
                    <p>{customer?.package.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Price:</p>
                    <p>৳{customer?.package.price}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Extended Due Date:</p>
                  <p>
                    {connections[0]?.extended_due_date
                      ? new Date(
                          connections[0].extended_due_date
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="font-medium">Bill Status:</p>
                  <p>{customer?.bill ? "Available" : "No bill"}</p>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleBillings(customer.id)}
                  >
                    View Billings
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Otherwise, show connections list
  return (
    <div className="p-2">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Card
              key={idx}
              className="animate-pulse shadow-sm border border-primary/30 bg-primary/10"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-40" />
              </CardContent>
            </Card>
          ))
        ) : connections.length === 0 ? (
          <p className="text-gray-500">No connections found</p>
        ) : (
          connections.map((conn) => (
            <Card
              onClick={() => getCustomer(conn.id)}
              key={conn.id}
              className="shadow-sm hover:shadow-lg transition bg-primary/10 border border-primary/70 cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {conn.id}
                  <Badge
                    variant={
                      conn.status === "Active" ? "default" : "destructive"
                    }
                  >
                    {conn.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-medium">Package:</span>{" "}
                  {conn.package.name}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ৳
                  {conn.package.price}
                </p>
                <p>
                  <span className="font-medium">Extended Due Date:</span>{" "}
                  {new Date(conn.extended_due_date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Connection;