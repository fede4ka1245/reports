<script setup>
import { defineProps } from "vue";

const props = defineProps({
  handler: Function,
});
</script>

<template>
  <div class="flex justify-center">
    <q-btn
      class="button"
      icon="add"
      text-color="orange-10"
      @click="props.handler"
    />
  </div>
</template>

<style scoped>
.button {
  border-radius: 50%;
  width: 3.5em;
  height: 3.5em;
  margin: 1em;
  background: #f88c0077;
}
</style>
