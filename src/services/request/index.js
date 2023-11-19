import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === "undefined";

const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers"),
      token = cookies().get("token")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

export default request;
