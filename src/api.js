import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
	baseURL: BASE_URL,
});

const refreshToken = async () => {
	const refresh = localStorage.getItem("refresh");

	try {
		const response = await axios.post(`${BASE_URL}/token_refresh/`, {
			refresh,
		});

		if (response.status === 200) {
			const newAccessToken = response.data.access;
			localStorage.setItem("access", newAccessToken);
			return newAccessToken;
		}
	} catch (error) {
		console.error("Token refresh failed:", error);
		localStorage.removeItem("access");
		localStorage.removeItem("refresh");
		window.location.href = "/signin"; // Redirect user to sign-in page
		return null;
	}
};

// ✅ Request Interceptor: Attach Token Before Sending Requests
api.interceptors.request.use(
	async (config) => {
		let token = localStorage.getItem("access");

		if (token) {
			const decoded = jwtDecode(token);
			const expiryDate = decoded.exp;
			const currentTime = Date.now() / 1000;

			if (currentTime > expiryDate) {
				token = await refreshToken();
			}

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// ✅ Response Interceptor: Handle 401 Errors & Retry Requests
api.interceptors.response.use(
	(response) => response, // Pass successful responses as-is
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true; // Prevent infinite loops

			const newToken = await refreshToken();
			if (newToken) {
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return api(originalRequest); // Retry the request with the new token
			}
		}

		return Promise.reject(error);
	}
);

export default api;
