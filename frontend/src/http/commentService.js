import api from "./axiosPublic";

const createComment = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.post("/comments", data, config);

  return response.data.comment;
};

const getComments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get("/comments", config);

  return response.data.comments;
};

const getComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/comments/${commentId}`, config);

  return response.data.comment;
};

const updateComment = async (commentId, content, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.patch(`/comments/${commentId}`, content, config);
  return response.data.comment;
};

const deleteComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.delete(`/comments/${id}`, config);

  return response.data;
};

const commentService = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  getComment,
};

export default commentService;