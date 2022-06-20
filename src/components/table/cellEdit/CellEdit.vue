<template>
  <q-td>
    <q-btn round flat color="grey" icon="more_horiz">
      <q-menu>
        <q-list style="min-width: 100px">
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
