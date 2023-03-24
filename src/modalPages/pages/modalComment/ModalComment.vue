<template>
  <text-header> Добавить/Редактировать комментарий </text-header>
  <q-input
    v-model="data.comment"
    :error="!data.comment && state.isError"
    type="textarea"
    outlined
    label="Комментарий"
    class="item"
  />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onConfirm"
    :is-confirm-button-disabled="isConfirmButtonDisabled"
    :on-disabled-button-click="activateError"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { reactive, computed } from "vue";
import { closeModalPage } from "@/modalPages/helpers/closeModalPage";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import TextHeader from "@/components/textHeader/TextHeader";

const props = store.modalPages.props;
const data = reactive({
  comment: "",
});

const isConfirmButtonDisabled = computed(() => {
  return !data.comment;
});

const state = reactive({ isError: false });
const activateError = () => {
  if (isConfirmButtonDisabled.value) {
    state.isError = true;
  }
};

const onConfirm = () => {
  props.saveData(data.comment);
  closeModalPage();
};
</script>

<style scoped></style>
