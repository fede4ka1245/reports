<template>
  <default-table :columns="tableProps.columns" :rows="tableProps.rows">
    <template #body-cell-edit="{ props }">
      <cell-edit
        :delete="() => tableProps.remove(props.pageIndex)"
        :fix="() => tableProps.edit(props.pageIndex)"
      />
    </template>
    <template #header-cell-category="{ props }">
      <q-th style="width: 30%">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #header-cell-sum="{ props }">
      <q-th style="width: calc(40% - 48px)">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #header-cell-description="{ props }">
      <q-th style="width: calc(65% - 48px)">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #header-cell-edit="{ props }">
      <q-th style="width: 48px">
        {{ props.col.label }}
      </q-th>
    </template>
  </default-table>
</template>

<script setup>
import DefaultTable from "@/components/table/DefaultTable";
import CellEdit from "@/components/table/cellEdit/CellEdit";

const tableProps = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  edit: {
    type: Function,
    default: undefined,
  },
  remove: {
    type: Function,
    default: undefined,
  },
});
</script>
