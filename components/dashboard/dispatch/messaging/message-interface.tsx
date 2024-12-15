"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatMessages } from "./chat-messages";
import { StaticMessages } from "./static-messages";
import { ScheduledMessages } from "./scheduled-messages";
import { PushNotifications } from "./push-notifications";
import { VoiceMessages } from "./voice-messages";

export function MessageInterface() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="h-[calc(100vh-10rem)]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="static">Static</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="push">Push</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
        </TabsList>

        <div className="mt-4 h-[calc(100%-4rem)] overflow-hidden">
          <TabsContent value="chat" className="h-full m-0">
            <ChatMessages />
          </TabsContent>

          <TabsContent value="static" className="h-full m-0">
            <StaticMessages />
          </TabsContent>

          <TabsContent value="scheduled" className="h-full m-0">
            <ScheduledMessages />
          </TabsContent>

          <TabsContent value="push" className="h-full m-0">
            <PushNotifications />
          </TabsContent>

          <TabsContent value="voice" className="h-full m-0">
            <VoiceMessages />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}