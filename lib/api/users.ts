import { apiClient } from "./axios";
import { User } from "../types/user";

export const fetchUsers = async (companyCode: string): Promise<User[]> => {
  const { data } = await apiClient.get(`/user/${companyCode}`);
  return data.data;
};
