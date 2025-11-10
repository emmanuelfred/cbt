import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useCbtstore = create((set) => ({
  totalcbt:0,
  attempt:[],
  exams: [],
  question: [],
  count: null,
  loading: false,
  error: null,
  massage:null,
  Summary: {},

  // Get all available exams
  getExams: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/cbt/exams`);
    
      set({ exams: res.data.exams, loading: false });
    } catch (err) {
      console.error("Failed to fetch exams:", err);
      set({ error: "Failed to load exams", loading: false });
    }
  },

  // Get questions by exam, year, and subject
getQuestion: async (exam, year, subject) => {
  set({ loading: true, error: null });
  try {
    const response = await axios.get(`${API_URL}/cbt/questions?exam=${exam}&year=${year}&subject=${subject}`);
    
    const { questions, count } = response.data;

    set({ question: questions, count, loading: false, massage:response.data.message
     });

    return response.data; // ✅ RETURN the data so component can use it
  } catch (error) {
    set({ error: error.response?.data?.message || "Error fetching questions", loading: false });
    throw error;
  }
},
//SAVE ATTEMPTS
recordAttempt: async (user_id, name,
      avatar,
      exam,
      subject,
      year,
      score,
      percentage,
      sharePermission,
      date,
      duration) => {
        set({ loading: true, error: null });
        try{
          const response = await axios.post(`${API_URL}/cbt/record-attempt`, { 
            user_id,
            name,
            avatar,
            exam,
            subject,
            year,
            score,
            percentage,
            sharePermission,
            date,
            duration
          });
			set({
				massage:response.data.message,
				error: null,
				loading: false,
			});

        }catch  (error){
          set({ error: error.response?.data?.message || "Error recording Attempt", Loading: false });
			throw error;
        }

},
  // Get questions by exam, year, and subject
getAllAttempts: async () => {
  set({ loading: true, error: null });
  try {
    const response = await axios.get(`${API_URL}/cbt/attempts`);
    
    const { attempts} = response.data;

    set({ attempt: attempts, loading: false });

    return response.data; // ✅ RETURN the data so component can use it
  } catch (error) {
   set({ error: error.response?.data?.message || "Error fetching leadership board", loading: false });

    throw error;
  }
},
fetchRecommendations: async (userId,limit) => {
  set({ loading: true, error: null });
  try {
    console.log(userId);
    const response = await axios.get(`${API_URL}/cbt/recommendations/${userId}?limit=${limit}`);
    set({exams:response.data.recommendations, loading: false });
    return response.data.recommendations || [];
  }
    catch (error) {
    set({ error: error.response?.data?.message || "Error fetching recommendations", loading: false });
    throw error;
  }
},
getTotalcbt: async (userId) => {
  set({ loading: true, error: null });
  try {
    const response = await axios.get(`${API_URL}/cbt/total-cbts/${userId}`);
    set({ totalcbt: response.data.totalCBTs, loading: false });

    return response.data.totalcbt || 0;
  }
    catch (error) {
    set({ error: error.response?.data?.message || "Error fetching total cbt", loading: false });
    throw error;
  }
},
getUserAttempts: async (userId) => {
   
  set({ loading: true, error: null });
  try {
   
    const response = await axios.get(`${API_URL}/cbt/attempt/${userId}`);
    set({ attempt: response.data.attempts, loading: false });

    return response.data.attempts || [];
  }
    catch (error) {
    set({ error: error.response?.data?.message || "Error fetching total cbt", loading: false });
    throw error;
  }
},
getAttemptSummary: async (userId) => {
 
  set({ loading: true, error: null });
  try {
   
    const response = await axios.get(`${API_URL}/cbt/summary/${userId}`);
    set({ Summary: response.data.summary, loading: false });

    return response.data.summary || {};
  }
    catch (error) {
    set({ error: error.response?.data?.message || "Error fetching total cbt", loading: false });
    throw error;
  }
}


}));
