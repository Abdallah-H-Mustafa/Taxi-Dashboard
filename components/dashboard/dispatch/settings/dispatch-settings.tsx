"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Phone, 
  Map, 
  Layers, 
  Zap, 
  Settings as SettingsIcon,
  Eye,
  Route,
  Car,
  Calculator,
  Ruler,
  Headphones,
  Bell,
  AlertTriangle,
  MessageSquare,
  Search,
  Clock,
  PhoneCall,
  ArrowRightLeft,
  UserCircle,
  CarFront,
  Users,
  History,
  X,
  Minimize2,
  Maximize2
} from "lucide-react";

// Import settings components
import { VoIPSettings } from "./voip-settings";
import { MapSettings } from "./map-settings";
import { ZoneSettings } from "./zone-settings";
import { RushModeSettings } from "./rush-mode-settings";
import { DispatchRules } from "./dispatch-rules";
import { IconVisibilitySettings } from "./icon-visibility-settings";
import { TripSettings } from "./trip-settings";
import { DriverSettings } from "./driver-settings";
import { FareSettings } from "./fare-settings";
import { ZoneDistanceSettings } from "./zone-distance-settings";

interface SettingsOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  component: React.ComponentType<any>;
}

interface DispatchSettingsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
}

export function DispatchSettings({ onClose, onMinimize, isMinimized }: DispatchSettingsProps) {
  const [activeView, setActiveView] = useState<string | null>(null);

  const settingsOptions: SettingsOption[] = [
    {
      id: 'voip',
      title: 'VoIP & IVR Settings',
      description: 'Configure call handling and IVR menus',
      icon: Phone,
      component: VoIPSettings
    },
    {
      id: 'map',
      title: 'Map Settings',
      description: 'Customize map appearance and behavior',
      icon: Map,
      component: MapSettings
    },
    {
      id: 'zones',
      title: 'Zone Settings',
      description: 'Manage dispatch zones and boundaries',
      icon: Layers,
      component: ZoneSettings
    },
    {
      id: 'rush',
      title: 'Rush Mode Settings',
      description: 'Configure peak hours and surge pricing',
      icon: Zap,
      component: RushModeSettings
    },
    {
      id: 'rules',
      title: 'Dispatch Rules',
      description: 'Set up automated dispatch rules',
      icon: SettingsIcon,
      component: DispatchRules
    },
    {
      id: 'icons',
      title: 'Interface Icons',
      description: 'Customize visible interface elements',
      icon: Eye,
      component: IconVisibilitySettings
    },
    {
      id: 'trips',
      title: 'Trip Settings',
      description: 'Configure trip handling and rules',
      icon: Route,
      component: TripSettings
    },
    {
      id: 'drivers',
      title: 'Driver Settings',
      description: 'Set driver preferences and rules',
      icon: Car,
      component: DriverSettings
    },
    {
      id: 'fares',
      title: 'Fare Calculation',
      description: 'Configure pricing and fare rules',
      icon: Calculator,
      component: FareSettings
    },
    {
      id: 'distances',
      title: 'Zone Distances',
      description: 'Set distance limits and restrictions',
      icon: Ruler,
      component: ZoneDistanceSettings
    }
  ];

  const renderContent = () => {
    if (!activeView) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {settingsOptions.map((option) => (
            <Card 
              key={option.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => setActiveView(option.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    const selectedOption = settingsOptions.find(opt => opt.id === activeView);
    if (!selectedOption) return null;

    const Component = selectedOption.component;
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          onClick={() => setActiveView(null)}
          className="mb-4"
        >
          ← Back to Settings
        </Button>
        <Component />
      </div>
    );
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                <span className="font-medium">Settings</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMinimize}
                  className="h-8 w-8"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                {onClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <div className="flex items-center gap-2">
            {onMinimize && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMinimize}
                className="h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-16rem)]">
          {renderContent()}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}