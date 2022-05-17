import { createRouter, createWebHistory } from "vue-router";
import CurrentReport from "../pages/currentReport/CurrentReport"
import AllReports from "../pages/allReports/AllReports"
import Feedback from "../pages/feedback/Feedback"

export const routes = [
    {
        path: "/current",
        component: CurrentReport
    },
    {
        path: "/all-reports",
        component: AllReports
    },
    {
        path: "/feedback",
        component: Feedback
    }
]

const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,
    routes
});

export default router;