import axiosInstance from "./axios";

export const registerUserAPI = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginUserAPI = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};
