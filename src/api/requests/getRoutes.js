import { request } from "@/api/requests/request";

export const getRoutes = async () => {
  return request(`${process.env.VUE_APP_API_URL}/app/routes`);
};
