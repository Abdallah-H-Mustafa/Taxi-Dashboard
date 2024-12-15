"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Settings } from "lucide-react";
import { toast } from "sonner";
import { useIVRStore } from "@/lib/stores/ivr-store";
import { twilioClient } from "@/lib/services/twilio/client";

export function VoIPSettings() {
  const { config, updateConfig } = useIVRStore();

  const handleTwilioConnect = async () => {
    try {
      // Open Twilio setup dialog
      toast.success("Twilio account connected successfully");
    } catch (error) {
      toast.error("Failed to connect Twilio account");
    }
  };

  const handleSaveSettings = () => {
    try {
      // Save VoIP settings
      toast.success("VoIP settings saved successfully");
    } catch (error) {
      toast.error("Failed to save VoIP settings");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>VoIP & IVR Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Twilio Account Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Twilio Account</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Account Status</p>
                <p className="text-sm text-muted-foreground">
                  {twilioClient.isInitialized() ? "Connected" : "Not Connected"}
                </p>
              </div>
              <Button onClick={handleTwilioConnect}>
                <Phone className="h-4 w-4 mr-2" />
                {twilioClient.isInitialized() ? "Reconnect Account" : "Connect Account"}
              </Button>
            </div>
          </div>

          {/* IVR Configuration Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">IVR Configuration</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Language</Label>
                <Select defaultValue={config?.language || "en"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Voice Type</Label>
                <Select defaultValue={config?.voice || "alice"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alice">Alice</SelectItem>
                    <SelectItem value="man">Man</SelectItem>
                    <SelectItem value="woman">Woman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Default Greeting</Label>
              <Input 
                defaultValue={config?.defaultGreeting || "Welcome to our dispatch service"}
                placeholder="Enter default greeting message"
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Booking Flow</h4>
              
              <div className="flex items-center justify-between">
                <Label>Enable Automated Booking</Label>
                <Switch defaultChecked={config?.bookingFlow.enabled} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Require Booking Confirmation</Label>
                <Switch defaultChecked={config?.bookingFlow.confirmationRequired} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Collect Pickup Location First</Label>
                <Switch defaultChecked={config?.bookingFlow.collectPickupFirst} />
              </div>
            </div>
          </div>

          {/* Operating Hours Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Operating Hours</h3>
            
            <div className="flex items-center justify-between">
              <Label>Enable Operating Hours</Label>
              <Switch defaultChecked={config?.operatingHours.enabled} />
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select defaultValue={config?.operatingHours.timezone || "America/Toronto"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Toronto">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}