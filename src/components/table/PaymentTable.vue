<template>
  <q-table
      class="app-table"
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
        <div class="cell">
          {{ props.value }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <div class="cell">
          {{props.value}}
        </div>
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
.app-table tr:nth-child(even) {
  background-color: #dfdfdf;
}

.app-table table {
  max-width: 100%;
}

.app-table td {
  padding: 0 0 0 5px !important;
}

.app-table .cell {
  text-overflow: ellipsis;
  white-space: break-spaces;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.app-table th {
  padding: 0 0 0 5px !important;
}

.app-table tr {
  max-height: 60px !important;
  max-width: 100% !important;
}
</style>
