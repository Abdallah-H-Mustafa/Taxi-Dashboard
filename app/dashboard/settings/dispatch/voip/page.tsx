"use client";

import { VoIPSettings } from "@/components/dashboard/settings/dispatch/voip-settings";

export default function VoIPSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">VoIP & IVR Settings</h2>
      </div>

      <VoIPSettings />
    </div>
  );
}