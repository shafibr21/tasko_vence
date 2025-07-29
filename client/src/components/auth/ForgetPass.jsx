import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import loginImage from "../../assets/login.svg";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle reset logic
    console.log({ email, password });
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Top background section */}
      <div
        className="absolute top-0 left-0 w-full h-50 overflow-hidden flex items-center justify-end pr-16"
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

        {/* Login illustration on the right */}
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-100 h-auto relative z-10 translate-y-5 opacity-60 translate-x-10"
        />
      </div>

      {/* Bottom white section */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-white"></div>

      <div className="bg-white rounded-lg shadow-lg p-15 w-full max-w relative z-10 mx-20 lg:px-130 ">
        <div className="flex justify-center mb-6 ">
          <div>
            <img src={logo} alt="Logo" className="h-25 w-25" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset your Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Strong passwords include numbers, letters, and punctuation marks.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">
              Enter New Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-400 hover:bg-teal-500 text-black font-medium py-2 rounded-md transition"
          >
            Reset Password
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
