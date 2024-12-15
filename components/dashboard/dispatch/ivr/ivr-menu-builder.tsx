"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { IVRAction } from "@/types/ivr";

interface IVRMenuBuilderProps {
  actions: IVRAction[];
  onChange: (actions: IVRAction[]) => void;
}

export function IVRMenuBuilder({ actions, onChange }: IVRMenuBuilderProps) {
  const addMenuOption = (actionIndex: number) => {
    const action = actions[actionIndex];
    if (!action.options) {
      action.options = {};
    }
    
    const nextKey = Object.keys(action.options).length + 1;
    action.options[nextKey.toString()] = { action: "forward" };
    
    onChange([...actions]);
  };

  const removeMenuOption = (actionIndex: number, key: string) => {
    const action = actions[actionIndex];
    if (action.options) {
      delete action.options[key];
      onChange([...actions]);
    }
  };

  const updateMenuOption = (actionIndex: number, key: string, value: string) => {
    const action = actions[actionIndex];
    if (action.options) {
      action.options[key] = { action: value };
      onChange([...actions]);
    }
  };

  return (
    <div className="space-y-4">
      {actions.map((action, actionIndex) => (
        <div key={actionIndex} className="space-y-4 p-4 border rounded-lg">
          <div className="space-y-2">
            <Label>Menu Message</Label>
            <Input
              value={action.message}
              onChange={(e) => {
                action.message = e.target.value;
                onChange([...actions]);
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Menu Options</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addMenuOption(actionIndex)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>

            {action.options && Object.entries(action.options).map(([key, option]) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-12 text-center">
                  <span className="text-sm font-medium">{key}</span>
                </div>
                <Select
                  value={option.action}
                  onValueChange={(value) => updateMenuOption(actionIndex, key, value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Book Trip</SelectItem>
                    <SelectItem value="status">Trip Status</SelectItem>
                    <SelectItem value="forward">Forward to Dispatch</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMenuOption(actionIndex, key)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}