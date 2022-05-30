<template>
  <q-td>
    <q-btn round flat color="grey" icon="edit">
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
import { defineProps } from "vue";

const props = defineProps({
  fix: Function,
  delete: Function,
});
</script>
