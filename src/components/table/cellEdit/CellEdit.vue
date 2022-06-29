<template>
  <q-td>
    <q-btn round flat color="grey" icon="more_horiz">
      <q-menu style="width: 150px">
        <q-list>
          <q-item v-close-popup clickable @click="props.fix()">
            Изменить
          </q-item>
          <q-item v-close-popup clickable @click="props.delete()">
            Удалить
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-td>
</template>

<script setup>
const props = defineProps({
  fix: {
    type: Function,
    default: undefined,
  },
  delete: {
    type: Function,
    default: undefined,
  },
});
</script>
