import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, updateProfile } from "@/services/apiBlog";
import { toast } from "react-toastify";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/ui_components/InputError";

const SignupPage = ({ userInfo, updateForm, toggleModal }) => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState, reset, watch } = useForm({
		defaultValues: userInfo ? userInfo : {},
	});
	const queryClient = useQueryClient();
	const { errors } = formState;
	const password = watch("password");
	const onSubmit = (data) => {
		if (updateForm) {
			const formData = new FormData();
			formData.append("username", data.username);
			formData.append("first_name", data.first_name);
			formData.append("last_name", data.last_name);
			formData.append("job_title", data.job_title);
			formData.append("bio", data.bio);
			if (data.profile_picture && data.profile_picture[0] != "/") {
				formData.append("data.profile_picture", data.profile_picture[0]);
			}
			updateProfileMutation.mutate(formData);
		} else {
			mutation.mutate(data);
		}
	};
	const updateProfileMutation = useMutation({
		mutationFn: (data) => updateProfile(data),
		onSuccess: () => {
			toast.success("Profile updated successfully!!!");
			toggleModal();

			queryClient.invalidateQueries(["users", username]);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	const mutation = useMutation({
		mutationFn: (data) => registerUser(data),
		onSuccess: () => {
			toast.success("You have successfully created an account!!!");
			navigate("/signin");
			reset();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	return (
		<form
			className={`${
				updateForm && "h-[90%] overflow-y-scroll "
			} md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className=" flex flex-col gap-2 justify-center items-center mb-2">
				<h3 className="font-semibold text-2xl">
					{updateForm ? "Update Profile Form" : "SignUp form"}
				</h3>
				<p>
					{updateForm
						? "Tell us more about yourself"
						: "Create your account to get started"}
				</p>
			</div>
			<div>
				<Label htmlFor="username" className="dark:text-white">
					Username
				</Label>
				<Input
					type="text"
					id="username"
					placeholder="Enter username"
					{...register("username", {
						required: "Username is required",
						minLength: {
							value: 3,
							message: "Username must be at least three characters",
						},
					})}
					className="border-2 border-[#141624] dark:border-[#383C4A] focus:outline-0 h-[40px] w-[300px]"
				/>
				{errors?.username?.message && (
					<small className="text-red-700">{errors.username.message}</small>
				)}
			</div>
			<div>
				<Label htmlFor="first_name" className="dark:text-white">
					First Name
				</Label>
				<Input
					type="text"
					id="first_name"
					placeholder="Enter First Name"
					{...register("first_name", {
						required: "First Name is required",
						minLength: {
							value: 3,
							message: "First Name must be at least three characters",
						},
					})}
					className="border-2 border-[#141624] dark:border-[#383C4A] focus:outline-0 h-[40px] w-[300px]"
				/>
				{errors?.first_name?.message && (
					<small className="text-red-700">{errors.first_name.message}</small>
				)}
			</div>
			<div>
				<Label htmlFor="last_name" className="dark:text-white">
					Last Name
				</Label>
				<Input
					type="text"
					id="last_name"
					placeholder="Enter Last Name"
					{...register("last_name", {
						required: "Last Name is required",
						minLength: {
							value: 3,
							message: "Last Name must be at least three characters",
						},
					})}
					className="border-2 border-[#141624] dark:border-[#383C4A] focus:outline-0 h-[40px] w-[300px]"
				/>
				{errors?.last_name?.message && (
					<small className="text-red-700">{errors.last_name.message}</small>
				)}
			</div>
			{updateForm && (
				<div>
					<Label htmlFor="job_title" className="dark:text-[97989F]">
						Job Title
					</Label>
					<Input
						type="text"
						id="job_title"
						placeholder="Enter Job Title"
						{...register("job_title", {
							required: "Your job title is required",
							minLength: {
								value: 3,
								message: "Your job title must be at least 3 characters",
							},
						})}
						className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
					/>
					{errors?.job_title?.message && (
						<InputError error={errors.job_title.message} />
					)}
				</div>
			)}

			{updateForm && (
				<div>
					<Label htmlFor="content">Bio</Label>
					<Textarea
						id="content"
						placeholder="Tell us more about you"
						{...register("bio", {
							required: "Your bio is required",
							minLength: {
								value: 10,
								message: "The content must be at least 10 characters",
							},
						})}
						className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[300px] text-justify"
					/>
					{errors?.bio?.message && <InputError error={errors.bio.message} />}
				</div>
			)}

			{updateForm && (
				<div className="w-full">
					<Label htmlFor="profile_picture">Profile Picture</Label>
					<Input
						type="file"
						id="picture"
						{...register("profile_picture", {
							required: false,
						})}
						className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
					/>

					{/* {errors?.profile_picture?.message && (
          <InputError error={errors.profile_picture.message} />
        )} */}
				</div>
			)}

			{updateForm || (
				<>
					<div>
						<Label htmlFor="password" className="dark:text-white">
							Password
						</Label>
						<Input
							type="password"
							id="password"
							placeholder="Enter password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 8,
									message: "Password must be at least eight characters",
								},
							})}
							className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
						/>
						{errors?.password?.message && (
							<small className="text-red-700">{errors.password.message}</small>
						)}
					</div>
					<div>
						<Label htmlFor="confirmPassword" className="dark:text-white">
							Confirm Password
						</Label>
						<Input
							type="password"
							id="confirmPassword"
							placeholder="Confirm password"
							{...register("confirmPassword", {
								required: "Confirm Password is required",
								minLength: {
									value: 8,
									message: "Password must be at least eight characters",
								},
								validate: (value) =>
									value === password || "Password do not match",
							})}
							className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
						/>
						{errors?.confirmPassword?.message && (
							<small className="text-red-700">
								{errors.confirmPassword.message}
							</small>
						)}
					</div>
				</>
			)}
			<div className="w-full flex justify-center items-center flex-col my-4">
				<button className="bg-[#486BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center">
					{updateForm ? (
						updateProfileMutation.isPending ? (
							<>
								<SmallSpinner />{" "}
								<small className="ml-3 text-[16px]">Updating user</small>
							</>
						) : (
							"Update User"
						)
					) : mutation.isPending ? (
						<>
							<SmallSpinner />{" "}
							<small className="ml-3 text-[16px]">Creating user</small>
						</>
					) : (
						"Signup"
					)}
				</button>
				{updateForm || (
					<p className="text-[#141624] dark:text-white">
						Already have an account? <Link to="/signin">Sign in</Link>
					</p>
				)}
			</div>
		</form>
	);
};

export default SignupPage;
