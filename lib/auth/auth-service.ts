"use client";

import { LoginCredentials, AuthResponse, AuthUser } from './types';
import { AUTH_TOKEN_KEY, USER_DATA_KEY, ROLE_PERMISSIONS, MOCK_CREDENTIALS } from './constants';
import { setAuthData, clearAuthData } from './auth-utils';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validate credentials based on role
    let isValid = false;
    
    switch (credentials.role) {
      case 'super_admin':
      case 'admin':
        isValid = credentials.email === MOCK_CREDENTIALS.super_admin.email && 
                 credentials.password === MOCK_CREDENTIALS.super_admin.password;
        break;
      case 'company':
        isValid = credentials.password === MOCK_CREDENTIALS.company.password;
        break;
      case 'dispatcher':
        isValid = credentials.password === MOCK_CREDENTIALS.dispatcher.password;
        break;
    }

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const mockUser: AuthUser = {
      id: crypto.randomUUID(),
      name: this.generateName(credentials),
      email: credentials.email,
      role: credentials.role,
      permissions: ROLE_PERMISSIONS[credentials.role],
      companyId: credentials.companyId
    };

    const mockToken = 'mock_token_' + Date.now();

    // Store auth data
    setAuthData(mockToken, mockUser);

    return {
      user: mockUser,
      token: mockToken
    };
  }

  private generateName(credentials: LoginCredentials): string {
    switch (credentials.role) {
      case 'super_admin':
        return 'Super Administrator';
      case 'admin':
        return 'Administrator';
      case 'company':
        return 'Company Manager';
      case 'dispatcher':
        return 'Dispatcher';
      default:
        return 'User';
    }
  }

  logout(): void {
    clearAuthData();
  }
}

export const authService = new AuthService();