import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../api";

export function useLogin() {
  return useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
    onError: (err: any) => {
      console.error("Login Failed", err.message);
    },
  });
}
