<template>
  <q-table :columns="tableProps.columns" :rows="tableProps.rows">
    <template #body-cell-edit="props">
      <cell-edit
        :delete="() => tableProps.remove(props.pageIndex)"
        :fix="() => tableProps.edit(props.pageIndex)"
      />
    </template>
    <template #body-cell-edit-time="props">
      <cell-edit-time :edit="tableProps.edit" :page-index="props.pageIndex" />
    </template>
  </q-table>
</template>

<script setup>
import { defineProps } from "vue";
import CellEdit from "./cellEdit/CellEdit";
import CellEditTime from "./cellEditTime/CellEditTime";

const tableProps = defineProps({
  columns: Array,
  rows: Array,
  edit: Function,
  remove: Function,
});
</script>

<style scoped></style>
