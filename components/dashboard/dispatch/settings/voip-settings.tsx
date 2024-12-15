"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useIVRStore } from "@/lib/stores/ivr-store";
import { twilioClient } from "@/lib/services/twilio/client";

export function VoIPSettings() {
  const { config, updateConfig } = useIVRStore();
  const [formData, setFormData] = useState({
    language: config?.language || "en",
    voice: config?.voice || "alice",
    defaultGreeting: config?.defaultGreeting || "Welcome to our dispatch service",
    bookingFlow: {
      enabled: config?.bookingFlow.enabled ?? true,
      confirmationRequired: config?.bookingFlow.confirmationRequired ?? true,
      collectPickupFirst: config?.bookingFlow.collectPickupFirst ?? true,
      messages: {
        pickupPrompt: config?.bookingFlow.messages.pickupPrompt || "Please say your pickup location",
        dropoffPrompt: config?.bookingFlow.messages.dropoffPrompt || "Please say your destination",
        confirmationPrompt: config?.bookingFlow.messages.confirmationPrompt || "Your trip details are [pickup] to [dropoff]. Press 1 to confirm",
        etaMessage: config?.bookingFlow.messages.etaMessage || "Your estimated wait time is [eta] minutes"
      }
    },
    operatingHours: {
      enabled: config?.operatingHours.enabled ?? true,
      timezone: config?.operatingHours.timezone || "America/Toronto",
      schedule: config?.operatingHours.schedule || {
        monday: { start: "00:00", end: "23:59" },
        tuesday: { start: "00:00", end: "23:59" },
        wednesday: { start: "00:00", end: "23:59" },
        thursday: { start: "00:00", end: "23:59" },
        friday: { start: "00:00", end: "23:59" },
        saturday: { start: "00:00", end: "23:59" },
        sunday: { start: "00:00", end: "23:59" }
      }
    }
  });

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
      updateConfig(formData);
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
                <Select 
                  value={formData.language}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                >
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
                <Select 
                  value={formData.voice}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, voice: value }))}
                >
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
                value={formData.defaultGreeting}
                onChange={(e) => setFormData(prev => ({ ...prev, defaultGreeting: e.target.value }))}
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Booking Flow</h4>
              
              <div className="flex items-center justify-between">
                <Label>Enable Automated Booking</Label>
                <Switch 
                  checked={formData.bookingFlow.enabled}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    bookingFlow: { ...prev.bookingFlow, enabled: checked }
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Require Booking Confirmation</Label>
                <Switch 
                  checked={formData.bookingFlow.confirmationRequired}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    bookingFlow: { ...prev.bookingFlow, confirmationRequired: checked }
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Collect Pickup Location First</Label>
                <Switch 
                  checked={formData.bookingFlow.collectPickupFirst}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    bookingFlow: { ...prev.bookingFlow, collectPickupFirst: checked }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Pickup Prompt</Label>
                <Input 
                  value={formData.bookingFlow.messages.pickupPrompt}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bookingFlow: {
                      ...prev.bookingFlow,
                      messages: { ...prev.bookingFlow.messages, pickupPrompt: e.target.value }
                    }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Dropoff Prompt</Label>
                <Input 
                  value={formData.bookingFlow.messages.dropoffPrompt}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bookingFlow: {
                      ...prev.bookingFlow,
                      messages: { ...prev.bookingFlow.messages, dropoffPrompt: e.target.value }
                    }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Confirmation Prompt</Label>
                <Input 
                  value={formData.bookingFlow.messages.confirmationPrompt}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bookingFlow: {
                      ...prev.bookingFlow,
                      messages: { ...prev.bookingFlow.messages, confirmationPrompt: e.target.value }
                    }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>ETA Message</Label>
                <Input 
                  value={formData.bookingFlow.messages.etaMessage}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bookingFlow: {
                      ...prev.bookingFlow,
                      messages: { ...prev.bookingFlow.messages, etaMessage: e.target.value }
                    }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Operating Hours Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Operating Hours</h3>
            
            <div className="flex items-center justify-between">
              <Label>Enable Operating Hours</Label>
              <Switch 
                checked={formData.operatingHours.enabled}
                onCheckedChange={(checked) => setFormData(prev => ({
                  ...prev,
                  operatingHours: { ...prev.operatingHours, enabled: checked }
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select 
                value={formData.operatingHours.timezone}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  operatingHours: { ...prev.operatingHours, timezone: value }
                }))}
              >
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

            <div className="space-y-4">
              {Object.entries(formData.operatingHours.schedule).map(([day, hours]) => (
                <div key={day} className="grid grid-cols-3 gap-4 items-center">
                  <Label className="capitalize">{day}</Label>
                  <Input
                    type="time"
                    value={hours.start}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      operatingHours: {
                        ...prev.operatingHours,
                        schedule: {
                          ...prev.operatingHours.schedule,
                          [day]: { ...hours, start: e.target.value }
                        }
                      }
                    }))}
                  />
                  <Input
                    type="time"
                    value={hours.end}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      operatingHours: {
                        ...prev.operatingHours,
                        schedule: {
                          ...prev.operatingHours.schedule,
                          [day]: { ...hours, end: e.target.value }
                        }
                      }
                    }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save VoIP Settings</Button>
      </div>
    </div>
  );
}