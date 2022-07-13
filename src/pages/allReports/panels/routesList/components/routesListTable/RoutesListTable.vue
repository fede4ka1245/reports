<template>
  <default-table :columns="reportsColumns" :rows="tableProps.rows">
    <template #body-cell-report-name="{ props }">
      <cell-highlighted :value="props.value" :row="props.row" />
    </template>
    <template #body-cell-report-dates="{ props }">
      <cell-highlighted :value="props.value" :row="props.row" />
    </template>
    <template #body-cell-edit-report="{ props }">
      <cell-edit-report
        :promote-to-current="tableProps.promoteToCurrent"
        :download="tableProps.download"
        :remove="tableProps.remove"
        :row="props.row"
      />
    </template>
  </default-table>
</template>

<script setup>
import DefaultTable from "@/components/table/DefaultTable";
import CellEditReport from "@/pages/allReports/panels/routesList/components/routesListTable/cellEditReport/CellEditReport";
import CellHighlighted from "@/pages/allReports/panels/routesList/components/routesListTable/cellHighlighted/CellHighlighted";
import { reportsColumns } from "@/pages/allReports/panels/routesList/components/routesListTable/reportsColumns";

const tableProps = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
  remove: {
    type: Function,
    default: undefined,
  },
  download: {
    type: Function,
    default: undefined,
  },
  promoteToCurrent: {
    type: Function,
    default: undefined,
  },
});
</script>
