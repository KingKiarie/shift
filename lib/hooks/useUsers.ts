import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";

export const useUsers = (companyCode: string) => {
  return useQuery({
    queryKey: ["users", companyCode],
    queryFn: () => fetchUsers(companyCode),
  });
};
