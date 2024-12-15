"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  X,
  Minimize2
} from "lucide-react";

interface IconSetting {
  id: string;
  label: string;
  icon: typeof Map;
  enabled: boolean;
  color: string;
  required?: boolean;
}

export default function DispatchIconSettingsPage() {
  const [iconSettings, setIconSettings] = useState<IconSetting[]>([
    { id: "map", label: "Live Map", icon: Map, enabled: true, color: "text-blue-500", required: true },
    { id: "zones", label: "Zones", icon: Layers, enabled: true, color: "text-purple-500" },
    { id: "address", label: "Address", icon: MapPinned, enabled: true, color: "text-green-500" },
    { id: "trip", label: "Trip", icon: Route, enabled: true, color: "text-orange-500" },
    { id: "tracking", label: "Track History", icon: History, enabled: true, color: "text-yellow-500" },
    { id: "drivers", label: "Drivers", icon: Users, enabled: true, color: "text-pink-500" },
    { id: "vehicles", label: "Vehicles", icon: CarFront, enabled: true, color: "text-cyan-500" },
    { id: "customers", label: "Customers", icon: UserCircle, enabled: true, color: "text-indigo-500" },
    { id: "indirection", label: "Indirection", icon: ArrowRightLeft, enabled: true, color: "text-violet-500" },
    { id: "rush", label: "Rush Mode", icon: Zap, enabled: true, color: "text-red-500" },
    { id: "calls", label: "Open Calls", icon: PhoneCall, enabled: true, color: "text-emerald-500" },
    { id: "scheduled", label: "Scheduled", icon: Clock, enabled: true, color: "text-violet-500" },
    { id: "search", label: "Search Trip", icon: Search, enabled: true, color: "text-amber-500" },
    { id: "messages", label: "Messages", icon: MessageSquare, enabled: true, color: "text-teal-500" },
    { id: "reminders", label: "Reminders", icon: Bell, enabled: true, color: "text-rose-500" },
    { id: "emergency", label: "Emergency", icon: AlertTriangle, enabled: true, color: "text-red-600" },
    { id: "voip", label: "VoIP", icon: Headphones, enabled: true, color: "text-blue-400" },
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();

  const handleToggle = (id: string, enabled: boolean) => {
    // Don't allow disabling required icons
    const icon = iconSettings.find(i => i.id === id);
    if (icon?.required && !enabled) {
      toast.error("This icon cannot be disabled");
      return;
    }

    setIconSettings(prev => 
      prev.map(icon => 
        icon.id === id ? { ...icon, enabled } : icon
      )
    );
    
    // Save to localStorage
    localStorage.setItem('dispatch_icon_settings', JSON.stringify(
      iconSettings.map(icon => 
        icon.id === id ? { ...icon, enabled } : icon
      )
    ));

    toast.success("Icon settings updated");
  };

  const handleReset = () => {
    setIconSettings(prev => prev.map(icon => ({ ...icon, enabled: true })));
    localStorage.removeItem('dispatch_icon_settings');
    toast.success("Icon settings reset to default");
  };

  const handleClose = () => {
    router.back();
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Settings</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(false)}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dispatch Interface Icons</h2>
        <div className="flex items-center gap-2">
          <Button onClick={handleReset}>Reset to Default</Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Icon Visibility Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iconSettings.map((icon) => (
              <div
                key={icon.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-md bg-muted ${icon.color}`}>
                    <icon.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <Label htmlFor={icon.id} className="font-medium">
                      {icon.label}
                    </Label>
                    {icon.required && (
                      <p className="text-xs text-muted-foreground">Required</p>
                    )}
                  </div>
                </div>
                <Switch
                  id={icon.id}
                  checked={icon.enabled}
                  onCheckedChange={(checked) => handleToggle(icon.id, checked)}
                  disabled={icon.required}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}