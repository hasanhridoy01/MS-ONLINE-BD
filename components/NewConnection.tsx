"use client";

import React, { useContext, useState, useEffect, use } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import useHandleSnackbar from "@/lib/HandleSnakbar";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import PaymentProcessing from "@/app/dashboard/components/PaymentProcessing";
import { Package } from "../app/dashboard/components/Billings";

export default function NewConnection() {
  const { msonline_auth } = useContext(AuthContext);
  const handleSnackbarOpen = useHandleSnackbar();
  const [open, setOpen] = React.useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentURL, setPaymentURL] = useState<string>("");

  //post input field value state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<string>("");

  const [districtId, setDistrictId] = useState<string>("");
  const [thanaId, setThanaId] = useState<string>("");
  const [zoneId, setZoneId] = useState<string>("");
  const [areaId, setAreaId] = useState<string>("");
  const [gatewayId, setGatewayId] = useState<string>("");
  const [packageId, setPackageId] = useState<string>("");

  //get data state
  const [districts, setDistricts] = useState<any[]>([]);
  const [thana, setThana] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [gateway, setGateway] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);

  //fetch districts on mount
  useEffect(() => {
    if (!open) return;

    const fetchDistricts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cms/district`,
          {
            headers: {
              Authorization: `Bearer ${msonline_auth.access_token}`,
            },
          }
        );
        setDistricts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDistricts();
  }, [open, msonline_auth.access_token]);

  //fetch thana when district changes
  useEffect(() => {
   if (!open || !districtId) return;

    const fetchThana = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cms/thana?district_id=${districtId}`,
          {
            headers: {
              Authorization: `Bearer ${msonline_auth.access_token}`,
            },
          }
        );
        setThana(res.data.data);
        setThanaId("");
        setZones([]);
        setAreas([]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchThana();
  }, [open, districtId, msonline_auth.access_token]);

  //fetch zones when thana changes
  useEffect(() => {
    if (!open || !thanaId) return;

    const fetchZones = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cms/zone?sub_district_id=${thanaId}`,
          {
            headers: {
              Authorization: `Bearer ${msonline_auth.access_token}`,
            },
          }
        );
        setZones(res.data.data);
        setZoneId("");
        setAreas([]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchZones();
  }, [open, thanaId, msonline_auth.access_token]);

  //fetch areas when zone changes
  useEffect(() => {
    if (!open || !zoneId) return;

    const fetchAreas = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cms/area?zone_id=${zoneId}`,
          {
            headers: {
              Authorization: `Bearer ${msonline_auth.access_token}`,
            },
          }
        );
        setAreas(res.data.data);
        setAreaId("");
      } catch (error) {
        console.log(error);
      }
    };
    fetchAreas();
  }, [open, zoneId, msonline_auth.access_token]);

  useEffect(() => {
    if (!open) return;

    const fetchGateway = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/gateway`,
          {
            headers: {
              Authorization: `Bearer ${msonline_auth.access_token}`,
            },
          }
        );
        setGateway(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGateway();
  }, [open, msonline_auth.access_token]);

  useEffect(() => {
    const fetchConnection = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/init`
        );
        setDeals(res.data.data.deals);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConnection();
  }, [msonline_auth.access_token]);

  //apply function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create URLSearchParams instead of plain object if API expects form data
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("message", message);
    formData.append("package_id", packageId);
    formData.append("district_id", districtId);
    formData.append("thana_id", thanaId);
    formData.append("zone_id", zoneId);
    formData.append("area_id", areaId);
    formData.append("type", type);
    formData.append("gateway_id", gatewayId);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/apply`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Redirect to payment URL or show success
      if (res.data.data.payment?.paymentURL) {
        setProcessing(true);
        setPaymentURL(res.data.data.payment.paymentURL);
      } else {
        handleSnackbarOpen("We have not received your payment", "error", 3000);
      }

      setOpen(false);
      handleSnackbarOpen("NewConnection submitted!", "success");
    } catch (error: any) {
      console.error(error);

      if (error.response && error.response.data) {
        const { messages, errors } = error.response.data;

        // ✅ Show field-specific validation error if exists
        if (errors && Object.values(errors).length > 0) {
          const firstErrorArray = Object.values(errors)[0] as string[];
          const firstError = firstErrorArray[0];
          handleSnackbarOpen(firstError, "error");
          return;
        }

        // ✅ Otherwise, show general message if available
        if (messages && messages.length > 0) {
          handleSnackbarOpen(messages[0], "error", 3000);
          return;
        }
      }

      // ✅ Fallback: generic error
      handleSnackbarOpen(
        "Failed to submit application. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>Get a new connection NOW!</button>
        </DialogTrigger>
        <DialogContent className="md:max-w-xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-4">
              <DialogTitle>Apply for a New Connection</DialogTitle>
              <DialogDescription>
                Fill out the form below to apply for a new connection.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2">
              <div className="grid gap-3">
                <Label htmlFor="customer-name">Customer Name</Label>
                <Input
                  required
                  id="customer-name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label>Packages</Label>
                <Select value={packageId} onValueChange={setPackageId}>
                  <SelectTrigger className="w-full border border-primary bg-background px-3 py-2 rounded-[7px] focus:outline-none focus:ring-0 focus:border-primary">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {deals.flatMap((deal) =>
                        deal.items.map((item: any) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* name + email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3 relative">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    required
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="mobile-number">Mobile Number</Label>
                  <Input
                    required
                    id="mobile-number"
                    type="number"
                    placeholder="Enter Your Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>

              {/* type + gateway */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3 relative">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    required
                    id="type"
                    type="text"
                    placeholder="Enter Your Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Gateway</Label>
                  <Select value={gatewayId} onValueChange={setGatewayId}>
                    <SelectTrigger
                      className={`w-full border border-primary bg-background px-3 py-2 rounded-[7px] focus:outline-none focus:ring-0 focus:border-primary`}
                    >
                      <SelectValue placeholder="Select Gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {gateway.map((g) => (
                          <SelectItem key={g.id} value={g.id.toString()}>
                            {g.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Cascading selects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label>District</Label>
                  <Select value={districtId} onValueChange={setDistrictId}>
                    <SelectTrigger
                      className={`w-full border border-primary bg-background px-3 py-2 rounded-[7px] focus:outline-none focus:ring-0 focus:border-primary`}
                    >
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {districts.map((d) => (
                          <SelectItem key={d.id} value={d.id.toString()}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label>Thana</Label>
                  <Select
                    disabled={!districtId}
                    value={thanaId}
                    onValueChange={setThanaId}
                  >
                    <SelectTrigger
                      className={`w-full border border-primary bg-background px-3 py-2 rounded-[7px] focus:outline-none focus:ring-0 focus:border-primary`}
                    >
                      <SelectValue placeholder="Select Thana" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {thana.map((t) => (
                          <SelectItem key={t.id} value={t.id.toString()}>
                            {t.name}
                          </SelectItem>
                        ))}
                        {thana.length === 0 && (
                          <SelectItem value="0">No Thana Found</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Zone */}
                <div className="grid gap-3">
                  <Label>Zone</Label>
                  <Select
                    disabled={!thanaId}
                    value={zoneId}
                    onValueChange={setZoneId}
                  >
                    <SelectTrigger
                      className={`w-full border border-primary bg-background px-3 py-2 rounded-[7px] focus:outline-none focus:ring-0 focus:border-primary`}
                    >
                      <SelectValue placeholder="Select Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {zones.map((z) => (
                          <SelectItem key={z.id} value={z.id.toString()}>
                            {z.name}
                          </SelectItem>
                        ))}
                        {zones.length === 0 && (
                          <SelectItem value="0">No Zone Found</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Area */}
                <div className="grid gap-3">
                  <Label>Area</Label>
                  <Select
                    disabled={!zoneId}
                    value={areaId}
                    onValueChange={setAreaId}
                  >
                    <SelectTrigger
                      className={`w-full border border-primary bg-background px-3 py-2 rounded-[7px] focus:outline-none focus:ring-0 focus:border-primary`}
                    >
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {areas.map((a) => (
                          <SelectItem key={a.id} value={a.id.toString()}>
                            {a.name}
                          </SelectItem>
                        ))}
                        {areas.length === 0 && (
                          <SelectItem value="0">No Area Found</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Footer */}
            <DialogFooter className="lg:mt-4 mt-5">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="rounded-[7px] lg:mt-0 mt-3"
                  size={"sm"}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="rounded-[7px]" size={"sm"}>
                Apply
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
