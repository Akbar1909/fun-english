import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
let isServer = false;
if (typeof window !== "undefined") {
  // Use window object safely here
  isServer = typeof window === "undefined";
  // Other window-related code
} else {
  // Handle code for non-browser environments (e.g., Node.js)
  console.log("Code is running in a non-browser environment");
}

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
