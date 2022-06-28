<template>
  <q-input outlined :model-value="props.date" place label="Дата">
    <q-popup-proxy ref="popup" color="orange" cover>
      <q-date
        v-on:update:model-value="onDateChange"
        :model-value="props.date"
        :options="options"
        mask="DD.MM.YYYY"
        color="orange"
      >
      </q-date>
    </q-popup-proxy>
  </q-input>
</template>

<script setup>
import { getFormattedCurrentDate } from "@/helpers/getFormattedCurrentDate";
import { ref } from "vue";

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  onDateChange: {
    type: Function,
    required: true,
  },
});

const popup = ref(null);
const onDateChange = (date) => {
  props.onDateChange(date);
  popup?.value?.hide();
};

const options = (date) => {
  const [year, month, day] = [...date.split("/")].map((datePart) =>
    Number(datePart)
  );
  const [currentDay, currentMonth, currentYear] = [
    ...getFormattedCurrentDate().split("."),
  ].map((datePart) => Number(datePart));

  if (
    year > currentYear ||
    (year === currentYear && month > currentMonth) ||
    (year === currentYear && month === currentMonth && day > currentDay)
  ) {
    return false;
  } else {
    return true;
  }
};
</script>
