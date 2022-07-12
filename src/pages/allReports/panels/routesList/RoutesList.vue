<template>
  <report-creator v-if="isReportCreatorActive" />
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
import PaymentTable from "@/components/table/DefaultTable";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import { reportsColumns } from "@/components/table/columns/reportsColumns";
import { computed } from "vue";
import { openModalPage } from "@/modalPages/helpers/openModalPage";
import { modalName } from "@/modalPages/helpers/modalName";
import { downloadHikeReport } from "@/helpers/downloadHikeReport";
import { compareFormattedDates } from "@/helpers/compareFormattedDates";

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

  const targetRows = currentReport ? [currentReport, ...reports] : reports;

  return targetRows.sort((firstReport, secondReport) => {
    const firstReportStartDate = firstReport.dates.split("-")[0];
    const secondReportStartDate = secondReport.dates.split("-")[0];

    return compareFormattedDates(firstReportStartDate, secondReportStartDate);
  });
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

  if (store.currentReport) {
    store.allReports.reports.push(store.currentReport);
  }

  if (index !== -1) {
    store.allReports.reports.splice(index, 1);
  }

  store.currentReport = report;
};

const download = (report) => {
  downloadHikeReport(report);
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
