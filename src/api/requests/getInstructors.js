import { request } from "@/api/requests/request";

export const getInstructors = () => {
  return request("https://www.vpoxod.ru/app/instructors");
};
