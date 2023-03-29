<template>
  <report-creator v-if="isReportCreatorActive" />
  <section v-else>
    <routes-list-table
      :rows="rows"
      :columns="reportsColumns"
      :promote-to-current="promoteToCurrent"
      :remove="remove"
    />
    <button-add :handler="buttonAddHandler" />
  </section>
</template>

<script setup>
import ReportCreator from "./components/reportCreator/ReportCreator";
import { store } from "@/store/store";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { reportsColumns } from "@/pages/allReports/panels/routesList/components/routesListTable/reportsColumns";
import { computed } from "vue";
import { openModalPage } from "@/modalPages/helpers/openModalPage";
import { modalName } from "@/modalPages/helpers/modalName";
import { compareFormattedDates } from "@/helpers/compareFormattedDates";
import RoutesListTable from "@/pages/allReports/panels/routesList/components/routesListTable/RoutesListTable";

const isReportCreatorActive =
  !store.currentReport && !store.allReports?.reports?.length;

const getReportIndex = (report) => {
  for (let index = 0; index <= store.allReports.reports.length - 1; index++) {
    if (store.allReports.reports[index].key === report.key) {
      return index;
    }
  }
  return -1;
};

const rows = computed(() => {
  const currentReport = store.currentReport;
  const reports = store.allReports.reports;

  const targetRows = currentReport?.name && currentReport?.dates ? [currentReport, ...reports] : reports;

  return [...targetRows.sort((firstReport, secondReport) => {
    const firstReportStartDate = firstReport.dates.split("-")[0];
    const secondReportStartDate = secondReport.dates.split("-")[0];

    return compareFormattedDates(firstReportStartDate, secondReportStartDate);
  }).map((report) => ({
    ...report,
    checked: report.balance && report.balance.every(((balance) => +balance.finalResult === 0))
  }))];
});

const remove = (report) => {
  const index = getReportIndex(report);

  if (index !== -1) {
    store.allReports.reports.splice(index, 1);
  } else {
    store.currentReport = undefined;
  }
};

const promoteToCurrent = (report) => {
  if (store.currentReport?.key === report.key) {
    return;
  }

  const index = getReportIndex(report);

  if (store.currentReport && store.currentReport?.name && store.currentReport?.dates) {
    store.allReports.reports.push(store.currentReport);
  }

  if (index !== -1) {
    store.allReports.reports.splice(index, 1);
  }

  store.currentReport = report;
};

const buttonAddHandler = () => {
  openModalPage(modalName.modalRoute, {
    onConfirm: (report) => {
      promoteToCurrent(report);
    },
  });
};
</script>

<style scoped></style>
