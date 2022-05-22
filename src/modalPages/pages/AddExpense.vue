<script setup>
import { closeModalPage } from "@/modalPages/utils/closeModalPage";
import { store } from "@/store/store";
import { reactive } from "vue";
import { getFormattedCurrentDate } from "@/utils/getFormattedCurrentDate";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
const { saveData } = store.modalPagesStore.props;

const expense = reactive({
  category: String(),
  sum: String(),
  comment: String(),
  expenseDescription: String(),
  moneyCode: String(),
  date: getFormattedCurrentDate(),
});
</script>

<template>
  <div>
    <h6>Добавить расход</h6>
    <q-input v-model="expense.category" outlined label="категория" />
    <section class="payment">
      <q-input v-model="expense.sum" class="sum" outlined label="сумма" />
      <q-select
        v-model="expense.moneyCode"
        :options="store.currentReportStore.moneyCodes"
        class="code"
        outlined
      />
    </section>
    <section>
      <q-input
        v-model="expense.expenseDescription"
        type="textarea"
        outlined
        label="описание расхода"
      />
      <q-input
        v-model="expense.comment"
        type="textarea"
        outlined
        label="расчет и комментарии"
      />
      <q-input v-model="expense.date" outlined label="дата" />
    </section>
    <form-confirmation
      :dismiss-handler="closeModalPage"
      :confirm-handler="
        () => {
          closeModalPage();
          saveData(expense);
        }
      "
    />
  </div>
</template>

<style scoped>
.payment {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.sum {
  width: 70%;
}

.code {
  width: 30%;
}
</style>
