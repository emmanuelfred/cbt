import React, { useState } from "react";
import loginImg from "../assets/loginimg.png";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../Store/authStore";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const {resetPassword,error,isLoading,message} = useAuthStore();
  const checkPasswordStrength = (value) => {
    setPassword(value);

    let strength = "";
    const regexWeak = /[a-z]/;
    const regexMedium = /(?=.*[A-Z])(?=.*[a-z])/;
    const regexStrong = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/;

    if (value.length === 0) strength = "";
    else if (value.length < 6) strength = "Too Short";
    else if (regexStrong.test(value)) strength = "Strong";
    else if (regexMedium.test(value)) strength = "Medium";
    else if (regexWeak.test(value)) strength = "Weak";

    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "Strong":
        return "bg-green-600";
      case "Medium":
        return "bg-yellow-500";
      case "Weak":
      case "Too Short":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) return toast.error("Passwords do not match");
    await resetPassword(userId, password);
        setPassword("");
        setConfirm("");
        toast.success(message||"Password reset successful");
        navigate("/login");

   
  };
  if(!userId){
    navigate("/forget_password");
  }
  if(error){
    toast.error(error||"Something went wrong");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row py-30 md:py-0">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#014925] mb-6 text-center">Reset Password</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (<p className="text-red-500 mb-4 text-center">{error}</p>
          ) } 
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => checkPasswordStrength(e.target.value)}
                placeholder="Enter new password"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                required
              />
            </div>
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className={`h-2 rounded-full ${getStrengthColor()}`}></div>
                  <p className="text-sm mt-1 text-gray-600">
                    Strength: {passwordStrength}
                  </p>
                </div>
              )}

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0C6F89] text-white py-3 rounded-full font-semibold hover:bg-[#0a5d73] transition duration-300"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 relative">
        <img src={loginImg} alt="CBT Learning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0c70897c] flex flex-col justify-center items-center text-white text-center p-10">
          <h3 className="text-3xl font-bold mb-4">New Here?</h3>
          <p className="text-sm mb-6 max-w-sm">
            Join thousands of learners and start your CBT journey today.
          </p>
          <a href="/signup" className="bg-white text-[#0C6F89] px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
