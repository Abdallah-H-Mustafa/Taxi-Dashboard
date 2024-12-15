"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface FinancialSettings {
  fees: {
    dispatchFee: number;
    serviceFee: number;
    cancellationFee: number;
    minimumFare: number;
    baseRate: number;
    perKilometer: number;
    perMinute: number;
    waitingTime: number;
  };
  payment: {
    acceptCash: boolean;
    acceptCard: boolean;
    acceptWallet: boolean;
    autoSettlement: boolean;
    settlementPeriod: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  };
  taxes: {
    gst: boolean;
    gstRate: number;
    pst: boolean;
    pstRate: number;
    hst: boolean;
    hstRate: number;
  };
  billing: {
    companyName: string;
    taxNumber: string;
    billingAddress: string;
    billingEmail: string;
    billingPhone: string;
  };
}

export function FinancialSettings() {
  const [settings, setSettings] = useState<FinancialSettings>({
    fees: {
      dispatchFee: 120,
      serviceFee: 5,
      cancellationFee: 10,
      minimumFare: 15,
      baseRate: 4.50,
      perKilometer: 2.25,
      perMinute: 0.55,
      waitingTime: 0.65,
    },
    payment: {
      acceptCash: true,
      acceptCard: true,
      acceptWallet: true,
      autoSettlement: true,
      settlementPeriod: 'weekly',
    },
    taxes: {
      gst: true,
      gstRate: 5,
      pst: false,
      pstRate: 0,
      hst: false,
      hstRate: 0,
    },
    billing: {
      companyName: "Caribou Cabs",
      taxNumber: "123456789",
      billingAddress: "123 Main St, Iqaluit, NU X0A 0H0",
      billingEmail: "billing@cariboucabs.com",
      billingPhone: "(867) 979-1234",
    },
  });

  const handleSave = () => {
    // Save settings logic here
    toast.success("Financial settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trip Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Dispatch Fee (Daily)</Label>
              <Input
                type="number"
                value={settings.fees.dispatchFee}
                onChange={(e) => setSettings({
                  ...settings,
                  fees: { ...settings.fees, dispatchFee: parseFloat(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Service Fee (%)</Label>
              <Input
                type="number"
                value={settings.fees.serviceFee}
                onChange={(e) => setSettings({
                  ...settings,
                  fees: { ...settings.fees, serviceFee: parseFloat(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Cancellation Fee</Label>
              <Input
                type="number"
                value={settings.fees.cancellationFee}
                onChange={(e) => setSettings({
                  ...settings,
                  fees: { ...settings.fees, cancellationFee: parseFloat(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Fare</Label>
              <Input
                type="number"
                value={settings.fees.minimumFare}
                onChange={(e) => setSettings({
                  ...settings,
                  fees: { ...settings.fees, minimumFare: parseFloat(e.target.value) }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rate Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Base Rate</Label>
              <Input
                type="number"
                value={settings.fees.baseRate}
                onChange={(e) => setSettings({
                  ...settings,
                  fees: { ...settings.fees, baseRate: parseFloat(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Per Kilometer</Label>
              <Input
                type="number"
                value={settings.fees.perKilometer}
                onChange={(e) => setSettings({
                  ...settings,
                  fees: { ...settings.fees, perKilometer: parseFloat(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Per Minute</Label>
              <Input
                type="number"
                value={settings.fees.perMinute}
                onChange={(e) => setSettings({
                  ...settings,
                  fees: { ...settings.fees, perMinute: parseFloat(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Waiting Time (per minute)</Label>
              <Input
                type="number"
                value={settings.fees.waitingTime}
                onChange={(e) => setSettings({
                  ...settings,
                  fees: { ...settings.fees, waitingTime: parseFloat(e.target.value) }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.payment.acceptCash}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    payment: { ...settings.payment, acceptCash: checked }
                  })}
                />
                <Label>Accept Cash</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.payment.acceptCard}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    payment: { ...settings.payment, acceptCard: checked }
                  })}
                />
                <Label>Accept Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.payment.acceptWallet}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    payment: { ...settings.payment, acceptWallet: checked }
                  })}
                />
                <Label>Accept Wallet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.payment.autoSettlement}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    payment: { ...settings.payment, autoSettlement: checked }
                  })}
                />
                <Label>Auto Settlement</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Settlement Period</Label>
              <Select
                value={settings.payment.settlementPeriod}
                onValueChange={(value: any) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, settlementPeriod: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.taxes.gst}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        taxes: { ...settings.taxes, gst: checked }
                      })}
                    />
                    <Label>GST</Label>
                  </div>
                  <Input
                    type="number"
                    className="w-24"
                    value={settings.taxes.gstRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      taxes: { ...settings.taxes, gstRate: parseFloat(e.target.value) }
                    })}
                    disabled={!settings.taxes.gst}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.taxes.pst}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        taxes: { ...settings.taxes, pst: checked }
                      })}
                    />
                    <Label>PST</Label>
                  </div>
                  <Input
                    type="number"
                    className="w-24"
                    value={settings.taxes.pstRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      taxes: { ...settings.taxes, pstRate: parseFloat(e.target.value) }
                    })}
                    disabled={!settings.taxes.pst}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.taxes.hst}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        taxes: { ...settings.taxes, hst: checked }
                      })}
                    />
                    <Label>HST</Label>
                  </div>
                  <Input
                    type="number"
                    className="w-24"
                    value={settings.taxes.hstRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      taxes: { ...settings.taxes, hstRate: parseFloat(e.target.value) }
                    })}
                    disabled={!settings.taxes.hst}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={settings.billing.companyName}
                onChange={(e) => setSettings({
                  ...settings,
                  billing: { ...settings.billing, companyName: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tax Number</Label>
              <Input
                value={settings.billing.taxNumber}
                onChange={(e) => setSettings({
                  ...settings,
                  billing: { ...settings.billing, taxNumber: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Billing Address</Label>
              <Input
                value={settings.billing.billingAddress}
                onChange={(e) => setSettings({
                  ...settings,
                  billing: { ...settings.billing, billingAddress: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Billing Email</Label>
              <Input
                type="email"
                value={settings.billing.billingEmail}
                onChange={(e) => setSettings({
                  ...settings,
                  billing: { ...settings.billing, billingEmail: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Billing Phone</Label>
              <Input
                value={settings.billing.billingPhone}
                onChange={(e) => setSettings({
                  ...settings,
                  billing: { ...settings.billing, billingPhone: e.target.value }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Financial Settings</Button>
      </div>
    </div>
  );
}