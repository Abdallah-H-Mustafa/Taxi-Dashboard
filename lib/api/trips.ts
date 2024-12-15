"use client";

import { Trip, TripStatus, DeliveryOrder } from "@/types/trip";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function createTrip(tripData: Partial<Trip>): Promise<Trip> {
  const response = await fetch(`${API_BASE}/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData),
  });
  if (!response.ok) throw new Error('Failed to create trip');
  return response.json();
}

export async function createDelivery(deliveryData: Partial<DeliveryOrder>): Promise<DeliveryOrder> {
  const response = await fetch(`${API_BASE}/deliveries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deliveryData),
  });
  if (!response.ok) throw new Error('Failed to create delivery');
  return response.json();
}

export async function assignTrip(tripId: string, driverId: string): Promise<Trip> {
  const response = await fetch(`${API_BASE}/trips/${tripId}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ driverId }),
  });
  if (!response.ok) throw new Error('Failed to assign trip');
  return response.json();
}

export async function assignDelivery(deliveryId: string, driverId: string): Promise<DeliveryOrder> {
  const response = await fetch(`${API_BASE}/deliveries/${deliveryId}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ driverId }),
  });
  if (!response.ok) throw new Error('Failed to assign delivery');
  return response.json();
}