import request from "@/services/request";

export const httpPostWord = (body) => {
  return request.post("/words", body);
};
