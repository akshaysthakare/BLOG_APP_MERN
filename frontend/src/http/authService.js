import api from "./axiosPublic";

const register = async (userData) => {
  const resposne = await api.post("/users/register", userData);

  return resposne.data.user;
};

const login = async (userData) => {
  const resposne = await api.post("/users/login", userData);

  if (resposne.data) {
    localStorage.setItem("user", JSON.stringify(resposne.data.user));
    localStorage.setItem("token", JSON.stringify(resposne.data.token));
  }
  return resposne.data;
};

const authService = {
  register,
  login,
};

export default authService;
