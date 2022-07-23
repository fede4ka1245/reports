<template>
  <q-select
    ref="select"
    :model-value="props.moneyCodes"
    :options="dynamicMoneyCodes"
    :option-label="getOptionLabel"
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
    <template #selected-item="scope">
      <q-chip
        removable
        dense
        :tabindex="scope.index"
        @remove="
          () => {
            onMoneyCodeRemove({ index: scope.index });
          }
        "
      >
        {{ scope.opt }}
      </q-chip>
    </template>
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

const getOptionLabel = (option) => `${option} (${rates[option]?.name})`;

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

const rates = getRates();

const filter = (value, update) => {
  update(() => {
    if (value === "") {
      dynamicMoneyCodes.value = getMoneyCodes();
    } else {
      const input = value.toLowerCase();
      dynamicMoneyCodes.value = getMoneyCodes().filter(
        (code) =>
          rates[code].name.toLowerCase().includes(input) ||
          code.toLowerCase().startsWith(input)
      );
    }
  });
};
</script>
