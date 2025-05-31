import { useQuery } from "@tanstack/react-query";

export function useCompanyUsers(companyCode: string | undefined) {
  return useQuery({
    queryKey: ["companyUser", companyCode],
    queryFn: async () => {
      if (!companyCode) throw new Error("company code is missing");

      const res = await fetch(
        `/api/proxy/user/getUsers?companyCode=${companyCode}`
      );
      if (!res.ok) throw new Error("Failed to fetch Users");
      return res.json();
    },
    enabled: !!companyCode,
  });
}
