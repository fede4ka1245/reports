<script setup>
import { defineProps } from "vue";

const props = defineProps({
  dismissHandler: Function,
  confirmHandler: Function,
});
</script>

<template>
  <section>
    <q-btn color="orange" outline class="btn" @click="props.dismissHandler">
      Отмена
    </q-btn>
    <q-btn color="orange" class="btn" @click="props.confirmHandler">
      Сохранить
    </q-btn>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  margin: 1em 0 1em 0;
}

.btn {
  width: 49%;
}
</style>
