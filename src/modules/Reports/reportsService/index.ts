import { type ICreateReports, type IDeleteReports, type IUpdateReports } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  create: "reports/create",
  update: "reports/update",
  delete: "reports/delete",
  reports: "reports",
};

export function updateReports(requestData: IUpdateReports, id: string) {
  return request({
    data: { fileName: requestData.fileName, image: requestData.file[0] },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.update}/${id}`,
    method: "PATCH",
  });
}

export function createReports(requestData: ICreateReports) {
  return request({
    data: { fileName: requestData.fileName, image: requestData.file[0] },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.create}`,
    method: "POST",
  });
}

export function getReports() {
  return request({
    url: `${END_POINTS.reports}`,
  });
}

export function getSingleReports(id: string) {
  return request({
    url: `${END_POINTS.reports}/${id}`,
  });
}

export function deleteReports(data: IDeleteReports) {
  return request({
    data: { image: data.file, id: data.id },
    url: `${END_POINTS.delete}`,
    method: "DELETE",
  });
}
