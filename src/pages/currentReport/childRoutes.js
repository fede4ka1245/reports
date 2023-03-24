import Commons from "./panels/commonInformation/CommonInformation";
import Costs from "./panels/expenses/HikeExpenses";
import IncomingPayments from "./panels/payments/IncomingPayments";
import Conversion from "./panels/conversion/MoneyConversion";
import Summary from "./panels/results/ReportResults";
import CheckList from "@/pages/currentReport/panels/checkList/CheckList.vue";

export const childRoutes = {
  common: {
    path: "common",
    component: Commons,
  },
  checkList: {
    path: "checkList",
    component: CheckList,
  },
  payments: {
    path: "payments",
    component: IncomingPayments,
  },
  costs: {
    path: "costs",
    component: Costs,
  },
  conversion: {
    path: "conversion",
    component: Conversion,
  },
  summary: {
    path: "summary",
    component: Summary,
  },
};
