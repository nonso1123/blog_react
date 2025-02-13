import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { FaHamburger } from "react-icons/fa";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({
	darkMode,
	handleDarkMode,
	setIsAuthenticated,
	isAuthenticated,
	username,
	setUsername,
}) => {
	const [showNavBar, setShowNavBar] = useState(false);
	const logout = () => {
		localStorage.removeItem("access");
		localStorage.removeItem("refresh");
		setIsAuthenticated(false);
		setUsername(null);
		window.location.reload();
	};
	return (
		<>
			<nav className="max-container padding-x py-6 flex justify-between items-center gap-6 sticky top-0 bg-white z-10 dark:bg-[#141624]">
				<Link
					to="/"
					className="text-[#141624] text-2xl dark:text-white cursor-pointer"
				>
					Devfolio
				</Link>
				<ul className="flex items-center justify-end gap-9 text-[#383C4A] lg:flex-1 max-md:hidden dark:text-white">
					{isAuthenticated ? (
						<>
							<li className="cursor-pointer">
								<NavLink
									to={`/profile/${username}`}
									className={({ isActive }) => (isActive ? "active" : "")}
								>
									Hi, {username}
								</NavLink>
							</li>
							<li onClick={logout} className="cursor-pointer">
								Logout
							</li>
						</>
					) : (
						<>
							<li className="font-semibold">
								<NavLink
									to="/signin"
									className={({ isActive }) => (isActive ? "active" : "")}
								>
									Login
								</NavLink>
							</li>
							<li className="cursor-pointer">
								<NavLink
									to="/signup"
									className={({ isActive }) => (isActive ? "active" : "")}
								>
									Register
								</NavLink>
							</li>
						</>
					)}

					<li className="font-semibold">
						<NavLink
							to="/create"
							className={({ isActive }) => (isActive ? "active" : "")}
						>
							Create post
						</NavLink>
					</li>
				</ul>
				<Switch onCheckedChange={handleDarkMode} checked={darkMode} />
				<FaHamburger
					className="text-2xl cursor-pointer hidden max-md:block dark:text-white"
					onClick={() => setShowNavBar((curr) => !curr)}
				/>
			</nav>
			{showNavBar && (
				<ResponsiveNavBar
					isAuthenticated={isAuthenticated}
					username={username}
					logout={logout}
				/>
			)}
		</>
	);
};

export default NavBar;
