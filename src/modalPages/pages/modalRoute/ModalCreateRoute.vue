<template>
  <hike-main-info
    :hike="data"
    :update-hike-name="
      (name) => {
        data.name = name;
      }
    "
    :update-hike-information="
      (dates, hikeId) => {
        data.dates = dates;
        data.hikeId = hikeId;
      }
    "
  />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onConfirm"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { reactive } from "vue";
import { closeModalPage } from "@/modalPages/utils/closeModalPage";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import HikeMainInfo from "@/components/hikeMainInfo/HikeMainInfo";
import { getEmptyReport } from "@/helpers/getEmptyReport";

const props = store.modalPages.props;
const data = reactive({
  name: "",
  dates: "",
  hikeId: "",
});

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
