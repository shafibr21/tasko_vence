import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Enable sending cookies with every request
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const backendUrl = "https://tasko-vence.vercel.app";

  // Fetch user on app load
  useEffect(() => {
    const checkAuth = async () => {
      
      try {
        const res = await axios.get(backendUrl + "/api/user/auth/me");
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
    console.log("Login credentials:", credentials); // 👈 Add this
    await axios.post(backendUrl + "/api/user/login", credentials);
    const res = await axios.get(backendUrl + "/api/user/auth/me");
    setUser(res.data.user);
  };

  const signup = async (data) => {
    try {
      await axios.post(backendUrl + "/api/user/register", data);
      const meRes = await axios.get(backendUrl + "/api/user/auth/me");
      setUser(meRes.data.user);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  const logout = async () => {
    await axios.post(backendUrl + "/api/user/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
