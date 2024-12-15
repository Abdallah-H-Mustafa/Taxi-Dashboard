"use client";

export type DriverStatus = 'available' | 'busy' | 'offline';

export interface DriverLocation {
  lat: number;
  lng: number;
  timestamp: string;
  accuracy?: number;
  heading?: number;
  speed?: number;
  gpsEnabled: boolean;
}

export interface DriverDocument {
  id: string;
  type: 'license' | 'insurance' | 'permit' | 'pocket_number' | 'criminal_record' | 'criminal_record_back' | 'business_license' | 'sponsorship_letter';
  number: string;
  expiryDate: string;
  issuedDate: string;
  status: 'active' | 'expired' | 'revoked';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  fileUrl?: string;
}

export interface DriverVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  type: 'sedan' | 'suv' | 'van';
  status: 'active' | 'maintenance' | 'inactive';
  lastInspection?: string;
}

export interface GasExpense {
  amount: number;
  date: string;
}

export interface GasExpenses {
  monday: GasExpense[];
  tuesday: GasExpense[];
  wednesday: GasExpense[];
  thursday: GasExpense[];
  friday: GasExpense[];
  saturday: GasExpense[];
  sunday: GasExpense[];
  weeklyTotal: number;
  monthlyTotal: number;
  yearlyTotal: number;
}

export interface DriverEarnings {
  today: number;
  week: number;
  month: number;
  total: number;
  pendingPayout: number;
  dispatchFees: {
    daily: number;
    weekly: number;
    total: number;
  };
  trips: {
    daily: {
      count: number;
      amount: number;
    };
    weekly: {
      count: number;
      amount: number;
    };
    total: {
      count: number;
      amount: number;
    };
  };
  lastPayout?: {
    amount: number;
    date: string;
    reference: string;
  };
}

export interface BankingInfo {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  transitNumber: string;
  institutionNumber: string;
  taxNumber: string;
}

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  status: DriverStatus;
  location?: DriverLocation;
  currentTrip?: string;
  currentDelivery?: string;
  vehicle?: DriverVehicle;
  documents: DriverDocument[];
  earnings: DriverEarnings;
  gasExpenses: GasExpenses;
  bankingInfo?: BankingInfo;
  rating: number;
  totalTrips: number;
  completionRate: number;
  acceptanceRate: number;
  onboardingStatus: 'pending' | 'active' | 'suspended' | 'deactivated';
  createdAt: string;
  lastActive: string;
  wallet: {
    balance: number;
    pendingBalance: number;
    lastTransfer?: {
      amount: number;
      date: string;
      status: 'pending' | 'completed' | 'failed';
    };
  };
}