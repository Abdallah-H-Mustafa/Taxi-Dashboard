"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LiveMap } from "./live-map";
import { BookingInterface } from "./booking-interface";
import { DispatchQueue } from "./queue";
import { VoIPCallDialog } from "./voip-call-dialog";
import { DriverListDialog } from "./driver-list-dialog";
import { OpenCallsDialog } from "./open-calls-dialog";
import { IndirectionZonesDialog } from "./indirection-zones-dialog";
import { MessageDialog } from "./messaging/message-dialog";
import { useVoIP } from "@/lib/hooks/use-voip";
import { useTripQueueStore } from "@/lib/stores/trip-queue-store";
import { DispatchHeader } from "./header";
import { TripStatusList } from "./trip-status-list";
import { IVRConfigDialog } from "./ivr/ivr-config-dialog";
import { TwilioSetupDialog } from "./ivr/twilio-setup-dialog";
import { DispatchSettingsDialog } from "./settings/dispatch-settings-dialog";

export function DispatchInterface() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDriverListOpen, setIsDriverListOpen] = useState(false);
  const [isOpenCallsOpen, setIsOpenCallsOpen] = useState(false);
  const [isIndirectionOpen, setIsIndirectionOpen] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showIVRConfig, setShowIVRConfig] = useState(false);
  const [showTwilioSetup, setShowTwilioSetup] = useState(false);
  
  const { isCallActive, currentCaller, setIsCallActive } = useVoIP();
  const { trips } = useTripQueueStore();

  // Get open call trips
  const openCallTrips = trips.filter(trip => 
    trip.zones.includes('OPEN_CALL') && 
    trip.status === 'pending'
  );

  // Get regular trips
  const regularTrips = trips.filter(trip => 
    !trip.zones.includes('OPEN_CALL') && 
    trip.status === 'pending'
  );

  const handleIconClick = (action: string) => {
    switch (action) {
      case "map":
        setIsMapOpen(true);
        break;
      case "drivers":
        setIsDriverListOpen(true);
        break;
      case "calls":
        setIsOpenCallsOpen(true);
        break;
      case "indirection":
        setIsIndirectionOpen(true);
        break;
      case "messages":
        setShowMessageDialog(true);
        break;
      case "settings":
        setShowSettings(true);
        break;
      case "voip":
        setShowTwilioSetup(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DispatchHeader 
        openCallCount={openCallTrips.length}
        onMapOpen={() => setIsMapOpen(true)}
        onDriverListOpen={() => setIsDriverListOpen(true)}
        onOpenCallsOpen={() => setIsOpenCallsOpen(true)}
        onIconClick={handleIconClick}
      />

      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3">
            <BookingInterface />
          </div>

          <div className="col-span-7">
            <DispatchQueue />
          </div>

          <div className="col-span-2">
            <TripStatusList trips={regularTrips} />
          </div>
        </div>
      </div>

      {isMapOpen && (
        <LiveMap isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      )}

      <VoIPCallDialog
        open={isCallActive}
        onOpenChange={setIsCallActive}
        caller={currentCaller}
      />

      <DriverListDialog
        open={isDriverListOpen}
        onOpenChange={setIsDriverListOpen}
      />

      <OpenCallsDialog
        open={isOpenCallsOpen}
        onOpenChange={setIsOpenCallsOpen}
      />

      <IndirectionZonesDialog
        open={isIndirectionOpen}
        onOpenChange={setIsIndirectionOpen}
      />

      <MessageDialog
        open={showMessageDialog}
        onOpenChange={setShowMessageDialog}
      />

      <DispatchSettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
      />

      <TwilioSetupDialog
        open={showTwilioSetup}
        onOpenChange={setShowTwilioSetup}
      />

      <IVRConfigDialog
        open={showIVRConfig}
        onOpenChange={setShowIVRConfig}
      />
    </div>
  );
}