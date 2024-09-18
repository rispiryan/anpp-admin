import { type ICreateCooperation, type IDeleteCooperation } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  cooperationList: "cooperation",
  create: "cooperation/create",
  delete: "cooperation/delete",
};

export function createCooperation(requestData: ICreateCooperation) {
  console.log(requestData, "requestData");

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
    url: `${END_POINTS.cooperationList}`,
  });
}

export function deleteCooperation(data: IDeleteCooperation) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "POST",
    data,
  });
}
