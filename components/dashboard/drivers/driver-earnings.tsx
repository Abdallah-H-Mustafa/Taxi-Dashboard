"use client";

import { Card } from "@/components/ui/card";
import { Driver } from "@/types/driver";
import { DollarSign, TrendingUp, Calendar, Clock } from "lucide-react";

interface DriverEarningsProps {
  driver: Driver;
}

export function DriverEarnings({ driver }: DriverEarningsProps) {
  const calculateNetEarnings = () => {
    const grossEarnings = driver.earnings.trips.total.amount;
    const totalExpenses = driver.earnings.dispatchFees.total + driver.gasExpenses.weeklyTotal;
    return grossEarnings - totalExpenses;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Today's Earnings</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-2xl font-bold">${driver.earnings.today}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {driver.earnings.trips.daily.count} trips
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Weekly Earnings</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-2xl font-bold">${driver.earnings.week}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {driver.earnings.trips.weekly.count} trips
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dispatch Fees</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Daily Fee</h4>
              <div className="text-xl font-bold">
                ${driver.earnings.dispatchFees.daily}
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Weekly Fee</h4>
              <div className="text-xl font-bold">
                ${driver.earnings.dispatchFees.weekly}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Wallet Balance</h3>
        <Card className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-muted-foreground">Available Balance</h4>
                <div className="text-xl font-bold">${driver.wallet.balance}</div>
              </div>
              <div>
                <h4 className="text-sm text-muted-foreground">Pending Balance</h4>
                <div className="text-xl font-bold">${driver.wallet.pendingBalance}</div>
              </div>
            </div>
            {driver.wallet.lastTransfer && (
              <div className="text-sm text-muted-foreground">
                Last transfer: ${driver.wallet.lastTransfer.amount} on{" "}
                {new Date(driver.wallet.lastTransfer.date).toLocaleDateString()}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Net Earnings</h3>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-muted-foreground">Gross Earnings</h4>
                <div className="text-xl font-bold">
                  ${driver.earnings.trips.total.amount}
                </div>
              </div>
              <div>
                <h4 className="text-sm text-muted-foreground">Total Expenses</h4>
                <div className="text-xl font-bold text-destructive">
                  -${(driver.earnings.dispatchFees.total + driver.gasExpenses.weeklyTotal).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="text-sm text-muted-foreground">Net Earnings</h4>
              <div className="text-2xl font-bold text-green-500">
                ${calculateNetEarnings().toFixed(2)}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}