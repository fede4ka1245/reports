<template>
  <section
    v-for="(payment, index) in store.allReportsStore.incomingPayments"
    :key="payment.label"
  >
    <text-header>{{ payment.label }}</text-header>
    <payment-table
      :edit="fixIncomingPayment(index)"
      :remove="removeIncomingPayment(index)"
      :columns="paymentsColumns"
      :rows="payment.payments"
    />
    <button-add
      :handler="
        () =>
          openModalPage(modalName.modalPayment, {
            type: payment.type,
            saveData: (_payment) =>
              (payment.payments = [...payment.payments, _payment]),
          })
      "
    />
  </section>
</template>

<script setup>
import { store } from "@/store/store";
import TextHeader from "@/components/textHeader/TextHeader";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import PaymentTable from "@/components/table/PaymentTable";
import { paymentsColumns } from "@/components/table/columns";

const removeIncomingPayment = (incomingPaymentIndex) => {
  return (index) => {
    store.allReportsStore.incomingPayments[
      incomingPaymentIndex
    ].payments.splice(index, 1);
  };
};

const fixIncomingPayment = (incomingPaymentIndex) => {
  return (index) => {
    openModalPage(modalName.modalPayment, {
      saveData: (payment) => {
        store.allReportsStore.incomingPayments[incomingPaymentIndex].payments[
          index
        ] = payment;
      },
      payment:
        store.allReportsStore.incomingPayments[incomingPaymentIndex].payments[
          index
        ],
    });
  };
};
</script>
