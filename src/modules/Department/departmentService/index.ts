import { type IUpdateDepartment, type IDeleteDepartment, type ICreateDepartment } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  create: "department/create",
  update: "department/update",
  delete: "department/delete",
  department: "department",
};

export function updateDepartment(requestData: IUpdateDepartment, id: string) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.update}/${id}`,
    data: { ...requestData },
    method: "PATCH",
  });
}

export function createDepartment(requestData: ICreateDepartment) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      ...requestData,
    },
    url: `${END_POINTS.create}`,
    method: "POST",
  });
}

export function getDepartment() {
  return request({
    url: `${END_POINTS.department}`,
  });
}

export function getSingleDepartment(id: string) {
  return request({
    url: `${END_POINTS.department}/${id}`,
  });
}

export function deleteDepartment(data: IDeleteDepartment) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "DELETE",
    data,
  });
}
