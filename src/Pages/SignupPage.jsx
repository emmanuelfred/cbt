import React, { useState } from "react";
import loginImg from "../assets/loginimg.png";
import { useAuthStore } from "../Store/authStore";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);

  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  // ✅ Function to check password strength
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
      navigate("/verify-email",{
        state: {
       
          email: email,
      },});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#014925] mb-6 text-center">
            Create an Account
          </h2>

          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                required
              />
            </div>

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

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => checkPasswordStrength(e.target.value)}
                placeholder="Enter your password"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                required
              />

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className={`h-2 rounded-full ${getStrengthColor()}`}></div>
                  <p className="text-sm mt-1 text-gray-600">
                    Strength: {passwordStrength}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || passwordStrength === "Weak" || passwordStrength === "Too Short"}
              className={`w-full py-3 rounded-full font-semibold transition duration-300 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0C6F89] text-white hover:bg-[#0a5d73]"
              }`}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {error && (
            <p className="text-center text-red-500 mt-4 font-medium">{error}</p>
          )}

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#0C6F89] font-semibold hover:underline"
            >
              Login
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
          <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
          <p className="text-sm mb-6 max-w-sm">
            Login to continue your learning and track your progress.
          </p>
          <a
            href="/login"
            className="bg-white text-[#0C6F89] px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
