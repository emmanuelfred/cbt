import { create } from "zustand";
import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;



axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	savedInterests: [],
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	signup: async (email, password, name,academicLevel, interests) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/auth/signup`, { email, password, name,academicLevel, interests });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/auth/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/auth/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/auth/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/auth/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
	    fetchInterests: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`${API_URL}/interests/get`);
            set({
                savedInterests: res.data || [],
                error: null,
                loading: false,
            });
        } catch (err) {
            console.error("Error fetching interests:", err);
            set({
                error: err.response?.data?.message || "❌ Failed to fetch interests",
                loading: false,
            });
        }
    },
	updateprofile: async (profileData) => {
  set({ isLoading: true, error: null ,massage:null});
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/auth/update`, profileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

	
	

    set({ user: response.data.user, isLoading: false,message: response.data.message });
    return response.data; // so front-end receives { success, message, user }
  } catch (error) {
    set({ error: error.response?.data?.message || "Error updating profile", isLoading: false });
    throw error;
  }
},
updateEmail: async (data) => {
  set({ isLoading: true, error: null ,massage:null});
  try {
	const response = await axios.post(`${API_URL}/auth/update-email`, data);
	set({ user: response.data.user, isLoading: false,message: response.data.message });
	return response.data; // so front-end receives { success, message, user }
  } catch (error) {
	set({ error: error.response?.data?.message || "Error updating email", isLoading: false });
	throw error;
  }
},
updatePassword: async (data) => {
  set({ isLoading: true, error: null ,massage:null});
  try {
	console.log(data);
	const response = await axios.post(`${API_URL}/auth/update-password`, data);
	set({ user: response.data.user, isLoading: false,message: response.data.message });
	return response.data; // so front-end receives { success, message, user }
  } catch (error) {
	set({ error: error.response?.data?.message || "Error updating password", isLoading: false });
	throw error;
  }
},

}));
