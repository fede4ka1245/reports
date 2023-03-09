<template>
  <q-dialog
    v-model="isOpen"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="content">
      <div class="app-container">
        <q-btn
          round
          dark-percentage
          unelevated
          text-color="grey-9"
          icon="reply"
          class="button-back"
          @click="closeModalPage"
        />
        <modal-payment v-if="getIsModalOpen(modalName.modalPayment)" />
        <modal-expense v-if="getIsModalOpen(modalName.modalExpense)" />
        <modal-conversion v-if="getIsModalOpen(modalName.modalConversion)" />
        <modal-time v-if="getIsModalOpen(modalName.modalTime)" />
        <modal-create-route v-if="getIsModalOpen(modalName.modalRoute)" />s
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { store } from "@/store/store";
import { modalName } from "@/modalPages/helpers/modalName";
import { computed } from "vue";
import ModalExpense from "@/modalPages/pages/modalExpenses/ModalExpense";
import ModalConversion from "@/modalPages/pages/modalConversion/ModalConversion";
import ModalPayment from "@/modalPages/pages/modalPayment/ModalPayment";
import ModalTime from "@/modalPages/pages/modalTime/ModalTime";
import ModalCreateRoute from "@/modalPages/pages/modalRoute/ModalCreateRoute";
import { closeModalPage } from "@/modalPages/helpers/closeModalPage";

const getIsModalOpen = (modal) => {
  return store.modalPages.activePageName === modal;
};

const isOpen = computed(() => {
  return store.modalPages.isModalOpen;
});
</script>

<style>
.button-back {
  width: 50px;
  height: 50px;
}

.content {
  background-color: #f5f2ec;
  padding: 0 1em 0 1em;
}

.item {
  padding-bottom: 5px;
}
</style>
