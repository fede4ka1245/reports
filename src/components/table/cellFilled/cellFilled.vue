<template>
  <q-td :class="className">
    {{ props.value }}
  </q-td>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  value: {
    default: "",
    required: false,
    type: [String, Number],
  },
});

const className = computed(() => {
  let sum;
  if (typeof(props.value) !== "number"){
    sum = Number(props.value.split(" ")[0]);
  } else {
    sum = Number(props.value)
  }

  if (Number(sum) > 0) {
    return "positive";
  } else if (Number(sum) < 0) {
    return "negative";
  } else {
    return "";
  }
});
</script>

<style scoped>
.positive {
  background: #eef0cb !important;
}

.negative {
  background: #f5d1c5 !important;
}
</style>
