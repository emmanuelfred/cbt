import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginImg from "../assets/loginimg.png";
import { useAuthStore } from "../Store/authStore";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
	const { login, isLoading, error } = useAuthStore();


  const handleSubmit = async (e) => {
    e.preventDefault();


    await login(email, password);

      navigate("/dashboard");

  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row py-30 md:py-0">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#014925] mb-6 text-center">
            Welcome Back!
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right">
              <a href="/forget_password" className="text-[#0C6F89]">
                Forgotten Password?
              </a>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0C6F89] text-white py-3 rounded-full font-semibold hover:bg-[#0a5d73] transition duration-300"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#0C6F89] font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-full md:w-1/2 relative">
        <img
          src={loginImg}
          alt="CBT Learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0c70897c] flex flex-col justify-center items-center text-white text-center p-10">
          <h3 className="text-3xl font-bold mb-4">New Here?</h3>
          <p className="text-sm mb-6 max-w-sm">
            Join thousands of learners and start your CBT journey today.
          </p>
          <a
            href="/signup"
            className="bg-white text-[#0C6F89] px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
