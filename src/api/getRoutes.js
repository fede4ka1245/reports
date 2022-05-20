import { request } from "@/api/request";

export const getRoutes = () => {
  return request("https://www.vpoxod.ru/app/routes");
};
