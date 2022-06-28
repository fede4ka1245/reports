<template>
  <q-table
      separator="cell"
      :columns="tableProps.columns"
      :rows="tableProps.rows"
      hide-no-data
      hide-pagination
      :table-header-style="{
      background: '#808080',
      color: 'white',
      fontWeight: 'bold',
    }"
      :pagination="{
      rowsPerPage: 0,
    }"
  >
    <template #body-cell-edit="props">
      <cell-edit
          :delete="() => tableProps.remove(props.pageIndex)"
          :fix="() => tableProps.edit(props.pageIndex)"
      />
    </template>
    <template #body-cell-edit-time="props">
      <cell-edit-time :edit="tableProps.edit" :page-index="props.pageIndex" />
    </template>
    <template #body-cell-edit-report="props">
      <cell-edit-report
          :promote-to-current="tableProps.promoteToCurrent"
          :download="tableProps.download"
          :remove="tableProps.remove"
          :row="props.row"
      />
    </template>
    <template #body-cell-filled="props">
      <cell-filled
          :value="props.value"
      />
    </template>
    <template #body-cell-highlighted="props">
      <q-td :style="props.row.key === store.currentReport?.key && 'color: orange'">
        {{ props.value }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import CellEdit from "./cellEdit/CellEdit";
import CellEditTime from "./cellEditTime/CellEditTime";
import CellEditReport from "@/components/table/cellEditReport/CellEditReport";
import CellFilled from "@/components/table/cellFilled/cellFilled";
import {store} from "@/store/store";

const tableProps = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  edit: {
    type: Function,
    default: undefined,
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

<style>
tr:nth-child(even) {
  background-color: #dfdfdf;
}

table {
  max-width: 100%;
}

td {
  white-space: break-spaces !important;
  word-break: break-word !important;
  padding: 0 0 0 5px !important;
}

th {
  padding: 0 0 0 5px !important;
  text-overflow: clip;
  overflow: hidden;
}

tr {
  max-width: 100% !important;
}
</style>
