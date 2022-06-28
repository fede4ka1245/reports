import { request } from "@/api/requests/request";

export const getRoutes = async () => {
  return request("https://www.vpoxod.ru/app/routes");
};
