import { getExpenseCategories } from "@/api/requests";
import { getRoutes } from "@/api/requests";
import { getRatesXML } from "@/api/requests";
import { getInstructors } from "@/api/requests";
import { cachedRequest } from "@/api/cachedRequests/cachedRequest";
import { storageKey } from "@/helpers/localStorage";

const cachedRequestInstructors = cachedRequest(
  getInstructors,
  storageKey.instructors
);
const cachedRequestRatesXML = cachedRequest(getRatesXML, storageKey.rates);
const cachedRequestRoutes = cachedRequest(getRoutes, storageKey.routes);
const cachedRequestExpensesCategories = cachedRequest(
  getExpenseCategories,
  storageKey.expensesCategories
);

export {
  cachedRequestRoutes,
  cachedRequestRatesXML,
  cachedRequestInstructors,
  cachedRequestExpensesCategories,
};
