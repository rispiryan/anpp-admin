import { type ICreateShopping, type IDeleteShopping, type IUpdateShopping } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  create: "shopping/create",
  update: "shopping/update",
  delete: "shopping/delete",
  shopping: "shopping",
};

export function updateShopping(requestData: IUpdateShopping, id: string) {
  return request({
    data: { ...requestData, image: requestData?.image[0] || null },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.update}/${id}`,
    method: "PATCH",
  });
}

export function createShopping(requestData: ICreateShopping) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: { ...requestData, image: requestData.image[0] },
    url: `${END_POINTS.create}`,
    method: "POST",
  });
}

export function getShopping() {
  return request({
    url: `${END_POINTS.shopping}`,
  });
}

export function getSingleShopping(id: string) {
  return request({
    url: `${END_POINTS.shopping}/${id}`,
  });
}

export function deleteShopping(data: IDeleteShopping) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "DELETE",
    data,
  });
}
