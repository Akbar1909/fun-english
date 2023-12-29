import request from "@/services/request";

export const httpPostWord = (body) => {
  return request.post("/words", body);
};

export const httpGetMWordByMWordTag = (params) => {
  return request.get("/words/word-tag", { params });
};
