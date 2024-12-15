export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'support';

export interface RolePermission {
  id: string;
  name: string;
  description: string;
  category: 'drivers' | 'trips' | 'reports' | 'settings' | 'admins' | 'system';
}

export interface Role {
  id: AdminRole;
  name: string;
  description: string;
  permissions: string[];
  level: number;
}

export const ADMIN_ROLES: Role[] = [
  {
    id: 'super_admin',
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    permissions: ['*'],
    level: 1,
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'General administrative access',
    permissions: ['manage_drivers', 'manage_trips', 'view_reports'],
    level: 2,
  },
  {
    id: 'moderator',
    name: 'Moderator',
    description: 'Limited administrative access',
    permissions: ['view_drivers', 'view_trips', 'view_reports'],
    level: 3,
  },
  {
    id: 'support',
    name: 'Support Agent',
    description: 'Customer support access',
    permissions: ['view_drivers', 'view_trips'],
    level: 4,
  },
];