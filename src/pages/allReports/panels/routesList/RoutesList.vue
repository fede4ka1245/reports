<template>
  <report-creator
    v-if="!store.currentReport && !store.allReports?.reports?.length"
  />
  <section v-else>
    <payment-table
      :rows="rows"
      :columns="reportsColumns"
      :download="download"
      :promote-to-current="promoteToCurrent"
      :remove="remove"
    />
    <button-add :handler="buttonAddHandler" />
  </section>
</template>

<script setup>
import ReportCreator from "./ReportCreator";
import { store } from "@/store/store";
import PaymentTable from "@/components/table/PaymentTable";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { reportsColumns } from "@/components/table/columns/reportsColumns";
import { computed } from "vue";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import { downloadHikeReport } from "@/helpers/downloadHikeReport";

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

  return currentReport ? [currentReport, ...reports] : reports;
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
  const index = getReportIndex(report);

  if (index === -1) {
    return;
  }

  store.allReports.reports.push(store.currentReport);
  store.currentReport = store.allReports.reports[index];
  store.allReports.reports.splice(index, 1);
};

const download = (report) => {
  if (getReportIndex(report) === -1) {
    downloadHikeReport(store.currentReport);
    return;
  }

  downloadHikeReport(store.allReports.reports[getReportIndex(report)]);
};

const buttonAddHandler = () => {
  openModalPage(modalName.modalRoute, {
    onConfirm: (report) => {
      store.allReports.reports.push(report);
    },
  });
};
</script>

<style scoped></style>
