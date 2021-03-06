import Commons from "./panels/commonInformation/CommonInformation";
import Costs from "./panels/expenses/HikeExpenses";
import IncomingPayments from "./panels/payments/IncomingPayments";
import Conversion from "./panels/conversion/MoneyConversion";
import Summary from "./panels/results/ReportResults";

export const childRoutes = {
  common: {
    path: "common",
    component: Commons,
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
