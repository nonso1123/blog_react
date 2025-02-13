import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUsername, signin } from "@/services/apiBlog";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { useMutation } from "@tanstack/react-query";

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = ({ setIsAuthenticated, setUsername }) => {
	const { register, handleSubmit, formState } = useForm();
	const { errors } = formState;
	const location = useLocation();
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: (data) => signin(data),
		onSuccess: (response) => {
			localStorage.setItem("access", response.access);
			localStorage.setItem("refresh", response.refresh);
			setIsAuthenticated(true);

			getUsername().then((res) => setUsername(res.username));
			toast.success("You have successfully signed in!!!");
			const from = location?.state?.from?.pathname || "/";
			navigate(from, { replace: true });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	const onSubmit = (data) => {
		console.log(data);
		mutation.mutate(data);
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 
    items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl 
    dark:text-white dark:bg-[#141624]"
		>
			<div className="flex flex-col gap-2 justify-center items-center mb-2">
				<h3 className="font-semibold text-2xl">Signin Form</h3>
				<p>Welcome back! Log in to continue.</p>
			</div>

			<div>
				<Label htmlFor="username" className="dark:text-[97989F]">
					Username
				</Label>
				<Input
					type="text"
					id="username"
					disabled={mutation.isPending}
					placeholder="Enter username"
					{...register("username", { required: "Username is required" })}
					className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
				/>
				{errors?.username?.message && (
					<small className="text-red-700">{errors.username.message}</small>
				)}
			</div>

			<div>
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					id="password"
					disabled={mutation.isPending}
					placeholder="Enter password"
					{...register("password", { required: "Password is required" })}
					className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px]  w-[300px]"
				/>
				{errors?.password?.message && (
					<small className="text-red-700">{errors.password.message}</small>
				)}
			</div>

			<div className="w-full flex items-center justify-center flex-col my-4">
				<button
					disabled={mutation.isPending}
					className="bg-[#486BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center"
				>
					{mutation.isPending ? (
						<>
							<SmallSpinner />{" "}
							<small className="ml-3 text-[16px]">Signing in</small>
						</>
					) : (
						"Signin"
					)}
				</button>
				<p className="text-[14px]">
					Don't have an account? <Link to="/signup">signup</Link>
				</p>
			</div>
		</form>
	);
};

export default LoginPage;
