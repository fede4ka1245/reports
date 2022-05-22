<template>
  <q-select
    ref="select"
    v-model="store.currentReportStore.moneyCodes"
    :options="moneyCodes"
    outlined
    multiple
    label="Валюты"
    use-input
    use-chips
    input-debounce="2"
    @filter="filter"
    @add="() => select?.updateInputValue('')"
  />
</template>

<script setup>
import * as currencyCodes from "currency-codes";
import { ref } from "vue";
import { store } from "@/store/store";

const select = ref(null);

const codes = currencyCodes.codes();
const moneyCodes = ref(codes);

const filter = (value, update) => {
  update(() => {
    if (value === "") {
      moneyCodes.value = codes;
    } else {
      const needle = value.toLowerCase();
      moneyCodes.value = codes.filter((code) =>
        code.toLowerCase().startsWith(needle)
      );
    }
  });
};
</script>
