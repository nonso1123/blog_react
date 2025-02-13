import React from "react";
import Badge from "./Badge";
import CardFooter from "./CardFooter";
import thumbnail from "../images/design_vii.jpg";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/api";

const BlogCard = ({ blog }) => {
	return (
		<div className="px-3 py-3 rounded-md shadow-lg w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border">
			<div className="w-full h-[200px] rounded-md overflow-hidden">
				<img
					src={`${BASE_URL}${blog.featured_image}`}
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<Badge blog={blog} />
			<Link to={`/blogs/${blog.slug}`} className="cursor-pointer">
				<h3 className="font-semibold leading-normal text-[#181A2A] mb-0 dark:text-white cursor-pointer">
					{blog.title}
				</h3>
			</Link>
			<CardFooter blog={blog} />
		</div>
	);
};

export default BlogCard;
