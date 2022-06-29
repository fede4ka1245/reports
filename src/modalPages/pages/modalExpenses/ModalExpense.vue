<template>
  <text-header>Добавить расход</text-header>
  <q-select
      v-model="expense.category"
      :options="expense.categories"
      option-label="name"
      class="item"
      outlined
      label="Расход"
      @filter="filter"
  />
  <payment-input
      :code="expense.moneyCode"
      :codes="props.moneyCodes"
      :sum="expense.sum"
      :update-code="(code) => (expense.moneyCode = code)"
      :update-sum="(sum) => (expense.sum = sum)"
      class="item"
  />
  <q-input
      v-model="expense.expenseDescription"
      type="textarea"
      outlined
      label="Описание расхода"
      class="item"
  />
  <q-input
      v-model="expense.comment"
      type="textarea"
      outlined
      label="Расчет и комментарии"
      class="item"
  />
  <input-date :date="expense.date" :on-date-change="onDateChange"/>
  <form-confirmation
      :dismiss-handler="closeModalPage"
      :confirm-handler="onExpenseConfirm"
      :is-confirm-button-disabled="isConfirmButtonDisabled"
  />
</template>

<script setup>
import { closeModalPage } from "@/modalPages/helpers/closeModalPage";
import { store } from "@/store/store";
import { reactive, computed } from "vue";
import { getFormattedCurrentDate } from "@/helpers/reports/getFormattedCurrentDate";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import PaymentInput from "@/components/paymentInput/PaymentInput";
import TextHeader from "@/components/textHeader/TextHeader";
import { cachedRequestExpensesCategories } from "@/api/cachedRequests";
import InputDate from "@/components/inputDate/InputDate";

const props = store.modalPages.props;

const onExpenseConfirm = () => {
  closeModalPage();
  props.saveData(expense);
};

const defaultExpense = {
  category: String(),
  sum: String(),
  comment: String(),
  expenseDescription: String(),
  moneyCode: String(),
  date: getFormattedCurrentDate(),
  categories: [],
};

const expense = reactive(props?.expense || defaultExpense);

const isConfirmButtonDisabled = computed(() => {
  return !(expense.sum && expense.date && expense.expenseDescription && expense.category && expense.moneyCode)
})

const onDateChange = (date) => {
  expense.date = date
}

async function filter(inputValue, update) {
  if (expense.categories.length) {
    update();
    return;
  }

  const categories = await cachedRequestExpensesCategories();

  update(() => {
    expense.categories = categories;
  });
}
</script>
