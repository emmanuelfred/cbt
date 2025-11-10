import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../Store/authStore";

import loginBg from "../assets/loginimg.png"; // background image

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(#0000006b,#0000006b), url(${loginBg})`,
      }}
    >
      <div className="relative z-10 bg-white/95 rounded-2xl shadow-xl w-full max-w-md p-8 m-4">
        <h2 className="text-3xl font-bold text-center text-[#014925] mb-1">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Login to your account
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#014925] mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0C6F89]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#014925] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0C6F89]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-right mt-1">
              <a
                href="/forget_password"
                className="text-sm text-[#0C6F89] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0C6F89] hover:bg-[#0a5d73] text-white font-medium py-2 rounded-md transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

      

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#0C6F89] font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
