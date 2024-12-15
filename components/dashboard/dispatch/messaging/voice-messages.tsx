"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Mic, Play, Pause, Square, Send, Trash2 } from "lucide-react";
import { useVoiceRecorder } from "@/lib/hooks/use-voice-recorder";
import { toast } from "sonner";

interface VoiceMessage {
  id: string;
  recipientId: string;
  audioUrl: string;
  duration: number;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  createdAt: string;
}

export function VoiceMessages() {
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();

  const handleStartRecording = () => {
    if (!selectedRecipient) {
      toast.error("Please select a recipient first");
      return;
    }
    startRecording();
  };

  const handleStopRecording = async () => {
    const audioBlob = await stopRecording();
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const newMessage: VoiceMessage = {
        id: crypto.randomUUID(),
        recipientId: selectedRecipient,
        audioUrl,
        duration: 0, // Calculate actual duration
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handlePlay = (audioUrl: string) => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }

    const audio = new Audio(audioUrl);
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
    };
    audio.play();
    setIsPlaying(true);
    setCurrentAudio(audio);
  };

  const handlePause = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  };

  const handleSend = (messageId: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId
        ? { ...msg, status: 'sent' as const }
        : msg
    ));
    toast.success("Voice message sent successfully");
  };

  const handleDelete = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    toast.success("Voice message deleted");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Voice Communication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Recipient</Label>
            <Select
              value={selectedRecipient}
              onValueChange={setSelectedRecipient}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_drivers">All Drivers</SelectItem>
                <SelectItem value="active_drivers">Active Drivers</SelectItem>
                <SelectItem value="driver_1">John Driver</SelectItem>
                <SelectItem value="driver_2">Jane Driver</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center py-8">
            <Button
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`rounded-full h-16 w-16 ${isRecording ? 'animate-pulse' : ''}`}
            >
              {isRecording ? (
                <Square className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
          </div>

          {isRecording && (
            <div className="text-center text-sm text-muted-foreground animate-pulse">
              Recording... Click to stop
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Voice Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => isPlaying ? handlePause() : handlePlay(message.audioUrl)}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <div>
                      <div className="font-medium">
                        {message.recipientId === 'all_drivers' ? 'All Drivers' : message.recipientId}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(message.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      message.status === 'sent' ? 'success' :
                      message.status === 'delivered' ? 'success' :
                      message.status === 'failed' ? 'destructive' :
                      'secondary'
                    }>
                      {message.status}
                    </Badge>
                    {message.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSend(message.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}