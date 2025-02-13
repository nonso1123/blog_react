import { getUserInfo } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Hero from "@/ui_components/Hero";
import Modal from "@/ui_components/Modal";
import Spinner from "@/ui_components/Spinner";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SignupPage from "./SignupPage";

const ProfilePage = ({ authUsername }) => {
	const { username } = useParams();
	const [showModal, setShowModal] = useState(false);
	const { data, isPending } = useQuery({
		queryKey: ["users", username],
		queryFn: () => getUserInfo(username),
	});
	if (isPending) {
		return <Spinner />;
	}
	const blogs = data?.author_post;

	const toggleModal = () => {
		setShowModal((curr) => !curr);
	};
	return (
		<>
			<Hero
				userInfo={data}
				authUsername={authUsername}
				toggleModal={toggleModal}
			/>
			<BlogContainer blogs={blogs} title={`🍔 ${username}'s Posts`} />
			{showModal && (
				<Modal toggleModal={toggleModal}>
					<SignupPage
						userInfo={data}
						updateForm={true}
						toggleModal={toggleModal}
					/>
				</Modal>
			)}
		</>
	);
};

export default ProfilePage;
