import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

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
      const token = localStorage.getItem("token"); 
      try {
        const res = await axios.get(backendUrl + "/api/user/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // backend returns user if authenticated
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
    const res = await axios.post(backendUrl + "/api/user/login", credentials);
    setUser(res.data.user);
  };

  const signup = async (data) => {
    try {
      const res = await axios.post(backendUrl + "/api/user/register", data);
      const token = res.data.token;

      // Save token in localStorage or state
      localStorage.setItem("token", token);

      // Now fetch the user data with token in Authorization header
      const meRes = await axios.get(backendUrl + "/api/user/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
