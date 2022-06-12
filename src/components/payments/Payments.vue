<template>
  <section v-for="payment in payments" :key="payment.label">
    <text-header>{{ payment.label }}</text-header>
    <payment-table
      :edit="(index) => edit(payment, index)"
      :remove="(index) => remove(payment, index)"
      :columns="paymentsColumns"
      :rows="
        payment.payments.map((payment) => ({
          ...payment,
          sum: `${payment.sum} ${payment.moneyCode}`
        }))
      "
    />
    <button-add :handler="() => add(payment)" />
  </section>
</template>

<script setup>
import TextHeader from "@/components/textHeader/TextHeader";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import PaymentTable from "@/components/table/PaymentTable";
import { paymentsColumns } from "@/components/table/columns";
import { defineProps } from "vue";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";

const remove = (payment, index) => {
  payment.payments.splice(index, 1);
};

const edit = (payment, index) => {
  openModalPage(modalName.modalPayment, {
    saveData: (newPayment) => {
      payment.payments[index] = newPayment;
    },
    payment: payment.payments[index],
    moneyCodes: props.moneyCodes,
    type: payment.type,
  });
};

const add = (payment) => {
  openModalPage(modalName.modalPayment, {
    type: payment.type,
    saveData: (_payment) => payment.payments.push(_payment),
    moneyCodes: props.moneyCodes,
  });
};

const props = defineProps({
  remove: Function,
  edit: Function,
  add: Function,
  payments: Array,
  moneyCodes: Array,
});
</script>
