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
    <template #body-cell-edit-report="props">
      <q-td>
        <q-btn round flat color="grey" icon="edit">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                v-close-popup
                clickable
                @click="tableProps.promoteToCurrent(props.row)"
              >
                Cделать текущим
              </q-item>
            </q-list>
            <q-list style="min-width: 100px">
              <q-item
                v-close-popup
                clickable
                @click="tableProps.download(props.row)"
              >
                Скачать
              </q-item>
            </q-list>
            <q-list style="min-width: 100px">
              <q-item
                v-close-popup
                clickable
                @click="tableProps.remove(props.row)"
              >
                Удалить
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
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
  download: Function,
  promoteToCurrent: Function,
});
</script>

<style scoped></style>
