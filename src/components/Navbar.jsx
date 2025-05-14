import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Logo from "../assets/logo.svg"; // Replace with your actual logo path

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const userName = localStorage.getItem("userName") || "User";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");

    // Redirect to login
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold ml-2 text-gray-800">
                TicketApp
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/dashboard") || isActive("/admin")
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* User Account Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Hello, {userName}</span>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-800">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm cursor-pointer text-gray-500 hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* X icon */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/dashboard")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            Dashboard
          </Link>

          {/* <Link
            to="/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/projects")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            Projects
          </Link> */}

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/admin")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile user info */}
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-800">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {userName}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 hover:text-red-500"
            >
              <span className="sr-only">Logout</span>
              {/* Logout icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
