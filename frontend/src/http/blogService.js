import api from "./axiosPublic";

// const token = JSON.parse(localStorage.getItem("token"))

const createBlog = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': `multipart/form-data`,
    },
  };
  const response = await api.post("/posts", data, config);

  return response.data.post;
};



const getBlog = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/posts/${blogId}`, config);

  return response.data.post;
};

const getBlogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get("/posts", config);

  return response.data.posts;
};

const deleteBlog = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = api.delete(`/posts/${blogId}`, config);

  return response.data.post;
};

const blogService = {
  createBlog,
  getBlog,
  getBlogs,
  deleteBlog
};

export default blogService;