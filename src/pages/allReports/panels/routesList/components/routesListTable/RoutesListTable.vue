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
        :remove="tableProps.remove"
        :row="props.row"
      />
    </template>
    <template #header-cell-checked="{ props }">
      <q-th style="width: 36px">
        {{ props.col.label }}
      </q-th>
    </template>s
    <template #body-cell-checked="{ props }">
      <q-td>
        <div style="width: 36px; display: flex; justify-content: center">
          <q-btn v-if="props.value" @click="onButtonCLick" round flat color="orange" icon="check" />
        </div>
      </q-td>
    </template>
  </default-table>
</template>

<script setup>
import DefaultTable from "@/components/table/DefaultTable";
import CellEditReport from "@/pages/allReports/panels/routesList/components/routesListTable/cellEditReport/CellEditReport";
import CellHighlighted from "@/pages/allReports/panels/routesList/components/routesListTable/cellHighlighted/CellHighlighted";
import { reportsColumns } from "@/pages/allReports/panels/routesList/components/routesListTable/reportsColumns";
import {appAlert} from "@/components/appAlert/appAlert";

const tableProps = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
  remove: {
    type: Function,
    default: undefined,
  },
  promoteToCurrent: {
    type: Function,
    default: undefined,
  },
});

const onButtonCLick = () => {
  appAlert('Галочка проставляется, если в отчете "Баланс на руках после передач" во всех валютах равно нулю');
}
</script>
