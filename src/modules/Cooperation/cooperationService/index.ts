import { type ICreateCooperation, type IDeleteCooperation, type IUpdateCooperation } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  create: "Cooperation/create",
  update: "Cooperation/update",
  delete: "Cooperation/delete",
  cooperation: "cooperation",
};

export function updateCooperation(requestData: IUpdateCooperation, id: string) {
  return request({
    data: { ...requestData, image: requestData?.image[0] || null },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.update}/${id}`,
    method: "PATCH",
  });
}

export function createCooperation(requestData: ICreateCooperation) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: { ...requestData, image: requestData.image[0] },
    url: `${END_POINTS.create}`,
    method: "POST",
  });
}

export function getCooperation() {
  return request({
    url: `${END_POINTS.cooperation}`,
  });
}

export function getSingleCooperation(id: string) {
  return request({
    url: `${END_POINTS.cooperation}/${id}`,
  });
}

export function deleteCooperation(data: IDeleteCooperation) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "DELETE",
    data,
  });
}
