<script setup>
import { store } from "@/store/store";
import PaymentPreferences from "@/modalPages/pages/PaymentPreferences";
import { modalName } from "@/modalPages/utils/modalName";
import { computed } from "vue";
import AddExpense from "@/modalPages/pages/AddExpense";
import AddConvertion from "@/modalPages/pages/AddConvertion";

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
      <payment-preferences
        v-if="
          modalName.paymentPreferences === store.modalPagesStore.activePageName
        "
      />
      <add-expense
        v-if="modalName.addExpense === store.modalPagesStore.activePageName"
      />
      <add-convertion
        v-if="modalName.addConversion === store.modalPagesStore.activePageName"
      />
    </div>
  </q-dialog>
</template>

<style>
.content {
  background-color: #f5f2ec;
  padding: 0 1em 0 1em;
}
</style>
