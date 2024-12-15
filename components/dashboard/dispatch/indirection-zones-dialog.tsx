"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useZoneStore } from "@/lib/stores/zone-store";

interface IndirectionZonesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IndirectionZonesDialog({ open, onOpenChange }: IndirectionZonesDialogProps) {
  const { zones } = useZoneStore();

  // Group zones by type
  const primaryZones = zones.filter(z => z.number.startsWith('P'));
  const mainZones = zones.filter(z => z.number.startsWith('MZ'));
  const subZones = zones.filter(z => z.number.startsWith('SZ'));

  // Create grid rows for each zone type
  const createZoneGrid = (zoneList: typeof zones, rows: number = 8) => {
    const grid = Array(rows).fill(null).map(() => Array(24).fill(null));
    zoneList.forEach((zone, index) => {
      const row = Math.floor(index / 24);
      const col = index % 24;
      if (row < rows) {
        grid[row][col] = zone;
      }
    });
    return grid;
  };

  const primaryGrid = createZoneGrid(primaryZones);
  const mainGrid = createZoneGrid(mainZones);
  const subGrid = createZoneGrid(subZones);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Indirection Zones</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="space-y-8 pr-4">
            {/* Primary Zones */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Primary Zones</h3>
              <div className="grid gap-2">
                {primaryGrid.map((row, rowIndex) => (
                  <div key={`p-${rowIndex}`} className="grid grid-cols-24 gap-2">
                    {row.map((zone, colIndex) => (
                      <Button
                        key={`p-${rowIndex}-${colIndex}`}
                        variant={zone ? "default" : "outline"}
                        className={`h-12 text-xs font-medium ${
                          zone ? 'bg-primary animate-pulse' : ''
                        }`}
                        disabled={!zone}
                      >
                        {zone?.number}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Zones */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Main Zones</h3>
              <div className="grid gap-2">
                {mainGrid.map((row, rowIndex) => (
                  <div key={`m-${rowIndex}`} className="grid grid-cols-24 gap-2">
                    {row.map((zone, colIndex) => (
                      <Button
                        key={`m-${rowIndex}-${colIndex}`}
                        variant={zone ? "default" : "outline"}
                        className={`h-12 text-xs font-medium ${
                          zone ? 'bg-primary animate-pulse' : ''
                        }`}
                        disabled={!zone}
                      >
                        {zone?.number}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Sub Zones */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Sub Zones</h3>
              <div className="grid gap-2">
                {subGrid.map((row, rowIndex) => (
                  <div key={`s-${rowIndex}`} className="grid grid-cols-24 gap-2">
                    {row.map((zone, colIndex) => (
                      <Button
                        key={`s-${rowIndex}-${colIndex}`}
                        variant={zone ? "default" : "outline"}
                        className={`h-12 text-xs font-medium ${
                          zone ? 'bg-primary animate-pulse' : ''
                        }`}
                        disabled={!zone}
                      >
                        {zone?.number}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}