<template>
  <q-td>
    <q-btn round flat color="grey" icon="more_horiz">
      <q-menu style="width: 150px">
        <q-list>
          <q-item
              class="item"
            v-close-popup
            clickable
            @click="props.promoteToCurrent(props.row)"
          >
            Cделать текущим
          </q-item>
        </q-list>
        <q-list>
          <q-item style="" v-close-popup clickable @click="props.download(props.row)">
            Скачать
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
const props = defineProps({
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
  row: {
    type: Object,
    default: undefined,
  },
});
</script>