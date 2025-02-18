import React from "react";
import BlogCard from "./BlogCard";
import Spinner from "./Spinner";

const BlogContainer = ({ isPending, blogs, title = "New Blog Posts" }) => {
	if (isPending) {
		return <Spinner />;
	}
	return (
		<section className="max-container padding-x py-6">
			<h2 className="font-semibold text-xl mb-6 dark:text-white text-center">
				{title}
			</h2>
			<div className="flex justify-center items-center gap-6 flex-wrap">
				{blogs?.map((blog) => (
					<BlogCard key={blog.id} blog={blog} />
				))}
			</div>
		</section>
	);
};

export default BlogContainer;
