import { request } from "@/api/request";

export const getInstructors = () => {
  return request("https://www.vpoxod.ru/app/instructors");
};
