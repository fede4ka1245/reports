<template>
  <q-td>
    <q-btn round flat color="grey" icon="more_horiz">
      <q-menu v-if="store.currentReport?.key !== row?.key" style="width: 150px">
        <q-list>
          <q-item v-close-popup class="item" clickable @click="onPromoteClick">
            Сделать текущим
          </q-item>
          <q-item v-close-popup clickable @click="props.remove(props.row)">
            Удалить
          </q-item>
        </q-list>
      </q-menu>
      <q-menu v-else style="width: 150px">
        <q-list>
          <q-item v-close-popup clickable @click="props.remove(props.row)">
            Удалить
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-td>
</template>

<script setup>
import { store } from "@/store/store";

const props = defineProps({
  remove: {
    type: Function,
    default: undefined,
  },
  promoteToCurrent: {
    type: Function,
    default: undefined,
  },
  row: {
    type: Object,
    default: undefined,
  },
});

const onPromoteClick = (event) => {
  event.stopPropagation();

  props.promoteToCurrent(props.row);
};
</script>
