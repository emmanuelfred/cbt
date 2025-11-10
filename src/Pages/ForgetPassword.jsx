import React, { useState } from "react";
import loginImg from "../assets/loginimg.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../Store/authStore";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {forgotPassword,error,isLoading,message} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    await forgotPassword(email);
    setEmail("");

        toast.success(message||"OTP sent to your email");
        navigate("/verify_password", { state: { email } });
         if(error){
    toast.error(error||"Something went wrong");
  }

  };
  if(error){
    toast.error(error||"Something went wrong");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#014925] mb-6 text-center">
            Enter Your Email to Reset Password
          </h2>
          {error && (<p className="text-red-500 mb-4 text-center">{error}</p>
          ) }

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0C6F89] text-white py-3 rounded-full font-semibold hover:bg-[#0a5d73] transition duration-300"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#0C6F89] font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 relative">
        <img src={loginImg} alt="CBT Learning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0c70897c] flex flex-col justify-center items-center text-white text-center p-10">
          <h3 className="text-3xl font-bold mb-4">New Here?</h3>
          <p className="text-sm mb-6 max-w-sm">
            Create an account to access a variety of CBT exams and enhance your learning experience.
          </p>
          <a href="/signup" className="bg-white text-[#0C6F89] px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
