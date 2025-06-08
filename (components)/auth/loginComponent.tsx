"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/lib/decodeJwt";
import { getToken } from "@/lib/token";
import { useLogin } from "@/lib/hooks/useLogin";

export default function LoginComponent() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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
              Get informed with our{" "}
              <span className="text-red-500">Prime Mattress</span>{" "}
            </h1>
            <p className="text-white text-[18px] md:text-[20px] font-medium">
              Track · Explore · Get reports
            </p>
          </div>
        </div>

        {/* Right side (form) */}
        <div className="w-full flex flex-col items-center justify-center pb-14 lg:pb-0">
          <div className="w-full text-center py-12">
            <h1 className="text-[20px] md:text-[24px] lg:text-[32px] font-bold">
              Welcome Back to{" "}
              <span className="text-red-600">
                Prime Mattress <span className="text-blue-500">Shift</span>
              </span>{" "}
              👋
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
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  required
                  className="border-2 border-black focus:border-green-400 p-4 rounded-md"
                />
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
                  <div className="absolute top-12 flex flex-col space-y-4 left-[50%] bg-[#1e1e1e] p-8 w-64 rounded-md">
                    <p className="text-green-600 font-bold">Success</p>
                    <p className="text-white text-center">
                      Redirecting to your warehouse...
                    </p>
                  </div>
                )}

                <span className="text-[10px] text-gray-600 text-center py-4">
                  Instant Login Coming Soon™
                </span>

                <div className="text-center mt-4 text-[14px]">
                  Don't have an account?
                  <Link
                    href="/signup"
                    className="text-amber-600 underline px-2"
                  >
                    Signup
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
