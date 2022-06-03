import Commons from "./panels/commonInformation/CommonInformation";
import Costs from "./panels/expenses/Expenses";
import IncomingPayments from "./panels/payments/IncomingPayments";
import Conversion from "./panels/conversion/Conversion";
import Summary from "./panels/results/Results";

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
