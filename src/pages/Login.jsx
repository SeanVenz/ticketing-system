import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUserDataFlower } from "../utils/apiClient";
import Button from "../components/Button";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!userName || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUserDataFlower(userName, password);
      
      if (response.data.success === true) {
      console.log(response.data.data.id);
      if (response.data.data.id === "eafe4269-72c2-489d-8739-db7e522b7900") {
        localStorage.setItem("userId", "eafe4269-72c2-489d-8739-db7e522b7900");
        localStorage.setItem("isAdmin", true);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userName", response.data.data.username);
        return navigate("/admin");
      }
      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("userName", response.data.data.username);
      localStorage.setItem("isAdmin", false);
      localStorage.setItem("token", response.data.accessToken);

      return navigate("/dashboard");
    }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 justify-center items-center p-12">
        <div className="max-w-md">
          <div className="text-white text-4xl font-bold mb-6">
            Welcome to TicketApp
          </div>
          <div className="text-blue-100 text-xl mb-10">
            Manage your projects and tickets with ease
          </div>

        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            {/* App logo for mobile */}
            <div className="lg:hidden flex justify-center mb-6">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">T</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h1>
            <p className="text-gray-600">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="username" 
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="johndoe"
                autoComplete="text"
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label 
                  htmlFor="password" 
                  className="block text-gray-700 font-medium"
                >
                  Password
                </label>
                <Link 
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="remember-me" 
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <Button
              types="submit"
              type="primary"
              css='w-full flex items-center justify-center'
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
