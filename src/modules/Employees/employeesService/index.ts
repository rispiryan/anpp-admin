import { type ICreateEmployees, type IDeleteEmployees, type IUpdateEmployees } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  update: "employees/update",
  delete: "employees/delete",
  create: "employees/create",
  vacancies: "employees",
};

export function updateEmployees(requestData: IUpdateEmployees, id: string) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: { ...requestData, image: requestData.image[0] },
    url: `${END_POINTS.update}/${id}`,
    method: "PATCH",
  });
}

export function createEmployees(requestData: ICreateEmployees) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: { ...requestData, image: requestData.image[0] },
    url: `${END_POINTS.create}`,
    method: "POST",
  });
}

export function getEmployees() {
  return request({
    url: `${END_POINTS.vacancies}`,
  });
}

export function getSingleEmployees(id: string) {
  return request({
    url: `${END_POINTS.vacancies}/${id}`,
  });
}

export function deleteEmployees(data: IDeleteEmployees) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "DELETE",
    data,
  });
}
