<template>
  <q-td class="half">
    <div
      class="cell"
      :class="{ orange: props.row?.key === store.currentReport?.key }"
      style="white-space: break-spaces"
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
    type: Object,
    required: true,
    default: undefined,
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
