import React from "react";
import pic from "../images/pic.jpg";
import { BASE_URL } from "@/api";

import { FormatDate } from "@/services/formatDate";
import { Link } from "react-router-dom";

const CardFooter = ({ blog }) => {
	return (
		<Link to={`/profile/${blog.author.username}`}>
			<div className="flex items-center gap-4">
				<span className="flex items-center gap-2">
					<div className="w-[40px] h-[40px] rounded-full overflow-hidden">
						<img
							src={`${BASE_URL}${blog.author.profile_picture}`}
							className="rounded-full w-full h-full object-cover"
						/>
					</div>
					<small className="text-[#97989F] text-[12px] font-semibold">
						{blog.author.first_name} {blog.author.last_name}
					</small>
				</span>
				<small className="text-[#97989F] text-[12px] font-semibold ">
					{FormatDate(blog.published_date)}
				</small>
			</div>
		</Link>
	);
};

export default CardFooter;
