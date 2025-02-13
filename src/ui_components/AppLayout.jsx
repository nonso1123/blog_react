import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AppLayout = ({
	setIsAuthenticated,
	isAuthenticated,
	username,
	setUsername,
}) => {
	useEffect(() => {
		if (localStorage.getItem("dark") === null) {
			localStorage.setItem("dark", false);
		}
	}, []);
	const [darkMode, setDarkMode] = useState(
		localStorage.getItem("dark") === "true"
	);
	const handleDarkMode = () => {
		setDarkMode((curr) => !curr);
		localStorage.setItem("dark", !darkMode);
	};
	return (
		<div className={darkMode ? "dark" : ""}>
			<main className="w-full bg-white dark:bg-[#181A2A]">
				<NavBar
					darkMode={darkMode}
					handleDarkMode={handleDarkMode}
					setIsAuthenticated={setIsAuthenticated}
					isAuthenticated={isAuthenticated}
					username={username}
					setUsername={setUsername}
				/>
				<ToastContainer />
				<Outlet />
				<Footer />
			</main>
		</div>
	);
};

export default AppLayout;
