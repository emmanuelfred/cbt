import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import toast from "react-hot-toast";
import { useAuthStore } from "../Store/authStore";

const VerifyPassword = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
    const {verifyOtp,error,isLoading,message} = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) newCode[i] = pasted[i] || "";
      setCode(newCode);
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otp = code.join("");
    const data = await verifyOtp(email, otp);
        toast.success(message||"OTP Verified");
        navigate("/reset-password", { state: { userId: data.userId } });
    
  };
  if(!email){
    navigate("/forget_password");
  }
  if(error){
    toast.error(error||"Something went wrong");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#0C6F89] to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to <span className="text-[#0C6F89] font-semibold">{email}</span>
        </p>
        {error && (<p className="text-red-500 mb-4 text-center">{error}</p>
          ) }

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-[#0C6F89]"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || code.some((d) => !d)}
            className={`mt-4 w-full py-3 px-4 font-bold rounded-lg transition duration-200 ${
              isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-[#0C6F89] to-[#014925] text-white"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPassword;
