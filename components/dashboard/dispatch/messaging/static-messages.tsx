"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface StaticMessage {
  id: string;
  title: string;
  content: string;
  recipients: string[];
  active: boolean;
  showOnLogin: boolean;
  requireAcknowledgment: boolean;
  expiryDate?: string;
}

export function StaticMessages() {
  const [messages, setMessages] = useState<StaticMessage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<StaticMessage>>({
    title: "",
    content: "",
    recipients: [],
    active: true,
    showOnLogin: true,
    requireAcknowledgment: false
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newMessage: StaticMessage = {
      id: crypto.randomUUID(),
      title: formData.title!,
      content: formData.content!,
      recipients: formData.recipients || [],
      active: formData.active || true,
      showOnLogin: formData.showOnLogin || true,
      requireAcknowledgment: formData.requireAcknowledgment || false,
      expiryDate: formData.expiryDate
    };

    setMessages([...messages, newMessage]);
    setShowForm(false);
    setFormData({});
    toast.success("Static message created successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Static Messages</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Message
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Static Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label>Show on Login</Label>
                <Switch
                  checked={formData.showOnLogin}
                  onCheckedChange={(checked) => setFormData({ ...formData, showOnLogin: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Require Acknowledgment</Label>
                <Switch
                  checked={formData.requireAcknowledgment}
                  onCheckedChange={(checked) => setFormData({ ...formData, requireAcknowledgment: checked })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Expiry Date (Optional)</Label>
              <Input
                type="datetime-local"
                value={formData.expiryDate || ""}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Create Message
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{message.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {message.content}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {message.recipients.map((recipient) => (
                      <Badge key={recipient} variant="secondary">
                        {recipient}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}