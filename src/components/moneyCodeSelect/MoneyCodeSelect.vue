<template>
  <q-select
    ref="select"
    :model-value="props.moneyCodes"
    :options="dynamicMoneyCodes"
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
import { ref } from "vue";
import { getRates } from "@/helpers/reports/getRates";
import { getMoneyCodes } from "@/helpers/reports/getMoneyCodes";

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

const dynamicMoneyCodes = ref(getMoneyCodes());

const filter = (value, update) => {
  update(() => {
    if (value === "") {
      dynamicMoneyCodes.value = getMoneyCodes();
    } else {
      const input = value.toLowerCase();
      dynamicMoneyCodes.value = getMoneyCodes().filter(
        (code) =>
          getRates()[code].name.toLowerCase().includes(input) ||
          code.toLowerCase().startsWith(input)
      );
    }
  });
};
</script>
