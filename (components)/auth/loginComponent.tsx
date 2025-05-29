"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/lib/api";
import { decodeJWT } from "@/lib/decodeJwt";

export default function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = decodeJWT();
      const company = payload?.companyCode;
      if (!company) {
        console.error("No warehouse found in token, contact support");
        return;
      }
      router.replace(`/dashboard/report/${company}`);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const credentials = {
      username: form.get("username") as string,
      password: form.get("password") as string,
    };

    try {
      const { token } = await LoginUser(credentials);
      console.log("Login Success, token:", token);

      localStorage.setItem("token", token);
      const payload = decodeJWT();
      const company = payload?.companyCode;

      if (!company) throw new Error("No CompanyCode found in token");

      setSuccess(true);

      setTimeout(() => {
        router.push(`/dashboard/report/${company}`);
      }, 2000);
    } catch (error: any) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-auto lg:h-screen flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
      <div className="w-full flex flex-col md:flex-row lg:flex-row gap-4">
        <div
          className="relative w-full h-[50vh] lg:h-screen bg-cover bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: "url('/login.jpg')" }}
        >
          <div className="w-full h-auto lg:h-screen absolute bg-black/60 hover:bg-black/30 duration-300 ease-in"></div>
          <div className="h-full w-full max-w-[90%] items-center justify-center flex flex-col space-y-4 z-40">
            <h1 className="text-[32px] lg:text-[56px] text-center text-white font-bold">
              Get informed with our pride systems
            </h1>
            <p className="text-white text-[18px] md:text-[20px] font-medium">
              Learn · Explore · get analytics
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center pb-14 lg:pb-0">
          <div className="w-full text-center py-12">
            <h1 className="text-[20px] md:text-[24px] lg:text-[32px] font-bold">
              Welcome Back to{" "}
              <span className="text-amber-600">Pride Systems</span> 👋
            </h1>
          </div>

          <form className="max-w-[80%] mx-auto w-full" onSubmit={handleLogin}>
            <div className="w-full space-y-4">
              <div className="w-full flex flex-col space-y-2">
                <label
                  htmlFor="username"
                  className="text-[16px] md:text-[20px] font-semibold"
                >
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

              <div className="w-full flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="text-[16px] md:text-[20px] font-semibold"
                >
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
              <div className="w-full flex flex-row items-start justify-between py-4 px-2">
                <span className="flex space-x-2">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="w-4 h-4 rounded-full"
                  />
                  <p className="text-[8px] md:text-[12px] lg:text-[14px] text-gray-800">
                    Remember me
                  </p>
                </span>
                <span>
                  <Link href={"/forgotten"}>
                    <p className="text-gray-400 text-[10px] font-light md:text-[12px] lg:text-[14px]">
                      Forgotten Password?
                    </p>
                  </Link>
                </span>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer bg-black hover:bg-[#1e1e1e] duration-300 ease-in text-white rounded-md w-full px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 font-bold"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {error && (
                  <p className="text-red-600 text-sm text-center mt-2">
                    {error}
                  </p>
                )}
                {success && (
                  <div className="absolute top-12 flex flex-col space-y-4 left-[50%] bg-[#1e1e1e] p-8 w-64 rounded-md">
                    <p className="text-green-600 font-bold md:text-[16px] ">
                      Success
                    </p>
                    <p className="text-white text-[16px] text-center mt-2">
                      Redirecting to your warehouse...
                    </p>
                  </div>
                )}

                <span className="w-full text-[8px] lg:text-[12px] py-4 text-gray-600 text-center">
                  Instant Login Coming Soon™
                </span>

                <div className="w-full text-center mt-4">
                  <p className="text-[12px] lg:text-[14px]">
                    Don't have an account?
                    <Link
                      href={"/signup"}
                      className="text-amber-600 underline underline-offset-4 px-2"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
