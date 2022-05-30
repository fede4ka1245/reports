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
    label="описание расхода"
    class="item"
  />
  <q-input
    v-model="expense.comment"
    type="textarea"
    outlined
    label="расчет и комментарии"
    class="item"
  />
  <q-input v-model="expense.date" class="item" outlined label="дата" />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="
      () => {
        closeModalPage();
        props.saveData(expense);
      }
    "
  />
</template>

<script setup>
import { closeModalPage } from "@/modalPages/utils/closeModalPage";
import { store } from "@/store/store";
import { reactive } from "vue";
import { getFormattedCurrentDate } from "@/utils/getFormattedCurrentDate";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import PaymentInput from "@/components/paymentInput/PaymentInput";
import TextHeader from "@/components/textHeader/TextHeader";
import { getExpenseCategories } from "@/api/getExpenseCategories";

const props = store.modalPagesStore.props;

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

async function filter(inputValue, update) {
  if (expense.categories.length) {
    update();
    return;
  }

  const categories = await getExpenseCategories();

  update(() => {
    expense.categories = categories;
  });
}
</script>
