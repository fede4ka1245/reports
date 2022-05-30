<template>
  <q-table :columns="tableProps.columns" :rows="tableProps.rows">
    <template #body-cell-edit="props">
      <cell-edit
        :delete="() => tableProps.remove(props.pageIndex)"
        :fix="() => tableProps.edit(props.pageIndex)"
      />
    </template>
  </q-table>
</template>

<script setup>
import { defineProps } from "vue";
import CellEdit from "./cellEdit/CellEdit";

const tableProps = defineProps({
  columns: Array,
  rows: Array,
  edit: Function,
  remove: Function,
});
</script>

<style scoped></style>
