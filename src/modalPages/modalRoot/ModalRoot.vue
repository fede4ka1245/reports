<template>
  <q-dialog
    v-model="isOpen"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="content">
      <modal-payment
        v-if="modalName.modalPayment === store.modalPages.activePageName"
      />
      <modal-expense
        v-if="modalName.modalExpense === store.modalPages.activePageName"
      />
      <modal-conversion
        v-if="modalName.modalConversion === store.modalPages.activePageName"
      />
      <modal-time
        v-if="modalName.modalTime === store.modalPages.activePageName"
      />
      <modal-create-route
        v-if="modalName.modalRoute === store.modalPages.activePageName"
      />
    </div>
  </q-dialog>
</template>

<script setup>
import { store } from "@/store/store";
import { modalName } from "@/modalPages/utils/modalName";
import { computed } from "vue";
import ModalExpense from "@/modalPages/pages/modalExpenses/ModalExpense";
import ModalConversion from "@/modalPages/pages/modalConversion/ModalConversion";
import ModalPayment from "@/modalPages/pages/modalPayment/ModalPayment";
import ModalTime from "@/modalPages/pages/modalTime/ModalTime";
import ModalCreateRoute from "@/modalPages/pages/modalRoute/ModalCreateRoute";

const isOpen = computed(() => {
  return store.modalPages.isModalOpen;
});
</script>

<style>
.content {
  background-color: #f5f2ec;
  padding: 0 1em 0 1em;
}

.item {
  padding-bottom: 5px;
}
</style>
