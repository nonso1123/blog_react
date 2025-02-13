import React from "react";
import { NavLink } from "react-router-dom";

const ResponsiveNavBar = ({ isAuthenticated, username, logout }) => {
	return (
		<nav className="max-container padding-x py-6 dark:text-white max-md:block hidden">
			<ul className="flex items-center justify-center gap-6 text-[#383C4A] lg:flex-1 flex-col dark:text-white">
				{isAuthenticated ? (
					<>
						<li className="cursor-pointer">
							<NavLink
								to="/profile"
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
		</nav>
	);
};

export default ResponsiveNavBar;
