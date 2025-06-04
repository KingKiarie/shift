import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { storeToken } from "../token";

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.token) {
        storeToken(data.token);
        console.log("Login success");

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("User info stored in localStorage");
        } else {
          console.warn("Login response missing user info");
        }
      } else {
        console.warn("No token received ");
      }
    },
    onError: (err: any) => {
      console.error("Login Failed ", err?.message || err);
    },
  });
}
