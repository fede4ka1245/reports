<template>
  <text-header>Сумма оплат участников</text-header>
  <p v-if="!store.currentReportStore.moneyCodes.length">Не добавлено валют</p>
  <payment-input
    v-for="(code, index) in store.currentReportStore.moneyCodes"
    :key="code"
    :update-sum="(value) => updateSum(value, code)"
    :sum="store.currentReportStore.moneySums[code]"
    :code="store.currentReportStore.moneyCodes[index]"
  />
  <payments
    :payments="store.currentReportStore.incomingPayments"
    :money-codes="store.currentReportStore.moneyCodes"
  />
</template>

<script setup>
import { store } from "@/store/store";
import PaymentInput from "@/components/paymentInput/PaymentInput";
import TextHeader from "@/components/textHeader/TextHeader";
import Payments from "@/components/payments/Payments";

const updateSum = (value, code) => {
  store.currentReportStore.moneySums[code] = value;
};
</script>
