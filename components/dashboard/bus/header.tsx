"use client";

import { DashboardIcons } from "../interface/dashboard-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";

interface BusHeaderProps {
  onMapOpen: () => void;
  onDriverListOpen: () => void;
  onVehicleListOpen: () => void;
  onIconClick: (action: string) => void;
}

export function BusHeader({ 
  onMapOpen,
  onDriverListOpen,
  onVehicleListOpen,
  onIconClick
}: BusHeaderProps) {
  const [date] = useState(new Date());
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("company_auth");
    localStorage.removeItem("dispatcher_auth");
    router.push("/login");
  };

  const handleSettings = () => {
    router.push("/dashboard/settings");
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="w-full px-4 flex items-center justify-between">
        <DashboardIcons 
          onIconClick={onIconClick}
          currentDate={date}
          isCallActive={false}
          openCallCount={0}
        />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSettings}
            className="h-9 w-9"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-9 w-9"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}