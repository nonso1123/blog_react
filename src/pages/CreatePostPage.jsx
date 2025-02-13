import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectLabel,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import InputError from "@/ui_components/InputError";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, updateBlog } from "@/services/apiBlog";
import { toast } from "react-toastify";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";

const CreatePostPage = ({ blog, isAuthenticated }) => {
	const { register, handleSubmit, formState, setValue } = useForm({
		defaultValues: blog ? blog : {},
	});
	const { errors } = formState;
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const blogID = blog?.id;

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("content", data.content);
		formData.append("category", data.category);
		if (data.featured_image && data.featured_image[0] != "/") {
			formData.append("featured_image", data.featured_image[0]);
		}
		if (blog && blogID) {
			updateMutation.mutate({ data: formData, id: blogID });
		} else {
			mutation.mutate(formData);
		}
	};
	const updateMutation = useMutation({
		mutationFn: ({ data, id }) => updateBlog(data, id),
		onSuccess: () => {
			navigate("/");
			toast.success("Your Post have been updated successfully");
		},
		onError: (err) => {
			toast.error(err.message);
			console.log(err);
		},
	});
	const mutation = useMutation({
		mutationFn: (data) => createBlog(data),
		onSuccess: () => {
			toast.success("New post added successfully");
			queryClient.invalidateQueries({ queryKey: ["blogs"] });
			navigate("/");
		},
	});
	if (isAuthenticated === false) {
		<Navigate to="/signin" />;
	}
	return (
		<form
			className={`${blog && "h-[90%] overflow-y-auto"}
			 md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col gap-2 justify-center items-center mb-2">
				<h3 className="font-semibold text-2xl">
					{blog ? "Update Post" : "Create Post"}
				</h3>
				<p>
					{blog
						? "Modify your Post and save update"
						: "Create a new post and share your ideas"}
				</p>
			</div>
			<div>
				<Label htmlFor="title" className="dark:text-[white]">
					Title
				</Label>
				<Input
					type="text"
					id="title"
					placeholder="Give your post a title"
					{...register("title", {
						required: "Blog's title is required",
						minLength: {
							value: 3,
							message: "The title must be at least 3 characters",
						},
					})}
					className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px] max-sm:w-[300px] max-sm:text-[14px]"
				/>
				{errors?.title?.message && <InputError error={errors.title.message} />}
			</div>
			<div>
				<Label htmlFor="content">Content</Label>
				<Textarea
					id="content"
					placeholder="Write your blog post"
					{...register("content", {
						required: "Blog's content is required",
						minLength: {
							value: 10,
							message: "The content must be at least 10 characters",
						},
					})}
					className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px] w-[400px] max-sm:w-[300px] max-sm:text-[14px]"
				/>
				{errors?.content?.message && (
					<InputError error={errors.content.message} />
				)}
			</div>
			<div className="w-full">
				<Label htmlFor="category">Category</Label>
				<Select
					{...register("category", { required: "Blog's category is required" })}
					onValueChange={(value) => setValue("category", value)}
					defaultValue={blog ? blog.category : ""}
				>
					<SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]">
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Categories</SelectLabel>
							<SelectItem value="Frontend">Frontend</SelectItem>
							<SelectItem value="Backend">Backend</SelectItem>
							<SelectItem value="Fullstack">Fullstack</SelectItem>
							<SelectItem value="Web3">Web3</SelectItem>
							<SelectItem value="Design">Design</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				{errors?.category?.message && (
					<InputError error={errors.category.message} />
				)}
			</div>
			<div className="w-full">
				<Label htmlFor="featured_image">Featured Image</Label>
				<Input
					type="file"
					id="picture"
					{...register("featured_image", {
						required: blog ? false : "Blog's featured image is required",
					})}
					className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
				/>
				{errors?.featured_image?.message && (
					<InputError error={errors.featured_image.message} />
				)}
			</div>
			<div className="w-full flex items-center justify-center flex-col my-4">
				<button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
					{blog ? (
						updateMutation.isPending ? (
							<>
								<SmallSpinner /> <SmallSpinnerText text={"Updating post.."} />{" "}
							</>
						) : (
							"Update post"
						)
					) : mutation.isPending ? (
						<>
							<SmallSpinner /> <SmallSpinnerText text={"Creating post.."} />{" "}
						</>
					) : (
						"Create post"
					)}
				</button>
			</div>
		</form>
	);
};

export default CreatePostPage;
