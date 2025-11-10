import React, { useState } from "react";
import { useAuthStore } from "../Store/authStore";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import loginBg from "../assets/loginimg.png";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  // ✅ Password Strength Checker
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await signup(email, password, name, academicLevel, selectedInterests);
      navigate("/verify-email", { state: { email } });
    } catch (error) {
      console.error(error);
    }
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
          Create an Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Join thousands of learners today
        </p>

        <form className="space-y-5" onSubmit={handleSignUp}>
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#014925] mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0C6F89]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
                onChange={(e) => checkPasswordStrength(e.target.value)}
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

            {/* Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className={`h-2 rounded-full ${getStrengthColor()}`}></div>
                <p className="text-sm mt-1 text-gray-600">
                  Strength: {passwordStrength}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#014925] mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0C6F89]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-red-500 text-sm">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={
              isLoading ||
              passwordStrength === "Weak" ||
              passwordStrength === "Too Short"
            }
            className={`w-full py-2 rounded-md font-medium transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0C6F89] hover:bg-[#0a5d73] text-white"
            }`}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#0C6F89] font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
