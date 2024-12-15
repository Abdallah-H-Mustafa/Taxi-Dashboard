"use client";

import { DashboardIcons } from "../interface/dashboard-icons";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";

interface DispatchHeaderProps {
  openCallCount: number;
  onMapOpen: () => void;
  onDriverListOpen: () => void;
  onOpenCallsOpen: () => void;
  onIconClick: (action: string) => void;
}

export function DispatchHeader({ 
  openCallCount,
  onMapOpen,
  onDriverListOpen,
  onOpenCallsOpen,
  onIconClick
}: DispatchHeaderProps) {
  const [date] = useState(new Date());
  const router = useRouter();

  const handleIconClick = useCallback((action: string) => {
    switch (action) {
      case "map":
        onMapOpen();
        break;
      case "zones":
        router.push("/dashboard/zones");
        break;
      case "address":
        router.push("/dashboard/addresses");
        break;
      case "drivers":
        onDriverListOpen();
        break;
      case "calls":
        onOpenCallsOpen();
        break;
      default:
        onIconClick(action);
        break;
    }
  }, [router, onMapOpen, onDriverListOpen, onOpenCallsOpen, onIconClick]);

  const handleLogout = () => {
    localStorage.removeItem("company_auth");
    localStorage.removeItem("dispatcher_auth");
    router.push("/login");
  };

  const handleSettings = () => {
    onIconClick("settings");
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="w-full px-4 flex items-center justify-between">
        <DashboardIcons 
          onIconClick={handleIconClick}
          currentDate={date}
          isCallActive={false}
          openCallCount={openCallCount}
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