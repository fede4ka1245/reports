<script setup>
import { store } from "@/store/store";
import { modalName } from "@/modalPages/utils/modalName";
import { computed } from "vue";
import ModalExpense from "@/modalPages/pages/ModalExpense";
import ModalConversion from "@/modalPages/pages/ModalConversion";
import ModalPayment from "@/modalPages/pages/modalPayment/ModalPayment";

const isOpen = computed(() => {
  return store.modalPagesStore.isModalOpen;
});
</script>

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
        v-if="modalName.modalPayment === store.modalPagesStore.activePageName"
      />
      <modal-expense
        v-if="modalName.modalExpense === store.modalPagesStore.activePageName"
      />
      <modal-conversion
        v-if="
          modalName.modalConversion === store.modalPagesStore.activePageName
        "
      />
    </div>
  </q-dialog>
</template>

<style>
.content {
  background-color: #f5f2ec;
  padding: 0 1em 0 1em;
}

.item {
  padding-bottom: 5px;
}
</style>
