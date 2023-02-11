<template>
  <text-header class="item">Добавить/Редактировать время</text-header>
  <input-date
    :error="!data.date"
    :date="data.date"
    :on-date-change="onDateChange"
  />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onConfirm"
    :is-confirm-button-disabled="isConfirmButtonDisabled"
    class="item"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { reactive, computed } from "vue";
import TextHeader from "@/components/textHeader/TextHeader";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import { closeModalPage } from "@/modalPages/helpers/closeModalPage";
import { getFormattedCurrentDate } from "@/helpers/reports/getFormattedCurrentDate";
import InputDate from "@/components/inputDate/InputDate";

const props = store.modalPages.props;

const onConfirm = () => {
  closeModalPage();
  const [day, month, year] = data.date.split(".");
  props.onConfirm(day, month, year);
};

const data = reactive({
  date: getFormattedCurrentDate(),
});

const isConfirmButtonDisabled = computed(() => {
  return !data.date;
});

const onDateChange = (date) => {
  data.date = date;
};
</script>
