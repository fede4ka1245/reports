import { request } from "@/api/request";

export const getRoutes = async () => {
  return request("https://www.vpoxod.ru/app/routes");
};
