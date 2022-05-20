import { request } from "@/api/request";

export const getExpenseCategories = () => {
  return request("https://www.vpoxod.ru/app/expense-categories");
};
