import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import toast from "react-hot-toast";
import ResendOtp from "../Component/Resendotp"


const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // ✅ safely extract email

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted input
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasted[i] || "";
      }
      setCode(newCode);
      const nextIndex = newCode.findIndex((d) => d === "");
      if (nextIndex !== -1) inputRefs.current[nextIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
      await verifyEmail(verificationCode, email);
      toast.success("Email verified successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Verification failed. Try again.");
      console.error(err);
    }
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "") && code.join("").length === 6) {
      handleSubmit(new Event("submit"));
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <div
      className="flex justify-center items-center overflow-hidden "
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#0C6F89] to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="text-[#0C6F89] font-semibold">{email}</span>
        </p>

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
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-[#0C6F89] focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className={`mt-4 w-full py-3 px-4 font-bold rounded-lg shadow-lg transition duration-200 ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-[#0C6F89] to-[#014925] text-white hover:from-[#014925] hover:to-[#0C6F89]"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>

          {/* ✅ Fixed prop passing */}
          <ResendOtp email={email} />
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
