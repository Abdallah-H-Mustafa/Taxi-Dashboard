"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, PhoneForwarded, PhoneOff, VolumeX, Volume2, Minimize2, Maximize2, Settings, Phone as PhoneIcon } from "lucide-react";
import { motion, useDragControls } from "framer-motion";
import { TwilioSetupDialog } from "./ivr/twilio-setup-dialog";
import { IVRConfigDialog } from "./ivr/ivr-config-dialog";
import { twilioClient } from "@/lib/services/twilio/client";
import { useIVRStore } from "@/lib/stores/ivr-store";
import { toast } from "sonner";

interface VoIPCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caller?: {
    name: string;
    phone: string;
    reason?: string;
  };
}

export function VoIPCallDialog({ open, onOpenChange, caller }: VoIPCallDialogProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTwilioSetup, setShowTwilioSetup] = useState(false);
  const [showIVRConfig, setShowIVRConfig] = useState(false);
  const [activeTab, setActiveTab] = useState<'call' | 'settings'>('call');
  const dragControls = useDragControls();

  const { config: ivrConfig } = useIVRStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      setCallDuration(0);
    };
  }, [open]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = () => {
    console.log("Call answered");
  };

  const handleForward = () => {
    console.log("Call forwarded");
  };

  const handleHangup = () => {
    console.log("Call ended");
    onOpenChange(false);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    console.log("Mute toggled:", !isMuted);
  };

  const handleSettingsClick = () => {
    if (!twilioClient.isInitialized()) {
      setShowTwilioSetup(true);
    } else {
      setShowIVRConfig(true);
    }
  };

  if (!open) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        className="fixed z-50 top-20 right-4 w-[400px]"
      >
        <div className="bg-background border rounded-lg shadow-lg overflow-hidden">
          <div 
            className="p-3 bg-muted cursor-move flex items-center justify-between"
            onPointerDown={(e) => dragControls.start(e)}
          >
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {formatDuration(callDuration)}
              </Badge>
              <span className="text-sm font-medium">
                {caller?.name || "VoIP Interface"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setActiveTab(activeTab === 'call' ? 'settings' : 'call')}
              >
                {activeTab === 'call' ? (
                  <Settings className="h-3 w-3" />
                ) : (
                  <PhoneIcon className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3" />
                ) : (
                  <Minimize2 className="h-3 w-3" />
                )}
              </Button>
              {caller && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:text-destructive"
                  onClick={handleHangup}
                >
                  <PhoneOff className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {!isMinimized && (
            <div className="p-4">
              <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
                <TabsContent value="call" className="space-y-4 mt-0">
                  {caller ? (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{caller.phone}</p>
                      </div>

                      {caller.reason && (
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs">{caller.reason}</p>
                        </div>
                      )}

                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={handleToggleMute}
                          aria-label={isMuted ? "Unmute call" : "Mute call"}
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4 text-red-500" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="default"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600"
                          onClick={handleAnswer}
                          aria-label="Answer call"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={handleForward}
                          aria-label="Forward call"
                        >
                          <PhoneForwarded className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center text-sm text-muted-foreground">
                        No active calls
                      </div>
                      {ivrConfig ? (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-2">
                            IVR is configured and active
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowIVRConfig(true)}
                          >
                            Modify IVR Settings
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-2">
                            Set up IVR to handle automated calls
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSettingsClick}
                          >
                            Configure IVR
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setShowTwilioSetup(true)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Twilio Account Settings
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setShowIVRConfig(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      IVR Configuration
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </motion.div>

      <TwilioSetupDialog
        open={showTwilioSetup}
        onOpenChange={setShowTwilioSetup}
      />

      <IVRConfigDialog
        open={showIVRConfig}
        onOpenChange={setShowIVRConfig}
      />
    </>
  );
}