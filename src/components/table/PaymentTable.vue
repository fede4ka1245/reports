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
import CellEdit from "./cellEdit/CellEdit";
import CellEditTime from "./cellEditTime/CellEditTime";

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
</style>
