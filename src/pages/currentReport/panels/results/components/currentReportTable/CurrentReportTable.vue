<template>
  <default-table :columns="resultsColumns" :rows="tableProps.rows">
    <template #body-cell-result="{ props }">
      <cell-filled :value="props.value" />
    </template>
    <template #body-cell-profit="{ props }">
      <cell-filled :value="props.value" />
    </template>
    <template #header-cell="{ props }">
      <q-th style="width: 20%; white-space: break-spaces">
        {{ props.col.label }}
      </q-th>
    </template>
  </default-table>
</template>

<script setup>
import CellFilled from "@/components/table/cellFilled/cellFilled";
import DefaultTable from "@/components/table/DefaultTable";
import { resultsColumns } from "@/pages/currentReport/panels/results/components/currentReportTable/resultsColumns";

const tableProps = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});
</script>
