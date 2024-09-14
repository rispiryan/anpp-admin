import { type ICreateCooperation } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  cooperationList: "cooperation",
  create: "cooperation/create",
};

export function createCooperation(requestData: ICreateCooperation) {
  return request({
    url: `${END_POINTS.create}`,
    data: requestData,
    method: "POST",
  });
}

export function getCooperation() {
  return request({
    url: `${END_POINTS.cooperationList}`,
  });
}
