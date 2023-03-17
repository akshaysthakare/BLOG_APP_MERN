import api from "./axiosPublic";

const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = api.get(`/users/${userId}`, config);

  return response.data.user;
};

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = api.get("/users", config);

  return response.data.users;
};

const userService = {
  getUser,
  getUsers,
};

export default userService;