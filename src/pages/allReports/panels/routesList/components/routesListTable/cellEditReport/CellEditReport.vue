<template>
  <q-td>
    <q-btn round flat color="grey" icon="more_horiz">
      <q-menu style="width: 150px">
        <q-list
          v-if="store.currentReport?.key !== row?.key"
        >
          <q-item
            v-close-popup
            class="item"
            clickable
            @click="props.promoteToCurrent(props.row)"
          >
            Сделать текущим
          </q-item>
        </q-list>
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
import {store} from "@/store/store";

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
</script>
