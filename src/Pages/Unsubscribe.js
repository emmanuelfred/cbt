import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ImageWithLoading from '../Components/ImageWithLoading';
import FloatingShape from '../Components/FloatingShape'
import { useNewsletterStore } from "../store/newletterStore";
export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const reasons = [
    "I receive too many emails",
    "I’m not interested anymore",
    "Content is not relevant",
    "I didn’t subscribe",
    "Other",
  ];

  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const [loadingPage, setLoadingPage] = useState(true);
 
  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => setLoadingPage(false), 1000);
    return () => clearTimeout(timer);
  }, []);
const { unsubscribe, loading, message, error } = useNewsletterStore();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !selectedReason) return;
  const reason = selectedReason === "Other" ? customReason : selectedReason;
  unsubscribe(email, reason);
};


  return (
     loadingPage ? 
      (<div style={{padding:10}} ><ImageWithLoading height={900}/></div>)
       : (
        <div
          className='min-h-screen bg-gradient-to-br from-[#15253a] via-[#20537c] to-[#15253a] flex items-center justify-center relative overflow-hidden'
        >
          <FloatingShape color='bg-[#f4825d]' size='w-64 h-64' top='-5%' left='10%' delay={0} />
          <FloatingShape color='bg-[#f4825d]' size='w-48 h-48' top='70%' left='80%' delay={5} />
          <FloatingShape color='bg-[#f4825d]' size='w-32 h-32' top='40%' left='-10%' delay={2} />
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Unsubscribe</h1>
        <p className="text-gray-600 text-sm mb-4">
          We're sorry to see you go. Why are you unsubscribing?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {reasons.map((reason, idx) => (
              <button
                type="button"
                key={idx}
                className={`w-full px-4 py-2 rounded-xl border text-left transition ${
                  selectedReason === reason
                    ? "bg-red-100 border-red-400 text-red-700"
                    : "bg-white border-gray-300 text-gray-700 hover:border-red-400"
                }`}
                onClick={() => setSelectedReason(reason)}
              >
                {reason}
              </button>
            ))}
          </div>

          {selectedReason === "Other" && (
            <input
              type="text"
              placeholder="Please specify your reason..."
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-[#f4825d] to-[#e96d43] text-white 
							font-bold rounded-lg shadow-lg hover:from-[#e96d43] hover:to-[#d85a2f] 
							focus:outline-none focus:ring-2 focus:ring-[#f4825d] focus:ring-offset-2 
							focus:ring-offset-gray-900 transition duration-200"
            disabled={loading || !selectedReason}
          >
            {loading ? "Unsubscribing..." : "Confirm Unsubscribe"}
          </button>

          {message && <p className="text-center text-sm text-green-600 mt-2">{message}</p>}
        {error && <p className="text-center text-sm text-red-600 mt-2">{error}</p>}
        </form>
      </div>

        </div>

        

       )
    
  );
}
