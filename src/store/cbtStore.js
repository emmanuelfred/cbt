import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.REACT_APP_API_URL;

export const useCbtstore = create((set) => ({
  totalcbt:0,
  attempt:[],
  exams: [],
  question: [],
  count: null,
  loading: false,
  error: null,
  massage:null,

  // Get all available exams
  getExams: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/cbt/exams`);
      console.log(res.data.exams);
      set({ exams: res.data.exams, loading: false });
    } catch (err) {
      console.error("Failed to fetch exams:", err);
      set({ error: "Failed to load exams", loading: false });
    }
  },

  // Get questions by exam, year, and subject
getQuestion: async (exam, year, subject) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.get(`${API_URL}/cbt/questions?exam=${exam}&year=${year}&subject=${subject}`);
    
    const { questions, count } = response.data;

    set({ question: questions, count, isLoading: false });

    return response.data; // ✅ RETURN the data so component can use it
  } catch (error) {
    set({ error: error.response?.data?.message || "Error fetching questions", isLoading: false });
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
        set({ isLoading: true, error: null });
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
				isLoading: false,
			});

        }catch  (error){
          set({ error: error.response?.data?.message || "Error recording Attempt", Loading: false });
			throw error;
        }

},
  // Get questions by exam, year, and subject
getAllAttempts: async () => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.get(`${API_URL}/cbt/attempts`);
    
    const { attempts} = response.data;

    set({ attempt: attempts, isLoading: false });

    return response.data; // ✅ RETURN the data so component can use it
  } catch (error) {
   set({ error: error.response?.data?.message || "Error fetching leadership board", isLoading: false });

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


}));
