import { useState } from 'react';  
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';  
import { Button } from '@/components/ui/button';  
import { Input } from '@/components/ui/input';  
import { Label } from '@/components/ui/label';  
import { Textarea } from '@/components/ui/textarea';  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';  
import { Switch } from '@/components/ui/switch';  
import { Bell, Send } from 'lucide-react';  
import { toast } from 'sonner';  
  
interface PushNotification {  
  id: string;  
  title: string;  
  message: string;  
  recipients: string[];  
  priority: 'normal' | 'high' | 'urgent';  
  action?: {  
   type: string;  
   data: any;  
  };  
  scheduledFor?: string;  
  sent: boolean;  
  sentAt?: string;  
}  
  
export function PushNotifications() {  
  const [notifications, setNotifications] = useState<PushNotification[]>([]);  
  const [formData, setFormData] = useState<Partial<PushNotification>>({  
   title: '',  
   message: '',  
   recipients: [],  
   priority: 'normal',  
  });  
  const [scheduleNotification, setScheduleNotification] = useState(false);  
  
  const handleSend = () => {  
   if (!formData.title || !formData.message) {  
    toast.error('Please fill in all required fields');  
    return;  
   }  
  
   const notification: PushNotification = {  
    id: crypto.randomUUID(),  
    title: formData.title,  
    message: formData.message,  
    recipients: formData.recipients || [],  
    priority: formData.priority || 'normal',  
    scheduledFor: scheduleNotification ? formData.scheduledFor : undefined,  
    sent: !scheduleNotification,  
    sentAt: !scheduleNotification ? new Date().toISOString() : undefined,  
   };  
  
   setNotifications([...notifications, notification]);  
   setFormData({});  
   setScheduleNotification(false);  
   toast.success(scheduleNotification ? 'Notification scheduled' : 'Notification sent');  
  };  
  
  return (  
   <div className="space-y-6">  
    <Card>  
      <CardHeader>  
       <CardTitle>Send Push Notification</CardTitle>  
      </CardHeader>  
      <CardContent className="space-y-4">  
       <div className="space-y-2">  
        <Label>Title</Label>  
        <Input  
          value={formData.title || ''}  
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}  
          placeholder="Enter notification title"  
        />  
       </div>  
  
       <div className="space-y-2">  
        <Label>Message</Label>  
        <Textarea  
          value={formData.message || ''}  
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}  
          placeholder="Enter notification message"  
          rows={4}  
        />  
       </div>  
  
       <div className="grid grid-cols-2 gap-4">  
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
            <SelectItem value="all_users">All Users</SelectItem>  
            <SelectItem value="all_drivers">All Drivers</SelectItem>  
            <SelectItem value="active_drivers">Active Drivers</SelectItem>  
            <SelectItem value="passengers">Passengers</SelectItem>  
           </SelectContent>  
          </Select>  
        </div>  
  
        <div className="space-y-2">  
          <Label>Priority</Label>  
          <Select  
           value={formData.priority}  
           onValueChange={(value: 'normal' | 'high' | 'urgent') =>  
            setFormData({ ...formData, priority: value })}  
          >  
           <SelectTrigger>  
            <SelectValue placeholder="Select priority" />  
           </SelectTrigger>  
           <SelectContent>  
            <SelectItem value="normal">Normal</SelectItem>  
            <SelectItem value="high">High</SelectItem>  
            <SelectItem value="urgent">Urgent</SelectItem>  
           </SelectContent>  
          </Select>  
        </div>  
       </div>  
  
       <div className="space-y-4">  
        <div className="flex items-center justify-between">  
          <Label>Schedule Notification</Label>  
          <Switch  
           checked={scheduleNotification}  
           onCheckedChange={setScheduleNotification}  
          />  
        </div>  
  
        {scheduleNotification && (  
          <div className="space-y-2">  
           <Label>Schedule For</Label>  
           <Input  
            type="datetime-local"  
            value={formData.scheduledFor || ''}  
            onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}  
           />  
          </div>  
        )}  
       </div>  
  
       <div className="flex justify-end">  
        <Button onClick={handleSend}>  
          <Send className="h-4 w-4 mr-2" />  
          {scheduleNotification ? 'Schedule' : 'Send'} Notification  
        </Button>  
       </div>  
      </CardContent>  
    </Card>  
  
    <div className="space-y-4">  
      <h3 className="font-medium">Recent Notifications</h3>  
      {notifications.map((notification) => (  
       <Card key={notification.id}>  
        <CardContent className="p-4">  
          <div className="flex items-start justify-between">  
           <div>  
            <div className="flex items-center gap-2">  
              <Bell className="h-4 w-4 text-muted-foreground" />  
              <h4 className="font-medium">{notification.title}</h4>  
            </div>  
            <p className="text-sm text-muted-foreground mt-1">  
              {notification.message}  
            </p>  
            <div className="flex gap-2 mt-2">  
              <Badge variant="secondary">  
               {notification.recipients[0]}  
              </Badge>  
              <Badge variant={  
               notification.priority === 'urgent'  
                ? 'destructive'  
                : notification.priority === 'high'  
                ? 'warning'  
                : 'secondary'  
              }>  
               {notification.priority}  
              </Badge>  
            </div>  
           </div>  
           <div className="text-sm text-muted-foreground">  
            {notification.sent  
              ? `Sent ${new Date(notification.sentAt!).toLocaleString()}`  
              : `Scheduled for ${new Date(notification.scheduledFor!).toLocaleString()}`  
            }  
           </div>  
          </div>  
        </CardContent>  
       </Card>  
      ))}  
    </div>  
   </div>  
  );  
}
