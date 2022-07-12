<template>
  <div>
    <q-input
      class="sum"
      outlined
      label="Сумма"
      :model-value="props.sum"
      type="number"
      @update:model-value="(value) => props.updateSum(value)"
    />
    <q-select
      class="code"
      outlined
      use-input
      label="Валюта"
      :options="moneyCodes"
      :model-value="props.code"
      @update:model-value="props.updateCode"
      @filter="filter"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  codes: {
    type: Array,
    default: () => [],
  },
  code: {
    type: String,
    default: () => "",
  },
  updateCode: {
    type: Function,
    default: undefined,
  },
  sum: {
    type: String,
    default: () => "",
  },
  updateSum: {
    type: Function,
    required: true,
  },
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

onMounted(() => {
  if (props.codes?.length === 1) {
    props.updateCode(props.codes[0]);
  }
});
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
