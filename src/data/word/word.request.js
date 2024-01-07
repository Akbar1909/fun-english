import request from "@/services/request";

export const httpPostWord = (body) => {
  return request.post("/words", body);
};

export const httpGetMWordByMWordTag = (params) => {
  return request.get("/words/word-tag", { params });
};

export const httpGetWordsByWord = (params) => {
  return request.get("/words/find-many-by-word", { params });
};

export const httpPostAttachPhotoToWord = (body) => {
  return request.post("/words/attach-photo-to-word", body);
};

export const httpPostSaveWord = (body) => {
  return request.post("/words/save", body);
};
