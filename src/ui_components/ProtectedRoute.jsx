import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Navigate, useLocation } from "react-router-dom";
import api from "@/api";

const ProtectedRoute = ({ children }) => {
	useEffect(() => {
		authorize().catch(() => setIsAuthorized(false));
	}, []);
	const location = useLocation();
	const [isAuthorized, setIsAuthorized] = useState(null);
	const refreshToken = async () => {
		const refresh = localStorage.getItem("refresh");
		try {
			const response = await api.post("token_refresh/", { refresh: refresh });
			if (response.status === 200) {
				localStorage.setItem("access", response.data.access);
				setIsAuthorized(true);
			} else {
				setIsAuthorized(false);
			}
		} catch (err) {
			setIsAuthorized(false);
			console.log(err);
		}
	};
	const authorize = async () => {
		const token = localStorage.getItem("access");
		if (!token) {
			setIsAuthorized(false);
		}
		const decodedToken = jwtDecode(token);
		const expiry_date = decodedToken.exp;
		const current_time = Date.now() / 1000;
		if (current_time > expiry_date) {
			await refreshToken();
		} else {
			setIsAuthorized(true);
		}
	};
	if (isAuthorized === null) {
		return <Spinner />;
	}

	return (
		<>
			{isAuthorized ? (
				children
			) : (
				<Navigate to="/signin" state={{ from: location }} replace />
			)}
		</>
	);
};

export default ProtectedRoute;
