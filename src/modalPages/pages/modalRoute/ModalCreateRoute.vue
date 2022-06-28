<template>
  <text-header>
    Добавить/Редактировать отчет по походу
  </text-header>
  <hike-main-info
      :hike="data"
      :update-hike-name="onHikeNameUpdate"
      :update-hike-information="onHikeInformationUpdate"
  />
  <form-confirmation
      :dismiss-handler="closeModalPage"
      :confirm-handler="onConfirm"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { reactive } from "vue";
import { closeModalPage } from "@/modalPages/helpers/closeModalPage";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import HikeMainInfo from "@/components/hikeMainInfo/HikeMainInfo";
import { getEmptyReport } from "@/helpers/getEmptyReport";
import TextHeader from "@/components/textHeader/TextHeader";

const props = store.modalPages.props;
const data = reactive({
  name: "",
  dates: "",
  hikeId: "",
});

const onHikeInformationUpdate = (dates, hikeId) => {
  data.dates = dates;
  data.hikeId = hikeId;
}

const onHikeNameUpdate = (name) => {
  data.name = name;
}

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
