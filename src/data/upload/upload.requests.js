import request from "@/services/request";

export function httpPostUpload(formData) {
  return request({
    url: "/files",
    method: "POST",
    headers: { "Content-type": "multipart/form-data" },
    data: formData,
  });
}

export function httpGetFile(id) {
  return request({
    url: `/files/${id}`,
    method: "GET",
    headers: { "Content-type": "multipart/form-data" },
  });
}

export function httpDeleteFile(id) {
  return request.delete(`/files/${id}`);
}
