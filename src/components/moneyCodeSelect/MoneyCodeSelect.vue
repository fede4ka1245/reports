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
    @filter="filter"
    @add="
      ({ value }) => {
        select?.updateInputValue('');
        props.onCodeSelect(value);
      }
    "
    @remove="
      ({ index }) => {
        props.onCodeRemove(index);
      }
    "
  >
    <template v-slot:append>
      <q-btn round dense flat icon="close" @click="() => select.hidePopup()" />
    </template>
  </q-select>
</template>

<script setup>
import * as currencyCodes from "currency-codes";
import { ref, defineProps } from "vue";

const select = ref(null);

const props = defineProps({
  moneyCodes: Array,
  onCodeSelect: Function,
  onCodeRemove: Function,
});

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
