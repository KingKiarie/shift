import axios, { AxiosRequestConfig, Method } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in .env.local");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function clientFetch<T>(
  url: string,
  method: Method = "GET",
  data?: any,
  token?: string
): Promise<T> {
  const config: AxiosRequestConfig = {
    url,
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    config.data = data;
  }

  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await axiosInstance(config);
    return response.data as T;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Request failed";
    throw new Error(message);
  }
}
