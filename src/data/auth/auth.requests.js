import request from "@/services/request";

export const httpPostSignin = (body) => {
  return request.post("/auth/signin", body);
};

export const httpPostSignup = (body) => {
  return request.post("/auth/signup", body);
};

export const httpPostCheckUsernameExist = (body) => {
  return request.post("/auth/check-username-exist", body);
};
