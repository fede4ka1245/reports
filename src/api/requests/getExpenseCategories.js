import { request } from "@/api/requests/request";

export const getExpenseCategories = () => {
  return request(`${process.env.VUE_APP_API_URL}/app/expense-categories`);
};
