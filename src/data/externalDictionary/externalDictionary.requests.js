import { dictionaryRequest } from "@/services/request";

export const httpGetWordFromExternalDictionary = (search) => {
  return dictionaryRequest.get(`/${search}`);
};
