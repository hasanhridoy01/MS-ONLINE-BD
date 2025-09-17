"use client";

import React from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

export interface Package {
  id: number;
  name: string;
  price: number;
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
  extended_due_date: string;
  // Add other customer fields as needed
}

export interface CustomerResponse {
  status: boolean;
  message: string;
  data: CustomerType;
}

const CustomerDetails = () => {
  const { msonline_auth } = React.useContext<any>(AuthContext);
  const [customer, setCustomer] = React.useState<CustomerType | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<
    number | null
  >(null);
  const [customerLoading, setCustomerLoading] = React.useState(false);

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
  // If customer data exists, show customer details
  if (customer) {
    return (
      <div className="p-2">
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
                    {customer?.extended_due_date
                      ? new Date(
                          customer.extended_due_date
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="font-medium">Bill Status:</p>
                  <p>{customer?.bill ? "Available" : "No bill"}</p>
                </div>

               
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default CustomerDetails;
