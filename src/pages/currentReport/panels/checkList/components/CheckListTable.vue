<template>
  <default-table :columns="checklistColumns" :rows="tableProps.rows">
    <template #body-cell-edit>
      <q-th style="width: calc(100% - 36px)">
        <q-btn
          :disable="tableProps.disabled"
          round
          flat
          color="grey"
          icon="more_horiz"
        >
          <q-menu style="width: 150px">
            <q-list>
              <q-item v-close-popup clickable @click="tableProps.edit">
                Изменить
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-th>
    </template>
    <template #header-cell="{ props }">
      <q-th style="width: calc(100% - 36px)">
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
import { checklistColumns } from "@/pages/currentReport/panels/checkList/components/checklistColumns";

const tableProps = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  edit: {
    type: Function,
    default: undefined,
  },
  disabled: {
    type: () => Boolean,
    default: false,
  },
});
</script>
