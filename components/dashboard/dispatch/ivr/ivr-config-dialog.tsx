"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useIVRStore } from "@/lib/stores/ivr-store";
import { IVRAction, IVRConfig, IVRVoice } from "@/types/ivr";

interface IVRConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IVRConfigDialog({ open, onOpenChange }: IVRConfigDialogProps) {
  const { config, updateConfig } = useIVRStore();
  const [formData, setFormData] = useState<IVRConfig>(config || {
    language: "en",
    voice: "alice",
    defaultGreeting: "Welcome to our dispatch service",
    actions: [
      {
        type: "menu",
        message: "Press 1 for booking, 2 for trip status, 3 to speak with dispatch",
        options: {
          "1": { action: "booking" },
          "2": { action: "status" },
          "3": { action: "forward" }
        }
      }
    ],
    bookingFlow: {
      enabled: true,
      confirmationRequired: true,
      collectPickupFirst: true,
      messages: {
        pickupPrompt: "Please say your pickup location",
        dropoffPrompt: "Please say your destination",
        confirmationPrompt: "Your trip details are [pickup] to [dropoff]. Press 1 to confirm",
        etaMessage: "Your estimated wait time is [eta] minutes"
      }
    },
    forwardingNumbers: [],
    operatingHours: {
      enabled: true,
      timezone: "America/Toronto",
      schedule: {
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

  const handleSubmit = () => {
    try {
      updateConfig(formData);
      toast.success("IVR configuration saved successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save IVR configuration");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>IVR Configuration</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="space-y-6 pr-4">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General Settings</TabsTrigger>
                <TabsTrigger value="booking">Booking Flow</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
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
                    <Label>Voice</Label>
                    <Select 
                      value={formData.voice}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, voice: value as IVRVoice }))}
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
              </TabsContent>

              <TabsContent value="booking" className="space-y-4">
                <div className="space-y-4">
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
                    <Label>Require Confirmation</Label>
                    <Switch
                      checked={formData.bookingFlow.confirmationRequired}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        bookingFlow: { ...prev.bookingFlow, confirmationRequired: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Collect Pickup First</Label>
                    <Switch
                      checked={formData.bookingFlow.collectPickupFirst}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        bookingFlow: { ...prev.bookingFlow, collectPickupFirst: checked }
                      }))}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="messages" className="space-y-4">
                <div className="space-y-4">
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
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="space-y-4">
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
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save Configuration</Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}