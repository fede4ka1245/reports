<template>
  <default-table :columns="tableProps.columns" :rows="tableProps.rows">
    <template #body-cell-edit-time="{ props }">
      <cell-edit-time
        :money-code="props.row.moneyCode"
        :edit="tableProps.edit"
        :page-index="props.pageIndex"
      />
    </template>
    <template #header-cell-date="{ props }">
      <q-th style="min-width: 60px">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #body-cell-balance-converted-sum="{ props }">
      <balance-converted-sum-cell :value="props.value" />
    </template>
  </default-table>
</template>

<script setup>
import DefaultTable from "@/components/table/DefaultTable";
import CellEditTime from "@/pages/allReports/panels/balance/components/balanceTable/cellEditTime/CellEditTime";
import BalanceConvertedSumCell from "@/pages/allReports/panels/balance/components/balanceTable/cellBalanceConvertedSum/CellBalanceConvertedSum";

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
});
</script>