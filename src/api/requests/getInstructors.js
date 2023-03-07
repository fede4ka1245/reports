import { request } from "@/api/requests/request";

export const getInstructors = () => {
  return request(`${process.env.VUE_APP_API_URL}/app/instructors`);
};
