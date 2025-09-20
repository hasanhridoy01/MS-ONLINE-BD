"use client";

import React, { useContext, useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";

export default function LoginModal() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const handleSnackbarOpen = useHandleSnackbar();
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);

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
      login(res.data);
      setCustomerId("");
      setPassword("");
      // ✅ Close dialog after login success
      setOpen(false);
      router.push("/dashboard");
      handleSnackbarOpen("Login Successful", "success", 3000);
    } catch (error) {
      console.error("Login error:", error);
      handleSnackbarOpen("Failed", "error", 3000);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 transition-colors rounded-[6px] font-inter text-sm">
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
                <Label htmlFor="customer-id">Customer Name</Label>
                <Input
                  id="customer-id"
                  name="customer_id"
                  value={customerId}
                  placeholder="Customer Name"
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>
              <div className="grid gap-3 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-sm text-primary hover:underline"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

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
                Login
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
