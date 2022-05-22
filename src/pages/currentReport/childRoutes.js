import Commons from "./panels/commonInformation/CommonInformation";
import Costs from "./panels/expenses/Expenses";
import Payments from "./panels/payments/Payments";
import Conversion from "./panels/conversion/Conversion";
import Summary from "./panels/results/Results";

export const childRoutes = {
  common: {
    path: "common",
    component: Commons,
  },
  payments: {
    path: "payments",
    component: Payments,
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
