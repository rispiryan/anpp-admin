import { type ICreateVacancies, type IDeleteVacancies, type IUpdateVacancies } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  create: "vacancies/create",
  update: "vacancies/update",
  delete: "vacancies/delete",
  vacancies: "vacancies",
};

export function updateVacancies(requestData: IUpdateVacancies, id: string) {
  return request({
    url: `${END_POINTS.update}/${id}`,
    data: { ...requestData },
    method: "PATCH",
  });
}

export function createVacancies(requestData: ICreateVacancies) {
  return request({
    url: `${END_POINTS.create}`,
    data: { ...requestData },
    method: "POST",
  });
}

export function getVqacancies() {
  return request({
    url: `${END_POINTS.vacancies}`,
  });
}

export function getSingleVacancies(id: string) {
  return request({
    url: `${END_POINTS.vacancies}/${id}`,
  });
}

export function deleteVacancies(data: IDeleteVacancies) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "DELETE",
    data,
  });
}
