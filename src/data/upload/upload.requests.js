import request from "@/services/request";

export function httpPostUpload(formData) {
  return request({
    url: "/upload",
    method: "POST",
    headers: { "Content-type": "multipart/form-data" },
    data: formData,
  });
}

export function httpGetFile(id) {
  return request({
    url: `/upload/${id}`,
    method: "GET",
    headers: { "Content-type": "multipart/form-data" },
  });
}

export function httpDeleteFile(id) {
  return request.delete(`/upload/${id}`);
}
