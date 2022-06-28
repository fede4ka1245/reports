import { request } from "@/api/requests/request";

export const getExpenseCategories = () => {
  return request("https://www.vpoxod.ru/app/expense-categories");
};
