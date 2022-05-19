import Commons from "./panels/commons/Commons";
import Costs from "./panels/Costs";
import Payments from "./panels/payments/Payments";
import Conversion from "./panels/Conversion";
import Summary from "./panels/Summary";

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
