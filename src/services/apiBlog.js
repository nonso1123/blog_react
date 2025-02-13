import api from "../api";

export const getBlogs = async (page) => {
	try {
		const response = await api.get(`blog_list?page=${page}`);
		return response.data;
	} catch (err) {
		throw new Error(err);
	}
};
export const getBlog = async (slug) => {
	try {
		const response = await api.get(`blogs/${slug}/`);
		return response.data;
	} catch (err) {
		throw new Error(err);
	}
};
export const registerUser = async (data) => {
	try {
		const response = await api.post("register_user/", data);
		return response.data;
	} catch (err) {
		console.log(err);
		if (err.status === 400) {
			throw new Error("A user with that username already exists.");
		}
		throw new Error(err);
	}
};
export const signin = async (data) => {
	try {
		const response = await api.post("token/", data);
		return response?.data;
	} catch (err) {
		console.log(err);
		if (err.status === 401) {
			throw new Error("Invalid username or password");
		}
		throw new Error(err);
	}
};
export const getUsername = async () => {
	try {
		const response = await api.get("get_username");
		return response.data;
	} catch (err) {
		throw new Error(err);
	}
};
export const createBlog = async (data) => {
	try {
		const response = await api.post("create_blog/", data);
		return response.data;
	} catch (err) {
		if (err.response) {
			throw new Error(err?.response?.data?.message || "Failed to update blog");
		}
		throw new Error(err);
	}
};
export const updateBlog = async (data, id) => {
	try {
		const response = await api.put(`update_blog/${id}/`, data);
		return response.data;
	} catch (err) {
		if (err.response) {
			throw new Error(err?.response?.data?.message || "Failed to update blog");
		}
		throw new Error(err);
	}
};
export const deleteBlog = async (id) => {
	try {
		const response = await api.post(`delete_blog/${id}/`);
		return response.data;
	} catch (err) {
		if (err.response) {
			throw new Error(err?.response?.data?.message || "Failed to delete blog");
		}
		throw new Error(err);
	}
};
export const getUserInfo = async (username) => {
	try {
		const response = await api.get(`get_userInfo/${username}`);
		return response.data;
	} catch (err) {
		throw new Error(err);
	}
};
export const updateProfile = async (data) => {
	try {
		const response = await api.put("update_profile/", data);
		return response.data;
	} catch (err) {
		console.log(err);
		if (err.response) {
			throw new Error(
				err?.response?.data?.username[0] || "Failed to update profile"
			);
		}
		throw new Error(err);
	}
};
