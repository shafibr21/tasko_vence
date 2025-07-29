import React from "react";
import SignupForm from "../components/auth/SignupForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed");
    }
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <SignupForm onSignup={handleSignup} onSwitchToLogin={handleSwitchToLogin} />
  );
};

export default SignupPage;
