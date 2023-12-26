import request from "@/services/request";

export const httpGetWordTags = () => {
  return request.get("/word-tags");
};

export const httpPostWordTag = (dto) => {
  return request.post("/word-tags", dto);
};

export const httpGetWordTagsCount = () => {
  return request.get("/words/count");
};
