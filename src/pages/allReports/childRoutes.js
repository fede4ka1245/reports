import Balance from "@/pages/allReports/panels/balance/FinalBalance";
import IncomingPayments from "@/pages/allReports/panels/incomingPayments/IncomingPayments";
import RoutesList from "@/pages/allReports/panels/routesList/RoutesList";
import OutgoingPayments from "@/pages/allReports/panels/outgoingPayments/OutgoingPayments";

export const childRoutes = {
  RoutesList: {
    path: "routes-list",
    component: RoutesList,
  },
  outgoingPayments: {
    path: "outgoing-paymentsInformation",
    component: OutgoingPayments,
  },
  incomingPayments: {
    path: "incoming-paymentsInformation",
    component: IncomingPayments,
  },
  balance: {
    path: "balance",
    component: Balance,
  },
};
