export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'support';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'drivers' | 'trips' | 'reports' | 'settings' | 'admins';
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  phoneNumber?: string;
  department?: string;
  activityLog: AdminActivity[];
}

export interface AdminActivity {
  id: string;
  adminId: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface AdminSession {
  admin: Admin;
  token: string;
  expiresAt: string;
  refreshToken: string;
}