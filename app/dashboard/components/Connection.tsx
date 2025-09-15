"use client";

import React from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

// ------------------ Component ------------------
const Connection = () => {
  const { msonline_auth } = React.useContext<any>(AuthContext);
  const [connections, setConnections] = React.useState<ConnectionType[]>([]);
  const [loading, setLoading] = React.useState(false);

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
      console.log("Customer data:", res.data.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  React.useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="p-2">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : connections.length === 0 ? (
        <p className="text-gray-500">No connections found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
          {connections.map((conn) => (
            <Card
              onClick={() => getCustomer(conn.id)}
              key={conn.id}
              className="shadow-sm hover:shadow-lg transition bg-primary/10 border border-primary/70 cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {conn.customerID}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Connection;
