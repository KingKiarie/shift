import { apiClient } from "./axios";
import { User, GetUsersResponse } from "../types/user";

export const fetchUsers = async (companyCode: string): Promise<User[]> => {
  try {
    const { data }: { data: GetUsersResponse } = await apiClient.get(
      `/get-users?companyCode=${companyCode}`
    );
    console.log(data);

    return data.data;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};
