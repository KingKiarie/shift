import { apiClient } from "./axios";

export const loginUser = async (username: string, password: string) => {
  const { data } = await apiClient.post("/auth/login", { username, password });
  return data;
};
