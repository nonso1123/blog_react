import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import PagePagination from "@/ui_components/PagePagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const HomePage = () => {
	const numOfBlogsPerPage = 3;
	const [page, setPage] = useState(1);
	const {
		isPending,
		isError,
		data: blogs,
		error,
	} = useQuery({
		queryKey: ["blogs", page],
		queryFn: () => getBlogs(page),
		placeholderData: keepPreviousData,
	});
	const numOfPages = Math.ceil(blogs?.count / numOfBlogsPerPage);
	console.log(numOfPages);
	console.log(blogs);
	const handlePageChange = (value) => {
		setPage(value);
	};
	const handleNextPage = () => {
		setPage((curr) => curr + 1);
	};
	const handlePrevPage = () => {
		setPage((curr) => curr - 1);
	};
	return (
		<>
			<Header />
			<BlogContainer isPending={isPending} blogs={blogs?.results} />
			<PagePagination
				numOfPages={numOfPages}
				handlePageChange={handlePageChange}
				page={page}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
			/>
		</>
	);
};

export default HomePage;
