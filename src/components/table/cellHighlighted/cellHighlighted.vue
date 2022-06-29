<template>
  <q-td class="half">
    <div
      class="cell"
      v-bind:class="{ orange: props.row.key === store.currentReport?.key }"
    >
      {{ props.value }}
    </div>
  </q-td>
</template>

<script setup>
import { store } from "@/store/store";

const props = defineProps({
  value: {
    default: "",
    required: false,
    type: String,
  },
  row: {
    default: Object,
    required: true,
  },
});
</script>

<style scoped>
.orange {
  color: orange;
}

.half {
  width: 50% !important;
}
</style>
