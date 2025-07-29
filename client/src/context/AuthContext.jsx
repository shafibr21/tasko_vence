import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Enable sending cookies with every request
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch user on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(backendUrl + '/api/user/auth/me'); // backend returns user if authenticated
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    await axios.post(backendUrl + '/api/user/auth/login', credentials);
    const res = await axios.get(backendUrl + '/api/user/login');
    setUser(res.data.user);
  };

  const signup = async (data) => {
    await axios.post(backendUrl + '/api/user/auth/register', data);
    const res = await axios.get(backendUrl + '/api/user/auth/me');
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post(backendUrl + '/api/user/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;