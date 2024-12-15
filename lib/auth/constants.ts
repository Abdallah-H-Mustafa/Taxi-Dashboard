export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  COMPANY: 'company',
  DISPATCHER: 'dispatcher'
} as const;

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Administrator',
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.COMPANY]: 'Company Manager',
  [ROLES.DISPATCHER]: 'Dispatcher'
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ['*'],
  [ROLES.ADMIN]: [
    'view_dashboard',
    'manage_companies',
    'manage_drivers',
    'manage_trips',
    'view_reports'
  ],
  [ROLES.COMPANY]: [
    'view_company_dashboard',
    'manage_company_drivers',
    'manage_company_trips',
    'view_company_reports'
  ],
  [ROLES.DISPATCHER]: [
    'view_dispatch_interface',
    'manage_trips',
    'view_drivers'
  ]
};

// Mock credentials for testing
export const MOCK_CREDENTIALS = {
  [ROLES.SUPER_ADMIN]: {
    email: 'admin@example.com',
    password: 'admin123'
  },
  [ROLES.COMPANY]: {
    password: 'company123'
  },
  [ROLES.DISPATCHER]: {
    password: 'dispatcher123'
  }
};