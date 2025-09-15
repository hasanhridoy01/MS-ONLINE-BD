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

const Billings = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="billings">
        <TabsList>
          <TabsTrigger value="billings">Billings</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>
        <TabsContent value="billings">
          <Card>
            <CardHeader>
              <CardTitle>Billings</CardTitle>
              <CardDescription>
                Make changes to your billings here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
              <CardDescription>
                Change your payment here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Save payment</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="statements">
          <Card>
            <CardHeader>
              <CardTitle>Statements</CardTitle>
              <CardDescription>
                Download your statements here. After saving, you&apos;ll be
                logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Download statements</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billings;
