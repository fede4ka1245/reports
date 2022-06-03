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
      use-input
      label="валюта"
      :options="moneyCodes"
      :model-value="props.code"
      @update:model-value="props.updateCode"
      @filter="filter"
    />
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  codes: Array,
  code: String,
  updateCode: Function,
  sum: String,
  updateSum: Function,
});

let moneyCodes = ref(props.codes);

const filter = (value, update) => {
  update(() => {
    if (value === "") {
      moneyCodes.value = props.codes;
    } else {
      const needle = value.toLowerCase();
      moneyCodes.value = props.codes.filter((code) =>
        code.toLowerCase().startsWith(needle)
      );
    }
  });
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.sum {
  width: 55%;
  height: 100%;
}

.code {
  width: 44%;
  overflow: hidden;
  max-height: 100%;
}
</style>
