<script setup>
import * as currencyCodes from "currency-codes";
import { ref } from "vue";
import { store } from "@/store/store";

const codes = currencyCodes.codes();

const moneyCodes = ref(codes);

const filterFn = (value, update) => {
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

const createValue = (val, done) => {
  if (val.length > 2) {
    if (!codes.includes(val)) {
      done(val, "add-unique");
    }
  }
};
</script>

<template>
  <q-select
    v-model="store.currentReportStore.moneyCodes"
    :options="moneyCodes"
    outlined
    multiple
    label="Валюты"
    use-input
    use-chips
    input-debounce="0"
    @new-value="createValue"
    @filter="filterFn"
  />
</template>
