import React, { useState } from "react";
import signupIllustration from "../../assets/signup.svg";

const SignupForm = ({ onSignup, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    onSignup(form); // handle signup via parent or context
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration */}
      <div
        className="hidden md:flex md:w-1/2 items-center justify-center p-8 relative overflow-hidden"
        style={{ backgroundColor: "#040612" }}
      >
        {/* Top left circular blur */}
        <div
          className="absolute top-4 -left-25 w-70 h-70 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "#60E5AE" }}
        ></div>

        {/* Bottom right circular blur */}
        <div
          className="absolute bottom-4 right-4 w-90 h-80 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: "#60E5AE" }}
        ></div>

        <img
          src={signupIllustration}
          alt="Signup Illustration"
          className="max-w-md w-full h-auto relative z-10"
        />

        {/* Bottom center rectangular blur - positioned at bottom of image */}
        <div
          className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-120 h-40 blur-3xl opacity-20"
          style={{ backgroundColor: "#60E5AE" }}
        ></div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
            <p className="text-gray-600">Create your account to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h5 className="font-bold mb-1">Full Name</h5>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <h5 className="font-bold mb-1">Email Address</h5>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <h5 className="font-bold mb-1">Password</h5>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <h5 className="font-bold mb-1">Confirm Password</h5>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-200 font-medium"
            >
              Sign Up
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
