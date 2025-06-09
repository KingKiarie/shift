"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/lib/decodeJwt";
import { getToken } from "@/lib/token";
import { useLogin } from "@/lib/hooks/useLogin";
import { CheckCheckIcon } from "lucide-react";

export default function LoginComponent() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const payload = decodeJWT();
        const company = payload?.companyCode;
        if (company) {
          router.replace(`/dashboard/${company}`);
        } else {
          console.error("No company code found in token");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const credentials = {
      username: form.get("username") as string,
      password: form.get("password") as string,
    };

    // Basic validation
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password");
      return;
    }

    login(credentials, {
      onSuccess: () => {
        try {
          const payload = decodeJWT();
          const company = payload?.companyCode;

          if (!company) {
            setError("No company code found in authentication token.");
            return;
          }

          setSuccess(true);
          setTimeout(() => {
            router.push(`/dashboard/${company}`);
          }, 1000);
        } catch (err) {
          setError("Failed to process authentication token.");
        }
      },
      onError: (err: any) => {
        setError(
          err?.message || "Login failed. Please check your credentials."
        );
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="w-full h-auto lg:h-screen flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
      <div className="w-full flex flex-col md:flex-row lg:flex-row gap-4">
        <div
          className="relative w-full h-[50vh] lg:h-screen bg-cover bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: "url('/login.jpeg')" }}
        >
          <div className="w-full h-auto lg:h-screen absolute bg-black/60 hover:bg-black/30 duration-300 ease-in"></div>
          <div className="h-full w-full max-w-[90%] items-center justify-center flex flex-col space-y-4 z-40">
            <h1 className="text-[32px] lg:text-[56px] text-center text-white font-bold">
              Get informed with{" "}
              <span className="text-blue-500">Prime Mattress systems</span>{" "}
            </h1>
            <p className="text-white text-[18px] md:text-[20px] font-medium">
              Track · Explore · Get reports
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center pb-14 lg:pb-0">
          <div className="w-full text-center py-12">
            <h1 className="text-[20px] md:text-[24px] lg:text-[32px] font-bold">
              Welcome Back to{" "}
              <span className="text-blue-600">Prime Mattress</span> 👋
            </h1>
          </div>

          <form className="max-w-[80%] mx-auto w-full" onSubmit={handleLogin}>
            <div className="w-full space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="username" className="text-[16px] font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  required
                  className="border-2 border-black focus:border-green-400 p-4 rounded-md"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-[16px] font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="password"
                    required
                    className="border-2 border-black focus:border-green-400 p-4 pr-12 rounded-md w-full"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 flex flex-col">
              <div className="flex justify-between py-4 px-2">
                <label className="flex items-center space-x-2 text-gray-800 text-[12px]">
                  <input type="checkbox" name="remember" className="w-4 h-4" />
                  <span>Remember me</span>
                </label>
                <Link href="/forgotten">
                  <p className="text-gray-400 text-[12px]">
                    Forgotten Password?
                  </p>
                </Link>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-black hover:bg-[#1e1e1e] text-white font-bold w-full py-3 rounded-md duration-300 ease-in"
                >
                  {isPending ? "Logging in..." : "Login"}
                </button>

                {error && (
                  <p className="text-red-600 text-sm text-center mt-2">
                    {error}
                  </p>
                )}

                {success && (
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-[#1e1e1e] border-l-4 border-green-500 shadow-lg rounded-xl px-6 py-4 w-80 flex items-start space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                        <CheckCheckIcon className="text-green-600 w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-green-500 font-semibold text-base md:text-lg">
                          Success
                        </p>
                        <p className="text-white text-sm md:text-base">
                          Redirecting to your dashboard...
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-gray-600 text-center py-4">
                  Instant Login Coming Soon™
                </span>

                <div className="hidden text-center mt-4 text-[14px]">
                  Don't have an account?
                  <Link href="#" className="text-red-600 underline px-2">
                    contact your admin
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
