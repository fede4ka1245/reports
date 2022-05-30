<template>
  <text-header>Сумма оплат участников</text-header>
  <p v-if="!store.currentReportStore.moneyCodes.length">Не добавлено валют</p>
  <payment-input
    v-for="(code, index) in store.currentReportStore.moneyCodes"
    :key="code"
    :update-sum="(value) => update(value, code)"
    :sum="store.currentReportStore.moneySums[code]"
    :code="store.currentReportStore.moneyCodes[index]"
  />
  <section
    v-for="(payment, index) in store.currentReportStore.incomingPayments"
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
            moneyCodes: store.currentReportStore.moneyCodes,
          })
      "
    />
  </section>
</template>

<script setup>
import { store } from "@/store/store";
import PaymentInput from "@/components/paymentInput/PaymentInput";
import TextHeader from "@/components/textHeader/TextHeader";
import { openModalPage } from "@/modalPages/utils/openModalPage";
import { modalName } from "@/modalPages/utils/modalName";
import ButtonAdd from "@/components/buttonAdd/ButtonAdd";
import PaymentTable from "@/components/table/PaymentTable";
import { paymentsColumns } from "@/components/table/columns";

const removeIncomingPayment = (incomingPaymentIndex) => {
  return (index) => {
    store.currentReportStore.incomingPayments[
      incomingPaymentIndex
    ].payments.splice(index, 1);
  };
};

const fixIncomingPayment = (incomingPaymentIndex) => {
  return (index) => {
    openModalPage(modalName.modalPayment, {
      saveData: (payment) => {
        store.currentReportStore.incomingPayments[
          incomingPaymentIndex
        ].payments[index] = payment;
      },
      payment:
        store.currentReportStore.incomingPayments[incomingPaymentIndex]
          .payments[index],
      moneyCodes: store.currentReportStore.moneyCodes,
      type: store.currentReportStore.incomingPayments[incomingPaymentIndex]
        .type,
    });
  };
};

const update = (value, code) => {
  store.currentReportStore.moneySums[code] = value;
};
</script>
