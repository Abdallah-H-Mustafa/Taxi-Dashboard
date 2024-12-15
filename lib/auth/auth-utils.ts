"use client";

import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from './constants';
import { AuthUser } from './types';
import Cookies from 'js-cookie';

export function getTokenExpiration(token: string): Date | null {
  try {
    const decoded = jwtDecode(token);
    if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded) {
      return new Date((decoded.exp as number) * 1000);
    }
  } catch (error) {
    console.error('Error decoding token:', error);
  }
  return null;
}

export function isTokenExpired(token: string): boolean {
  const expiration = getTokenExpiration(token);
  if (!expiration) return true;
  return expiration.getTime() <= Date.now();
}

export function clearAuthData(): void {
  Cookies.remove(AUTH_TOKEN_KEY);
  Cookies.remove(USER_DATA_KEY);
  Cookies.remove('admin_auth');
  Cookies.remove('company_auth');
  Cookies.remove('dispatcher_auth');
  localStorage.removeItem('lastLoginTime');
}

export function setAuthData(token: string, user: AuthUser): void {
  const expiresIn = 24 * 60 * 60; // 24 hours
  
  Cookies.set(AUTH_TOKEN_KEY, token, {
    secure: true,
    sameSite: 'strict',
    expires: 1
  });
  
  Cookies.set(USER_DATA_KEY, JSON.stringify(user), {
    secure: true,
    sameSite: 'strict',
    expires: 1
  });

  // Set role-specific auth
  const authData = JSON.stringify({ user, token });
  switch (user.role) {
    case 'super_admin':
    case 'admin':
      Cookies.set('admin_auth', authData, { secure: true, sameSite: 'strict', expires: 1 });
      break;
    case 'company':
      Cookies.set('company_auth', authData, { secure: true, sameSite: 'strict', expires: 1 });
      break;
    case 'dispatcher':
      Cookies.set('dispatcher_auth', authData, { secure: true, sameSite: 'strict', expires: 1 });
      break;
  }
  
  localStorage.setItem('lastLoginTime', Date.now().toString());
}

export function getAuthData(): { token: string | null; user: AuthUser | null } {
  const token = Cookies.get(AUTH_TOKEN_KEY) || null;
  const userData = Cookies.get(USER_DATA_KEY);
  const user = userData ? JSON.parse(userData) : null;
  
  return { token, user };
}

// Temporarily bypass authentication
export function validateSession(): boolean {
  return true; // Always return true to bypass authentication
}