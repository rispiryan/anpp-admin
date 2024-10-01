import { type ICreateNews, type IUpdateNews, type IDeleteNews } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  create: "news/create",
  update: "news/update",
  delete: "news/delete",
  news: "news",
};

export function updateNews(requestData: IUpdateNews, id: string) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.update}/${id}`,
    data: { ...requestData },
    method: "PATCH",
  });
}

export function createNews(requestData: ICreateNews) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.create}`,
    data: { ...requestData },
    method: "POST",
  });
}

export function getNews() {
  return request({
    url: `${END_POINTS.news}`,
  });
}

export function getSingleNews(id: string) {
  return request({
    url: `${END_POINTS.news}/${id}`,
  });
}

export function deleteNews(data: IDeleteNews) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "DELETE",
    data,
  });
}
