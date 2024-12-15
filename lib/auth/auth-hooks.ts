"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/providers/auth-provider';
import { validateSession } from './auth-utils';

export function useAuthGuard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !validateSession()) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
}

export function useRedirectIfAuthenticated() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && validateSession()) {
      if (user?.role === 'company' && user?.companyId) {
        router.push(`/dashboard/companies/${user.companyId}/dispatch/interface`);
      } else if (user?.role === 'dispatcher' && user?.companyId) {
        router.push(`/dashboard/companies/${user.companyId}/dispatch/interface`);
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);
}

export function useRequirePermission(permission: string) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.permissions.includes(permission) && !user?.permissions.includes('*')) {
      router.push('/dashboard');
    }
  }, [permission, user, router]);
}