"use client";

import Cookies from 'js-cookie';
import { AuthUser } from './auth/types';

export function loginAdmin(email: string, password: string): boolean {
  if (password === "admin123") {
    const adminUser = {
      id: crypto.randomUUID(),
      email,
      name: "Administrator",
      role: "admin",
      permissions: ["*"]
    };
    
    Cookies.set('admin_auth', JSON.stringify({
      user: adminUser,
      token: "mock_admin_token"
    }));
    return true;
  }
  return false;
}

export function loginCompany(companyId: string, password: string): boolean {
  if (password === "company123") {
    const companyUser = {
      id: companyId,
      name: "Company Manager",
      role: "company",
      permissions: ["manage_company"]
    };
    
    Cookies.set('company_auth', JSON.stringify({
      user: companyUser,
      token: "mock_company_token"
    }));
    return true;
  }
  return false;
}

export function loginDispatcher(dispatcherId: string, companyId: string, password: string): boolean {
  if (password === "dispatcher123") {
    const dispatcherUser = {
      id: dispatcherId,
      companyId,
      name: "Dispatcher",
      role: "dispatcher",
      permissions: ["dispatch"]
    };
    
    Cookies.set('dispatcher_auth', JSON.stringify({
      user: dispatcherUser,
      token: "mock_dispatcher_token"
    }));
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  Cookies.remove('admin_auth');
  Cookies.remove('company_auth');
  Cookies.remove('dispatcher_auth');
}

export function isAuthenticated(): boolean {
  return !!(
    Cookies.get('admin_auth') ||
    Cookies.get('company_auth') ||
    Cookies.get('dispatcher_auth')
  );
}

export function getCurrentUser(): AuthUser | null {
  const adminAuth = Cookies.get('admin_auth');
  const companyAuth = Cookies.get('company_auth');
  const dispatcherAuth = Cookies.get('dispatcher_auth');

  if (adminAuth) {
    return JSON.parse(adminAuth).user;
  }
  if (companyAuth) {
    return JSON.parse(companyAuth).user;
  }
  if (dispatcherAuth) {
    return JSON.parse(dispatcherAuth).user;
  }

  return null;
}

export function isCompanyAuthenticated(): boolean {
  const auth = Cookies.get('company_auth');
  return !!auth && JSON.parse(auth).user.role === "company";
}

export function isDispatcherAuthenticated(): boolean {
  const auth = Cookies.get('dispatcher_auth');
  return !!auth && JSON.parse(auth).user.role === "dispatcher";
}

export function hasPermission(permission: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (user.role === 'admin' || user.permissions.includes('*')) {
    return true;
  }
  
  return user.permissions.includes(permission);
}