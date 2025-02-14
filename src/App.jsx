import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";

import SignupPage from "./pages/SignupPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { getUsername } from "./services/apiBlog";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
	const [username, setUsername] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// ✅ Only fetch username if token exists
	const token = localStorage.getItem("access");

	const { data } = useQuery({
		queryKey: ["username"],
		queryFn: token ? getUsername : () => null,
		enabled: !!token, // ✅ Prevents request if there's no token
	});

	useEffect(() => {
		if (data) {
			setUsername(data.username);
			setIsAuthenticated(true);
		}
	}, [data]);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<AppLayout
							username={username}
							setIsAuthenticated={setIsAuthenticated}
							isAuthenticated={isAuthenticated}
							setUsername={setUsername}
						/>
					}
				>
					<Route index element={<HomePage />} />
					<Route
						path="/blogs/:slug"
						element={
							<DetailPage
								username={username}
								isAuthenticated={isAuthenticated}
							/>
						}
					/>
					<Route path="/signup" element={<SignupPage />} />
					<Route path="*" element={<NotFoundPage />} />
					<Route
						path="/profile/:username"
						element={<ProfilePage authUsername={username} />}
					/>
					<Route
						path="/create"
						element={
							<ProtectedRoute>
								<CreatePostPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/signin"
						element={
							<LoginPage
								setIsAuthenticated={setIsAuthenticated}
								setUsername={setUsername}
							/>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
