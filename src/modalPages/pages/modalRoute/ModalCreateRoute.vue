<template>
  <text-header> Добавить/Редактировать отчет по походу </text-header>
  <hike-main-info
    :hike="data"
    :update-hike-name="onHikeNameUpdate"
    :update-hike-information="onHikeInformationUpdate"
    :is-name-error="!data?.name"
    :is-date-error="!data?.dates"
  />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onConfirm"
    :is-confirm-button-disabled="isConfirmButtonDisabled"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { reactive, computed } from "vue";
import { closeModalPage } from "@/modalPages/helpers/closeModalPage";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import HikeMainInfo from "@/components/hikeMainInfo/HikeMainInfo";
import { getEmptyReport } from "@/helpers/reports/getEmptyReport";
import TextHeader from "@/components/textHeader/TextHeader";

const props = store.modalPages.props;
const data = reactive({
  name: "",
  dates: "",
  hikeId: "",
});

const isConfirmButtonDisabled = computed(() => {
  return !(data.name && data.dates);
});

const onHikeInformationUpdate = (dates, hikeId) => {
  data.dates = dates;
  data.hikeId = hikeId;
};

const onHikeNameUpdate = (name) => {
  data.name = name;
};

const onConfirm = () => {
  const report = {
    ...getEmptyReport(),
    name: data.name,
    dates: data.dates,
    hikeId: data.hikeId,
  };
  props.onConfirm(report);
  closeModalPage();
};
</script>

<style scoped></style>
