"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AddDriverForm } from "@/components/dashboard/drivers/add-driver-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddDriverPage() {
  const router = useRouter();

  return (
    <div className="flex-1 p-4 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Add New Driver</h2>
      </div>

      <Card className="p-4">
        <AddDriverForm />
      </Card>
    </div>
  );
}