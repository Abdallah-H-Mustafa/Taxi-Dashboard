"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Driver, GasExpense } from "@/types/driver";
import { useDriverStore } from "@/lib/stores/driver-store";
import { toast } from "sonner";

interface DriverGasExpensesProps {
  driver: Driver;
  onUpdate: () => void;
}

export function DriverGasExpenses({ driver, onUpdate }: DriverGasExpensesProps) {
  const [newExpense, setNewExpense] = useState<{ day: string; amount: string }>({
    day: 'monday',
    amount: '',
  });

  const addExpense = (day: string) => {
    if (!newExpense.amount || isNaN(parseFloat(newExpense.amount))) {
      toast.error("Please enter a valid amount");
      return;
    }

    const expense: GasExpense = {
      amount: parseFloat(newExpense.amount),
      date: new Date().toISOString(),
    };

    const updatedExpenses = { ...driver.gasExpenses };
    updatedExpenses[day as keyof typeof updatedExpenses] = [
      ...(updatedExpenses[day as keyof typeof updatedExpenses] || []),
      expense,
    ];

    // Recalculate totals
    const weeklyTotal = Object.values(updatedExpenses)
      .flat()
      .reduce((sum, exp) => sum + (typeof exp === 'number' ? exp : exp.amount), 0);

    const updatedDriver = {
      ...driver,
      gasExpenses: {
        ...updatedExpenses,
        weeklyTotal,
        monthlyTotal: weeklyTotal * 4, // Approximate
        yearlyTotal: weeklyTotal * 52, // Approximate
      },
    };

    useDriverStore.getState().drivers.set(driver.id, updatedDriver);
    onUpdate();
    setNewExpense({ day: 'monday', amount: '' });
    toast.success("Gas expense added successfully");
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className="space-y-2">
            <Label className="capitalize">{day}</Label>
            <div className="space-y-2">
              {driver.gasExpenses[day as keyof typeof driver.gasExpenses]?.map((expense, index) => (
                <div key={index} className="text-sm">
                  ${expense.amount.toFixed(2)}
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  value={newExpense.day === day ? newExpense.amount : ''}
                  onChange={(e) => setNewExpense({ day, amount: e.target.value })}
                  className="h-8"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addExpense(day)}
                  className="h-8"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Weekly Total</Label>
          <div className="text-lg font-bold">
            ${driver.gasExpenses.weeklyTotal.toFixed(2)}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Monthly Total</Label>
          <div className="text-lg font-bold">
            ${driver.gasExpenses.monthlyTotal.toFixed(2)}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Yearly Total</Label>
          <div className="text-lg font-bold">
            ${driver.gasExpenses.yearlyTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}