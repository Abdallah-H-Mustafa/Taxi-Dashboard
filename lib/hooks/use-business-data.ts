"use client";

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface BusinessData {
  stats: {
    orders: number;
    revenue: number;
    customers: number;
    prepTime: number;
  };
  popularItems: Array<{
    id: string;
    name: string;
    orders: number;
    rating: number;
  }>;
  recentOrders: Array<{
    id: string;
    items: number;
    total: number;
    status: string;
  }>;
}

export function useBusinessData(businessId: string) {
  return useQuery<BusinessData>({
    queryKey: ['business', businessId],
    queryFn: async () => {
      // In a real app, this would be an API call
      // For now, return mock data
      return {
        stats: {
          orders: 156,
          revenue: 4289,
          customers: 2845,
          prepTime: 24
        },
        popularItems: [
          { id: '1', name: 'Item 1', orders: 45, rating: 4.9 },
          { id: '2', name: 'Item 2', orders: 40, rating: 4.8 },
          { id: '3', name: 'Item 3', orders: 35, rating: 4.7 },
          { id: '4', name: 'Item 4', orders: 30, rating: 4.6 }
        ],
        recentOrders: [
          { id: '1', items: 4, total: 30, status: 'Preparing' },
          { id: '2', items: 5, total: 35, status: 'Ready' },
          { id: '3', items: 6, total: 40, status: 'Completed' },
          { id: '4', items: 7, total: 45, status: 'Completed' }
        ]
      };
    },
    staleTime: 30000, // Data considered fresh for 30 seconds
    cacheTime: 5 * 60 * 1000 // Cache data for 5 minutes
  });
}