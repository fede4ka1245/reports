<template>
  <q-select
    ref="select"
    :model-value="props.moneyCodes"
    :options="moneyCodes"
    outlined
    multiple
    label="Валюты"
    use-input
    use-chips
    input-debounce="2"
    popup-content-style="height: 50vh"
    @filter="filter"
    @add="onMoneyCodeAdd"
    @remove="onMoneyCodeRemove"
  >
  </q-select>
</template>

<script setup>
import * as currencyCodes from "currency-codes";
import { ref } from "vue";

const select = ref(null);

const onMoneyCodeAdd = ({ value }) => {
  select.value?.updateInputValue("");
  props.onCodeSelect(value);
};

const onMoneyCodeRemove = ({ index }) => {
  props.onCodeRemove(index);
};
const props = defineProps({
  moneyCodes: {
    type: Array,
    required: true,
  },
  onCodeSelect: {
    type: Function,
    required: true,
  },
  onCodeRemove: {
    type: Function,
    required: true,
  },
});

const codes = currencyCodes.codes();
console.log(currencyCodes.data)
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
