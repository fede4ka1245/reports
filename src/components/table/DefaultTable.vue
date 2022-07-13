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
    <template #body-cell-edit-report="props">
      <cell-edit-report
        :promote-to-current="tableProps.promoteToCurrent"
        :download="tableProps.download"
        :remove="tableProps.remove"
        :row="props.row"
      />
    </template>
    <template #body-cell-filled="props">
      <cell-filled :value="props.value" />
    </template>
    <template #body-cell-highlighted="props">
      <cell-highlighted :value="props.value" :row="props.row" />
    </template>
    <template #body-cell="props">
      <q-td :props="props">
        <div class="cell">
          {{ props.value }}
        </div>
      </q-td>
    </template>
    <template #header-cell-comment="props">
      <q-th style="width: calc(40% - 50px); min-width: 110px">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #header-cell-sum="props">
      <q-th style="width: 100px">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #header-cell-name="props">
      <q-th style="width: calc(40% - 50px); min-width: 110px">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #header-cell-edit="props">
      <q-th style="width: 42px; min-width: 42px">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #header-cell-category="props">
      <q-th style="width: 100px">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #header-cell-filled="props">
      <q-th style="width: 33%">
        {{ props.col.label }}
      </q-th>
    </template>
    <template v-for="slotName in Object.keys($slots)" #[slotName]="props">
      <slot :name="slotName" :props="props"></slot>
    </template>
  </q-table>
</template>

<script setup>
import CellEdit from "./cellEdit/CellEdit";
import CellEditReport from "@/components/table/cellEditReport/CellEditReport";
import CellFilled from "@/components/table/cellFilled/cellFilled";
import CellHighlighted from "@/components/table/cellHighlighted/cellHighlighted";

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
  padding: 0 !important;
}

.app-table .cell {
  text-overflow: ellipsis;
  white-space: break-spaces;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}

.app-table th {
  text-align: center;
  padding: 0 !important;
  min-width: 30px;
}
</style>
