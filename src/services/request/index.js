import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = false;
const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const dictionaryRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_DICTIONARY_URL,
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
    // const requestForNextAuth = {
    //   headers: {
    //     cookie: document.cookie,
    //   },
    // };
    // const session = await getSession({ req: requestForNextAuth });
    // if (session?.accessToken) {
    //   config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
    // }
  }

  return config;
});

export default request;
