<template>
  <text-header>Сумма оплат участников</text-header>
  <p v-if="!store.currentReport.moneyCodes.length">Не добавлено валют</p>
  <payment-input
    v-for="(code, index) in store.currentReport.moneyCodes"
    :key="code"
    :update-sum="(value) => updateSum(value, code)"
    :sum="store.currentReport.moneySums[code]"
    :code="store.currentReport.moneyCodes[index]"
  />
  <payments
    :payments="store.currentReport.incomingPayments"
    :money-codes="store.currentReport.moneyCodes"
  />
</template>

<script setup>
import { store } from "@/store/store";
import PaymentInput from "@/components/paymentInput/PaymentInput";
import TextHeader from "@/components/textHeader/TextHeader";
import Payments from "@/components/payments/Payments";

const updateSum = (value, code) => {
  store.currentReport.moneySums[code] = value;
};
</script>
