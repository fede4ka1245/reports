<template>
  <hike-main-info
    :model="data.routeData"
    :update-model="(routeData) => (data.routeData = routeData)"
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
import { currentReportStore } from "@/store/stores/currentReportStore";

const props = store.modalPagesStore.props;
const data = reactive({
  routeData: {},
});

const onConfirm = () => {
  console.log({
    ...currentReportStore,
    routeData: data.routeData,
  });
  props.onConfirm({
    ...currentReportStore,
    routeData: data.routeData,
  });
  closeModalPage();
};
</script>

<style scoped></style>
