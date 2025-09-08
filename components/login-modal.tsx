"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import useHandleSnackbar from '@/lib/HandleSnakbar';

export default function LoginModal() {
  const handleSnackbarOpen = useHandleSnackbar();
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/token`,
        {
          customer_id: customerId,
          password: password,
        }
      );

      console.log("Login response:", res.data);
      handleSnackbarOpen("Successful", "success", 3000);
    } catch (error) {
      console.error("Login error:", error);
      handleSnackbarOpen("Failed", "error", 3000);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 hidden lg:block transition-colors rounded-[8px] font-inter">
            LOGIN
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-2">
              <DialogTitle>Login to your account</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. You can change the
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="customer-id">Customer ID</Label>
                <Input
                  id="customer-id"
                  name="customer_id"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>
              <div className="grid gap-3 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-sm text-primary hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="outline" className="rounded-[7px]">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="rounded-[7px]">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
