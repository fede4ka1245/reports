import { createRouter, createWebHashHistory } from "vue-router";
import CurrentReport from "../pages/currentReport/CurrentReport";
import AllReports from "../pages/allReports/AllReports";
import Feedback from "../pages/feedback/AppFeedback";
import { childRoutes as currentReportRoutes } from "@/pages/currentReport/childRoutes";
import { childRoutes as allReportRoutes } from "@/pages/allReports/childRoutes";

export const routes = {
  main: {
    path: "/",
    redirect: () => {
      return { path: `/current/${currentReportRoutes.common.path}` };
    },
  },
  current: {
    path: "/current",
    component: CurrentReport,
    children: Array.from(Object.values(currentReportRoutes)) || [],
    redirect: () => {
      return { path: `/current/${currentReportRoutes.common.path}` };
    },
  },
  allReports: {
    path: "/all-reports",
    component: AllReports,
    children: Array.from(Object.values(allReportRoutes)) || [],
    redirect: () => {
      return { path: `/all-reports/${allReportRoutes.RoutesList.path}` };
    },
  },
  feedback: {
    path: "/feedback",
    component: Feedback,
  },
};

const routerHistory = createWebHashHistory();

const router = createRouter({
  history: routerHistory,
  routes: Array.from(Object.values(routes)),
});

export default router;
