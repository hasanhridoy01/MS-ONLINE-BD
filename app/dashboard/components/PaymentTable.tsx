"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreatePayment from "./CreatePayment";

interface Remark {
  by: string;
  previous_dues?: number;
  package: number;
  monthly_discount: number;
  service_charge: number;
  setup_charge: number;
  initial_due: number;
  cable_cost: number;
  payable: number;
}

interface PaymentItem {
  id: number;
  voucher: string;
  month: string;
  bills: number;
  paid: number;
  discount: number;
  remarks: string | null;
  payment_date: string;
  payment_method: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    from: number;
    to: number;
    per_page: number;
    current_page: number;
    last_page: number;
    total: number;
    data: [
      {
        id: number;
        voucher: string;
        month: string;
        bills: number;
        paid: number;
        discount: number;
        remarks: string | null;
        payment_date: string;
        payment_method: string;
      }
    ];
  };
}

// ------------------ Types ------------------
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

const PaymentTable = () => {
  const { msonline_auth } = React.useContext<any>(AuthContext);
  const [payment, setPayment] = useState<PaymentItem[]>([]);
  const [connections, setConnections] = useState<ConnectionType[]>([]);
  const [connectionLoading, setConnectionLoading] = useState(false);
  const [billingsLoading, setBillingsLoading] = useState(false);
  const [selectedConnection, setSelectedConnection] =
    useState<ConnectionType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // 🔹 Fetch bills for selected connection
  const getPayments = async (connectionId: number) => {
    if (!connectionId) return;
    setBillingsLoading(true);
    try {
      const res = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/${connectionId}/payments`,
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.token}`,
          },
        }
      );
      setPayment(res.data.data.data);
      setCurrentPage(res.data.data.current_page);
      setLastPage(res.data.data.last_page);
    } catch (error) {
      console.error("Error fetching payment:", error);
    } finally {
      setBillingsLoading(false);
    }
  };

  // 🔹 Fetch available connections
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

      // auto-select first connection
      if (res.data.data.length > 0) {
        setSelectedConnection(res.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setConnectionLoading(false);
    }
  };

  // 🔹 Load connections on mount
  useEffect(() => {
    getConnections();
  }, []);

  // 🔹 Fetch bills when connection changes
  useEffect(() => {
    if (selectedConnection) {
      getPayments(selectedConnection.id);
    }
  }, [selectedConnection]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };

  if (billingsLoading) {
    return (
      <Card>
        <CardContent className="pt-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-10 w-48" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <TableHead key={idx}>
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    {Array.from({ length: 6 }).map((_, cellIdx) => (
                      <TableCell key={cellIdx}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="lg:text-lg text-sm font-semibold text-primary">
              Payment Table
            </h4>
            <div className="flex items-center gap-3 lg:flex-row flex-col">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="
                inline-flex items-center justify-between
               lg:w-48 w-24 px-3 py-2
                bg-white border border-primary/60 rounded-md
                shadow-sm text-sm font-medium text-primary
                hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
                  >
                    {selectedConnection
                      ? selectedConnection.package.name
                      : "Select Connection"}
                    <ChevronDown className="ml-2 h-4 w-4 text-primary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {connectionLoading ? (
                    <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                  ) : (
                    connections.map((connection) => (
                      <DropdownMenuItem
                        key={connection.id}
                        onClick={() => setSelectedConnection(connection)}
                      >
                        {connection.package.name}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <CreatePayment />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Voucher</TableHead>
                <TableHead>Bills</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingsLoading ? (
                <TableRow>
                  <TableCell colSpan={8}>Loading bills...</TableCell>
                </TableRow>
              ) : payment.length > 0 ? (
                payment.map((billing) => (
                  <TableRow key={billing.id}>
                    <TableCell>{billing.month}</TableCell>
                    <TableCell>{billing.voucher || "-"}</TableCell>
                    <TableCell>{billing.bills}</TableCell>
                    <TableCell>{billing.paid}</TableCell>
                    <TableCell>{billing.discount}</TableCell>
                    <TableCell>{billing.remarks || "-"}</TableCell>
                    <TableCell>{billing.payment_date}</TableCell>
                    <TableCell>{billing.payment_method}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>No bills found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={handlePrev}
              disabled={currentPage === 1}
              variant="outline"
              className="border border-primary/60"
              size={"sm"}
            >
              Previous
            </Button>
            <span className="flex items-center px-2 lg:text-sm text-xs">
              Page {currentPage} of {lastPage}
            </span>
            <Button
              onClick={handleNext}
              disabled={currentPage === lastPage}
              variant="outline"
              className="border border-primary/60"
              size={"sm"}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentTable;
