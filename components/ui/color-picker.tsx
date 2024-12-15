"use client";

import { useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { ChromePicker } from "react-color";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const PREDEFINED_COLORS = [
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Lime", value: "#84CC16" },
  { name: "Green", value: "#22C55E" },
  { name: "Emerald", value: "#10B981" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Sky", value: "#0EA5E9" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Purple", value: "#A855F7" },
  { name: "Fuchsia", value: "#D946EF" },
  { name: "Pink", value: "#EC4899" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Slate", value: "#64748B" },
];

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${className}`}
        >
          <Palette className="h-4 w-4" />
          <div
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: color }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "preset" | "custom")}>
          <div className="border-b border-border/50 px-3">
            <TabsList className="h-10">
              <TabsTrigger value="preset" className="text-xs">Preset Colors</TabsTrigger>
              <TabsTrigger value="custom" className="text-xs">Custom Color</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="preset" className="p-3">
            <div className="grid grid-cols-6 gap-2">
              {PREDEFINED_COLORS.map((presetColor) => (
                <button
                  key={presetColor.value}
                  className={`w-8 h-8 rounded-md border-2 transition-all ${
                    color === presetColor.value ? "border-primary" : "border-transparent"
                  } hover:scale-110`}
                  style={{ backgroundColor: presetColor.value }}
                  onClick={() => onChange(presetColor.value)}
                  title={presetColor.name}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="custom" className="p-3">
            <ChromePicker
              color={color}
              onChange={(newColor) => onChange(newColor.hex)}
              disableAlpha
              styles={{
                default: {
                  picker: {
                    boxShadow: 'none',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                  }
                }
              }}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}