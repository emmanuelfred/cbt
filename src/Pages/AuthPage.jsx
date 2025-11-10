import React, { useState } from "react";
import loginImg from "../assets/loginimg.png"; // ← Replace with your own image

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 ">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#014925] mb-6 text-center">
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </h2>

          <form className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
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
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0C6F89] text-white py-3 rounded-full font-semibold hover:bg-[#0a5d73] transition duration-300"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#0C6F89] font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Image + Toggle */}
      <div className="hidden md:flex w-full md:w-1/2 relative">
        <img
          src={loginImg}
          alt="CBT Learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0c70897c] flex flex-col justify-center items-center text-white text-center p-10">
          <h3 className="text-3xl font-bold mb-4">
            {isLogin ? "New Here?" : "Welcome Back!"}
          </h3>
          <p className="text-sm mb-6 max-w-sm">
            {isLogin
              ? "Join thousands of learners and start your CBT journey today."
              : "Login to continue your learning and track your progress."}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="bg-white text-[#0C6F89] px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            {isLogin ? "Create Account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
