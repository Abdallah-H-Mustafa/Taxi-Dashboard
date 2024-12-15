import { Role, AdminRole, ADMIN_ROLES } from '@/types/admin-roles';
import { Admin } from '@/types/admin';

export function canManageRole(currentAdmin: Admin, targetRole: AdminRole): boolean {
  const currentRole = ADMIN_ROLES.find(role => role.id === currentAdmin.role);
  const targetRoleObj = ADMIN_ROLES.find(role => role.id === targetRole);
  
  if (!currentRole || !targetRoleObj) return false;
  
  // Can only manage roles of lower level
  return currentRole.level < targetRoleObj.level;
}

export function hasPermission(admin: Admin, permission: string): boolean {
  if (admin.role === 'super_admin') return true;
  
  const role = ADMIN_ROLES.find(r => r.id === admin.role);
  if (!role) return false;
  
  return role.permissions.includes('*') || role.permissions.includes(permission);
}

export function getRolePermissions(role: AdminRole): string[] {
  const roleObj = ADMIN_ROLES.find(r => r.id === role);
  return roleObj?.permissions || [];
}

export function validatePermissionChange(
  currentAdmin: Admin,
  targetAdmin: Admin,
  newPermissions: string[]
): boolean {
  // Super admin can do anything
  if (currentAdmin.role === 'super_admin') return true;
  
  // Can't modify permissions of higher or same level roles
  if (!canManageRole(currentAdmin, targetAdmin.role)) return false;
  
  // Check if all new permissions are within current admin's permissions
  const currentPermissions = getRolePermissions(currentAdmin.role);
  return newPermissions.every(p => currentPermissions.includes(p));
}