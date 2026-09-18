import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('mv_role') || 'patient');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch of user
    async function loadUser() {
      try {
        if (role === 'doctor') {
          const docRes = await api.getDoctorOverview();
          setUser(docRes.doctor);
        } else {
          const pat = await api.getProfile();
          setUser(pat);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [role]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await api.login(credentials);
      setRole(res.role);
      setUser(res.user);
      localStorage.setItem('mv_role', res.role);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('mv_role');
    setRole('patient');
    window.location.href = '/';
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('mv_role', newRole);
    if (newRole === 'doctor') {
      window.location.href = '/doctor';
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <AuthContext.Provider value={{ role, user, isAuthenticated: true, loading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
