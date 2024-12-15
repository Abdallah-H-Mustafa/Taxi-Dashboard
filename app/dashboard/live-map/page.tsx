"use client";

import { LiveMap } from "@/components/dashboard/dispatch/live-map";

export default function LiveMapPage() {
  return (
    <div className="flex-1 p-4">
      <LiveMap isFullPage />
    </div>
  );
}