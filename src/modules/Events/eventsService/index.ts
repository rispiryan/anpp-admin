import { type ICreateEvents, type IDeleteEvents, type IUpdateEvents } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  create: "events/create",
  update: "events/update",
  delete: "events/delete",
  events: "events",
};

export function updateEvents(requestData: IUpdateEvents, id: string) {
  return request({
    data: { ...requestData, image: requestData?.image[0] || null },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.update}/${id}`,
    method: "PATCH",
  });
}

export function createEvents(requestData: ICreateEvents) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: { ...requestData, image: requestData.image[0] },
    url: `${END_POINTS.create}`,
    method: "POST",
  });
}

export function getEvents() {
  return request({
    url: `${END_POINTS.events}`,
  });
}

export function getSingleEvents(id: string) {
  return request({
    url: `${END_POINTS.events}/${id}`,
  });
}

export function deleteEvents(data: IDeleteEvents) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "DELETE",
    data,
  });
}
