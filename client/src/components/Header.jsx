import React, { useState } from "react";
import loginImage from "../assets/login.svg";
import navlogo from "../assets/nav_logo.svg";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import taskIcon from "../assets/nav_task.svg";
import spinnerIcon from "../assets/spinner.svg";
const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  const handleViewProfile = () => {
    // Add your view profile logic here
    navigate("/profile");
    setIsDropdownOpen(false); // Close dropdown after clicking
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Container with dark background */}
      <div className="relative">
        {/* Background section */}
        <div className="h-60 flex items-center justify-center relative">
          <div
            className="absolute top-0 left-0 w-full h-60 overflow-hidden flex items-center justify-end pr-16"
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
              className="w-100 h-auto relative translate-y-5 opacity-60 translate-x-10"
            />
          </div>
        </div>

        {/* Navigation section - positioned absolutely on top */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between w-full px-10 py-4 md:mx-5">
          <img src={navlogo} alt="Navigation Logo" className="h-10" />
          <ul className="hidden md:flex items-center text-teal-400 font-medium space-x-6">
            <div>
              <img src={taskIcon} alt="Task Icon" className="inline-block " />
              <li className="inline-block mr-4 ml-2 text-white hover:text-teal-400 cursor-pointer">
                Task List
              </li>
            </div>
            <div>
              <img
                src={spinnerIcon}
                alt="Spinner Icon"
                className="inline-block "
              />
              <li
                className="inline-block mx-4 text-white hover:text-teal-400 cursor-pointer"
                onClick={() => navigate("/spin")}
              >
                Spin
              </li>
            </div>
          </ul>

          <div className="relative">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Avatar/Name Button */}
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-white border rounded-2xl border-teal-700 px-4 py-2 hover:bg-teal-700 hover:bg-opacity-20 transition-colors duration-200"
                >
                  <span>{user.name}</span>
                  {/* Dropdown Arrow */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {/* View Profile Option */}
                    <button
                      onClick={handleViewProfile}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      View Profile
                    </button>

                    {/* Divider */}
                    <div className="border-t border-gray-100"></div>

                    {/* Logout Option */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-white">No user</p>
            )}
          </div>
        </div>

        {/* Welcome text - positioned absolutely */}
        <div className="absolute bottom-10 md:bottom-18 left-1 md:left-8 z-30 mx-10">
          <p className="text-teal-300  text-2xl md:text-3xl font-bold">
            Hi {user?.name || "User"}
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Welcome to Dashboard
          </h1>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
