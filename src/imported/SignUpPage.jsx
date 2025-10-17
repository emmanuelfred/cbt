import { motion } from "framer-motion";
import Input from "../Components/Input";
import { Loader, Lock, Mail, User, Book, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../Components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showCriteria, setShowCriteria] = useState(false); // 👈 for controlling criteria visibility

  const navigate = useNavigate();
  const { signup, error, isLoading, fetchInterests, savedInterests } = useAuthStore();

  // Fetch saved interests from store on mount
  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  // ✅ password validation logic
  const validatePassword = (pwd) => {
    const minLength = 6;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[@$!%*?&#]/.test(pwd);
    return pwd.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  // ✅ Handle selecting interests
  const handleInterestSelect = (interestName) => {
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interestName));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interestName]);
    } else {
      alert("You can only select up to 5 interests.");
    }
  };

  // ✅ Handle removing selected interests
  const handleRemoveSelected = (name) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== name));
  };

  // ✅ Handle signup submission
  const handleSignUp = async (e) => {
    
    e.preventDefault();

    // Always show criteria on submit
    setShowCriteria(true);

    /*if (!validatePassword(password)) {
       console.log(validatePassword(password));
      return; // Don’t submit if invalid
    }*/
    

    try {
     
      await signup(email, password, name, academicLevel, selectedInterests);
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-white text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (showCriteria) setShowCriteria(false); // Hide criteria until next submit
            }}
          />

          {/* ✅ Strength Meter shows live; criteria only appear after failed submit */}
          <PasswordStrengthMeter password={password} showCriteria={showCriteria} />

          {/* Academic Level */}
          <div className="relative mb-2 mt-2">
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Book className='size-5 text-[var(--secondary-color)]' />
			</div>
            <select
              value={academicLevel}
              onChange={(e) => setAcademicLevel(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-[var(--secondary-color)] focus:ring-2 focus:ring-[var(--secondary-color)] text-white placeholder-gray-400 transition duration-200"
            >
              <option value="">Select Academic Level</option>
              <option value="High School">Primary</option>
			   <option value="High School">junior Secondary</option>
			    <option value="High School">senior Secondary</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
            
          </div>

          {/* Select Interests */}
         <div className="flex flex-wrap gap-2">
  {savedInterests && savedInterests.length > 0 ? (
    savedInterests.map((interest, i) => {
      const isSelected = selectedInterests.includes(interest.name);
      return (
        <button
          type="button"
          key={interest._id || i}
          onClick={() => handleInterestSelect(interest.name)}
          className={`px-3 py-2 rounded-full text-sm font-medium transition flex items-center gap-1 ${
            isSelected
              ? "bg-[var(--secondary-color)] text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {interest.name}
          {isSelected && (
            <span
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering parent button
                handleRemoveSelected(interest.name);
              }}
              className="ml-1 cursor-pointer hover:text-red-300"
            >
              <X size={14} />
            </span>
          )}
        </button>
      );
    })
  ) : (
    <p className="text-gray-400 text-sm">Loading interests...</p>
  )}
</div>


       

          {/* Error Display */}
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <button
            className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-[#f4825d] to-[#e96d43] text-white font-bold rounded-lg shadow-lg hover:from-[#e96d43] hover:to-[#d85a2f] focus:outline-none focus:ring-2 focus:ring-[#f4825d] transition"
           
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
          </button>
        </form>
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-[var(--secondary-color)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
