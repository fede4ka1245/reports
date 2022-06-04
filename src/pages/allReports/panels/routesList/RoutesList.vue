<template>
  <report-creator
    v-if="!store.currentReportStore && !store.allReportsStore.reports.length"
  />
  <section v-else>
    <payment-table
      :rows="rows"
      :columns="reportsColumns"
      :download="download"
      :promote-to-current="promoteToCurrent"
      :remove="remove"
    />
    <button-add :handler="handler" />
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
import { nanoid } from "nanoid";
import { downloadRouteReport } from "@/pages/allReports/helpers/downloadRouteReport";
import { downloadHikeReport } from "@/modules/excel/helpers/downloadHikeReport";

const getReportIndex = (report) => {
  for (
    let index = 0;
    index <= store.allReportsStore.reports.length - 1;
    index++
  ) {
    if (store.allReportsStore.reports[index].key === report.key) {
      return index;
    }
  }
  return -1;
};

const rows = computed(() => {
  const reports = [
    ...store.allReportsStore.reports.map((report) => {
      return {
        key: report.key,
        dates: report.routeData.date,
        routeName: report.routeData.name,
      };
    }),
  ];
  if (store.currentReportStore) {
    const currentReport = {
      dates: store.currentReportStore?.routeData?.date,
      routeName: store.currentReportStore?.routeData?.name,
    };
    return [currentReport, ...reports];
  } else {
    return reports;
  }
});

const remove = (report) => {
  const index = getReportIndex(report);

  if (index !== -1) {
    store.allReportsStore.reports.splice(index, 1);
  } else {
    store.currentReportStore = undefined;
  }
};

const promoteToCurrent = (report) => {
  store.allReportsStore.reports.push({
    ...store.currentReportStore,
    key: nanoid(),
  });

  const index = getReportIndex(report);

  store.currentReportStore = store.allReportsStore.reports[index];
  store.allReportsStore.reports.splice(index, 1);
};

const download = (report) => {
  if (getReportIndex(report) === -1) {
    downloadHikeReport(store.currentReportStore);
    return;
  }

  downloadHikeReport(store.allReportsStore.reports[getReportIndex(report)]);
};

const handler = () => {
  openModalPage(modalName.modalRoute, {
    onConfirm: (report) => {
      store.allReportsStore.reports.push({ ...report, key: nanoid() });
    },
  });
};
</script>

<style scoped></style>
