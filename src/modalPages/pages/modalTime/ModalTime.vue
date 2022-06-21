<template>
  <text-header class="item">Добавить/Редактировать время</text-header>
  <q-input v-model="data.day" outlined label="День" class="item" />
  <q-input v-model="data.month" outlined label="Месяц" class="item" />
  <q-input v-model="data.year" outlined label="Год" class="item" />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onConfirm"
    class="item"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { reactive } from "vue";
import TextHeader from "@/components/textHeader/TextHeader";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import { closeModalPage } from "@/modalPages/utils/closeModalPage";

const props = store.modalPages.props;

const onConfirm = () => {
  closeModalPage();
  props.onConfirm(data.day, data.month, data.year);
}

const data = reactive({
  day: "",
  month: "",
  year: "",
});
</script>
