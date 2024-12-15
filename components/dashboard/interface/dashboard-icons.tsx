"use client";

import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Map,
  Layers,
  MapPinned,
  Route,
  History,
  Users,
  CarFront,
  UserCircle,
  Calendar,
  Zap,
  PhoneCall,
  Search,
  Clock,
  MessageSquare,
  Bell,
  AlertTriangle,
  Headphones,
  ArrowRightLeft,
  Settings,
} from "lucide-react";

interface DashboardIconProps {
  icon: typeof Map;
  label: string;
  color: string;
  onClick?: () => void;
  isActive?: boolean;
  count?: number;
  isMapIcon?: boolean;
}

const DashboardIcon = memo(function DashboardIcon({ 
  icon: Icon, 
  label, 
  color, 
  onClick, 
  isActive,
  count,
  isMapIcon
}: DashboardIconProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center h-[42px] px-2 py-1 min-w-[60px] hover:bg-accent/50 relative ${
        isMapIcon ? 'flex-row gap-1.5' : 'flex-col'
      }`}
      onClick={onClick}
    >
      <Icon className={`h-3.5 w-3.5 ${color} ${isActive ? 'animate-pulse' : ''}`} />
      <span className={`text-[10px] font-medium ${isMapIcon ? 'mt-0' : 'mt-0.5'}`}>{label}</span>
      {count !== undefined && count > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-3.5 min-w-3.5 p-0 flex items-center justify-center text-[9px] animate-pulse"
        >
          {count}
        </Badge>
      )}
    </Button>
  );
});

interface DashboardIconsProps {
  onIconClick: (action: string) => void;
  currentDate: Date;
  isCallActive?: boolean;
  openCallCount?: number;
}

export const DashboardIcons = memo(function DashboardIcons({
  onIconClick,
  currentDate,
  isCallActive,
  openCallCount = 0
}: DashboardIconsProps) {
  const icons = [
    { icon: Map, label: "Live Map", color: "text-blue-500", action: "map", isMapIcon: true },
    { icon: Layers, label: "Zones", color: "text-purple-500", action: "zones" },
    { icon: MapPinned, label: "Address", color: "text-green-500", action: "address" },
    { icon: Route, label: "Trip", color: "text-orange-500", action: "trip" },
    { icon: History, label: "Track History", color: "text-yellow-500", action: "tracking" },
    { icon: Users, label: "Drivers", color: "text-pink-500", action: "drivers" },
    { icon: CarFront, label: "Vehicles", color: "text-cyan-500", action: "vehicles" },
    { icon: UserCircle, label: "Customers", color: "text-indigo-500", action: "customers" },
    { icon: ArrowRightLeft, label: "Indirection", color: "text-violet-500", action: "indirection" },
    { icon: Zap, label: "Rush Mode", color: "text-red-500", action: "rush" },
    { icon: PhoneCall, label: "Open Calls", color: "text-emerald-500", action: "calls", count: openCallCount },
    { icon: Clock, label: "Scheduled", color: "text-violet-500", action: "scheduled" },
    { icon: Search, label: "Search Trip", color: "text-amber-500", action: "search" },
    { icon: MessageSquare, label: "Messages", color: "text-teal-500", action: "messages" },
    { icon: Bell, label: "Reminders", color: "text-rose-500", action: "reminders" },
    { icon: AlertTriangle, label: "Emergency", color: "text-red-600", action: "emergency" },
    { icon: Headphones, label: "VoIP", color: isCallActive ? "text-green-500" : "text-blue-400", action: "voip", isActive: isCallActive },
    { icon: Settings, label: "Settings", color: "text-gray-500", action: "settings" }
  ];

  return (
    <div className="w-full py-1.5">
      <div className="flex items-center justify-between px-3">
        <div className="flex flex-wrap gap-2">
          {icons.map(({ icon, label, color, action, isActive, count, isMapIcon }) => (
            <DashboardIcon
              key={action}
              icon={icon}
              label={label}
              color={color}
              onClick={() => onIconClick(action)}
              isActive={isActive}
              count={count}
              isMapIcon={isMapIcon}
            />
          ))}
        </div>
        <Badge variant="outline" className="flex items-center gap-2 ml-4 h-[42px] px-3">
          <Calendar className="h-3.5 w-3.5" />
          {format(currentDate, "PP")}
        </Badge>
      </div>
    </div>
  );
});