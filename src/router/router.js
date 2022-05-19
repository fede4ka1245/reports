import { createRouter, createWebHashHistory } from "vue-router";
import CurrentReport from "../pages/currentReport/CurrentReport";
import AllReports from "../pages/allReports/AllReports";
import Feedback from "../pages/feedback/Feedback";
import { childRoutes as currentReportRoutes } from "@/pages/currentReport/childRoutes";

export const routes = {
  current: {
    path: "/current",
    component: CurrentReport,
    redirect: () => {
      return { path: `/current/${currentReportRoutes.common.path}` };
    },
    children: Array.from(Object.values(currentReportRoutes)),
  },
  AllReports: {
    path: "/all-reports",
    component: AllReports,
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
