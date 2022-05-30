<template>
  <div>
    <q-input
      class="sum"
      outlined
      label="сумма"
      :model-value="props.sum"
      @update:model-value="(value) => props.updateSum(value)"
    />
    <q-select
      class="code"
      outlined
      label="валюта"
      :options="props.codes"
      :model-value="props.code"
      @update:model-value="props.updateCode"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  codes: Array,
  code: String,
  updateCode: Function,
  sum: String,
  updateSum: Function,
});
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.sum {
  width: 68%;
}

.code {
  width: 30%;
}
</style>
