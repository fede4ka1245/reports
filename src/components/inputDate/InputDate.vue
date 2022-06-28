<template>
  <q-input
    outlined
    :model-value="props.date"
    place
    label="Дата"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            v-on:update:model-value="props.onDateChange"
            :model-value="props.date"
            :options="options"
            mask="DD.MM.YYYY"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { getFormattedCurrentDate } from "../../../../../reports/src/helpers/getFormattedCurrentDate";

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
