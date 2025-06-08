import { apiClient } from "./axios";

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const { data } = await apiClient.post("/login", credentials);
  return data;
};
