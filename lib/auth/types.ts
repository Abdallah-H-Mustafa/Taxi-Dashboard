"use client";

export type UserRole = 'super_admin' | 'admin' | 'company' | 'dispatcher';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  companyId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
  companyId?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}