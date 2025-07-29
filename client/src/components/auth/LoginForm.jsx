import React, { useState } from "react";
import loginIllustration from "../../assets/login.svg";

const LoginForm = ({ onLogin, onSwitchToForgotPassword, onSwitchToSignup }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form); // handle login via parent or context
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
          className="absolute bottom-4 right-4 w-90 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "#60E5AE" }}
        ></div>

        <img
          src={loginIllustration}
          alt="Login Illustration"
          className="max-w-md w-full h-auto relative z-10"
        />

        {/* Bottom center rectangular blur - positioned at bottom of image */}
        <div
          className="absolute bottom-50 left-1/2 transform -translate-x-1/2 w-120 h-40 blur-3xl opacity-20"
          style={{ backgroundColor: "#60E5AE" }}
        ></div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <p className="text-gray-600">
              Welcome Back, Please Enter your Details to Log In.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="yourexample@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-400 text-black py-3 rounded-lg hover:bg-teal-600 transition duration-200 font-medium"
            >
              Log In
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
              <span className="text-gray-600">Don't have an account? </span>
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
