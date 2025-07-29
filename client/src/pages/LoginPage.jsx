import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSwitchToSignup = () => {
    navigate("/signup");
  };

  return (
    <LoginForm
      onLogin={handleLogin}
      onSwitchToForgotPassword={handleForgotPassword}
      onSwitchToSignup={handleSwitchToSignup}
    />
  );
};

export default LoginPage;
