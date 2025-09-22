import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Add interface for props
interface BillingsProps {
  ConnectionId: number;
}

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

interface BillingItem {
  month: string;
  total: number;
  dues: number;
  paid: number;
  remarks: Remark;
  created_at: string;
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
    data: BillingItem[];
  };
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

interface ApiResponsePayment {
  status: boolean;
  message: string;
  data: {
    from: number;
    to: number;
    per_page: number;
    current_page: number;
    last_page: number;
    total: number;
    data: PaymentItem[];
  };
}

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

const Billings: React.FC<BillingsProps> = ({ ConnectionId }) => {
  const { msonline_auth } = React.useContext<any>(AuthContext);
  const [billings, setBillings] = React.useState<BillingItem[]>([]);
  const [billingsLoading, setBillingsLoading] = React.useState<boolean>(false);
  const [payments, setPayments] = React.useState<PaymentItem[]>([]);
  const [paymentsLoading, setPaymentsLoading] = React.useState<boolean>(false);
  const [customer, setCustomer] = React.useState<CustomerType | null>(null);
  const [customerLoading, setCustomerLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [lastPage, setLastPage] = React.useState<number>(1);

  // 🔹 Fetch bills for selected connection
  const getBillings = async (ConnectionId: number) => {
    if (!ConnectionId) return;
    setBillingsLoading(true);
    try {
      const res = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/${ConnectionId}/bills`,
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.token}`,
          },
        }
      );
      setBillings(res.data.data.data);
      setCurrentPage(res.data.data.current_page);
      setLastPage(res.data.data.last_page);
    } catch (error) {
      console.error("Error fetching billings:", error);
    } finally {
      setBillingsLoading(false);
    }
  };

  // 🔹 Fetch bills for selected connection
  const getPayments = async (ConnectionId: number) => {
    if (!ConnectionId) return;
    setBillingsLoading(true);
    try {
      const res = await axios.get<ApiResponsePayment>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/${ConnectionId}/payments`,
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.token}`,
          },
        }
      );
      setPayments(res.data.data.data);
      setCurrentPage(res.data.data.current_page);
      setLastPage(res.data.data.last_page);
    } catch (error) {
      console.error("Error fetching payment:", error);
    } finally {
      setBillingsLoading(false);
    }
  };

  const getCustomer = async (ConnectionId: number) => {
    setCustomerLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/${ConnectionId}`,
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
    setCustomerLoading(false);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };

  React.useEffect(() => {
    getBillings(ConnectionId);
    getPayments(ConnectionId);
    getCustomer(ConnectionId);
  }, [ConnectionId]);

  const renderBillingsContent = () => {
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
                Billing Table
              </h4>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Dues</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Remarks By</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billings.length > 0 ? (
                  billings.map((billing, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{billing.month}</TableCell>
                      <TableCell>{billing.total}</TableCell>
                      <TableCell>{billing.dues}</TableCell>
                      <TableCell>{billing.paid}</TableCell>
                      <TableCell>{billing.remarks.by}</TableCell>
                      <TableCell>{billing.created_at}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>No bills found</TableCell>
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
                className="border border-primary/60 text-primary"
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
                className="border border-primary/60 text-primary"
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

  const renderPaymentsContent = () => {
    if (paymentsLoading) {
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
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <TableHead key={idx}>
                        <Skeleton className="h-4 w-24" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <TableRow key={idx}>
                      {Array.from({ length: 8 }).map((_, cellIdx) => (
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
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>{payment.voucher || "-"}</TableCell>
                      <TableCell>{payment.bills}</TableCell>
                      <TableCell>{payment.paid}</TableCell>
                      <TableCell>{payment.discount}</TableCell>
                      <TableCell>{payment.remarks || "-"}</TableCell>
                      <TableCell>{payment.payment_date}</TableCell>
                      <TableCell>{payment.payment_method}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>No payments found</TableCell>
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
                className="border border-primary/60 text-primary"
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
                className="border border-primary/60 text-primary"
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

  const renderCustomerDetails = () => {
    return (
      <Card>
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
                  <p>{customer?.id}</p>
                </div>
                <div>
                  <p className="font-medium">Status:</p>
                  <Badge
                    variant={
                      customer?.status === "Active" ? "default" : "destructive"
                    }
                  >
                    {customer?.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="font-medium">Name:</p>
                <p>{customer?.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Email:</p>
                  <p>{customer?.email}</p>
                </div>
                <div>
                  <p className="font-medium">Phone:</p>
                  <p>{customer?.phone}</p>
                </div>
              </div>

              <div>
                <p className="font-medium">Address:</p>
                <p>{customer?.address}</p>
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
                    ? new Date(customer.extended_due_date).toLocaleDateString()
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
    );
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="customer">
        <TabsList>
          <TabsTrigger value="customer">Customer Details</TabsTrigger>
          <TabsTrigger value="billings">Billing</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="billings">{renderBillingsContent()}</TabsContent>

        <TabsContent value="payment">{renderPaymentsContent()}</TabsContent>

        <TabsContent value="statements">
          <Card>
            <CardHeader>
              <CardTitle>Statements for Customer #{ConnectionId}</CardTitle>
              <CardDescription>
                View and download customer statements.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Statements content here */}
            </CardContent>
            <CardFooter>
              <Button>Download Statements</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="customer">{renderCustomerDetails()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Billings;
