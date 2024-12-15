"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Clock, Users, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ScheduledMessage {
  id: string;
  title: string;
  content: string;
  sender: string;
  recipients: string[];
  scheduledTime: string;
  duration: number;
  repeat: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: string;
  };
  status: 'pending' | 'sent' | 'cancelled';
}

export function ScheduledMessages() {
  const [activeTab, setActiveTab] = useState("new");
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);
  const [formData, setFormData] = useState<Partial<ScheduledMessage>>({
    title: "",
    content: "",
    sender: "Dispatch",
    recipients: [],
    duration: 30,
    repeat: {
      enabled: false,
      frequency: 'daily'
    }
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.content || !formData.scheduledTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newMessage: ScheduledMessage = {
      id: crypto.randomUUID(),
      title: formData.title,
      content: formData.content,
      sender: formData.sender || "Dispatch",
      recipients: formData.recipients || [],
      scheduledTime: formData.scheduledTime,
      duration: formData.duration || 30,
      repeat: formData.repeat || { enabled: false, frequency: 'daily' },
      status: 'pending'
    };

    setMessages([...messages, newMessage]);
    setFormData({});
    setActiveTab("upcoming");
    toast.success("Scheduled message created successfully");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
      <TabsList>
        <TabsTrigger value="new">Schedule New</TabsTrigger>
        <TabsTrigger value="recurring">Recurring</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
      </TabsList>

      <TabsContent value="new" className="h-[calc(100%-2rem)] mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Input
                value={formData.sender || ""}
                onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                placeholder="Enter sender name"
              />
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter message title"
              />
            </div>

            <div className="space-y-2">
              <Label>Message Content</Label>
              <Textarea
                value={formData.content || ""}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter message content"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Schedule Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={formData.scheduledTime || ""}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={formData.duration || ""}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Recipients</Label>
              <Select
                value={formData.recipients?.[0]}
                onValueChange={(value) => setFormData({ ...formData, recipients: [value] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_drivers">All Drivers</SelectItem>
                  <SelectItem value="active_drivers">Active Drivers</SelectItem>
                  <SelectItem value="dispatchers">Dispatchers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Repeat Message</Label>
                <Switch
                  checked={formData.repeat?.enabled}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    repeat: { ...formData.repeat!, enabled: checked }
                  })}
                />
              </div>

              {formData.repeat?.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select
                      value={formData.repeat.frequency}
                      onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setFormData({
                        ...formData,
                        repeat: { ...formData.repeat!, frequency: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.repeat.endDate || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        repeat: { ...formData.repeat!, endDate: e.target.value }
                      })}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSubmit}>Schedule Message</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recurring" className="h-[calc(100%-2rem)] mt-4">
        <div className="space-y-4">
          {messages
            .filter(msg => msg.repeat.enabled)
            .map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium">{message.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {message.content}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {message.repeat.frequency}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(message.scheduledTime).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {message.recipients.join(", ")}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="upcoming" className="h-[calc(100%-2rem)] mt-4">
        <div className="space-y-4">
          {messages
            .filter(msg => msg.status === 'pending')
            .map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{message.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {message.content}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(message.scheduledTime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(message.scheduledTime).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {message.recipients.join(", ")}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}