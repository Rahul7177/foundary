import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

const VALID_PASSWORD = 'Infy@123';

/**
 * Parse a userId like "john.doe" or "john_doe" into { firstName, lastName, fullName, initials }
 */
function parseUserId(userId) {
  const parts = userId.split(/[._]/);
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  const firstName = capitalize(parts[0] || 'User');
  const lastName = parts.length > 1 ? capitalize(parts[parts.length - 1]) : '';
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  const initials = lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2).toUpperCase();
  return { firstName, lastName, fullName, initials };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('foundry_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((userId, password) => {
    if (password !== VALID_PASSWORD) {
      return { success: false, error: 'Invalid password. Please try again.' };
    }
    if (!userId || userId.trim().length === 0) {
      return { success: false, error: 'Please enter a User ID.' };
    }
    const parsed = parseUserId(userId.trim());
    const userData = { userId: userId.trim(), ...parsed };
    setUser(userData);
    sessionStorage.setItem('foundry_user', JSON.stringify(userData));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('foundry_user');
  }, []);

  const value = useMemo(() => ({ user, login, logout, isAuthenticated: !!user }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
