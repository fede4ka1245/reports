<template>
  <text-header :description="unitsDescriptions.clientsSum.description">
    Сумма оплат участников
  </text-header>
  <p v-if="!store.currentReport.moneyCodes.length">Не добавлено валют</p>
  <payment-input
    v-for="(code, index) in store.currentReport.moneyCodes"
    :key="code"
    :update-sum="(value) => updateSum(value, code)"
    :sum="store.currentReport.moneySums[code]"
    :code="store.currentReport.moneyCodes[index]"
  />
  <notification-data-saved v-if="isNotificationVisible" />
  <payments-information
    :payments="store.currentReport.incomingPayments"
    :money-codes="store.currentReport.moneyCodes"
  />
</template>

<script setup>
import { store } from "@/store/store";
import PaymentInput from "@/components/paymentInput/PaymentInput";
import TextHeader from "@/components/textHeader/TextHeader";
import PaymentsInformation from "@/components/paymentsInformation/PaymentsInformation";
import NotificationDataSaved from "@/components/notificationDataSaved/NotificationDataSaved";
import { useMutationEmitted } from "@/hooks/useMutationEmitted";
import { unitsDescriptions } from "@/helpers/unitsDescriptions";

const isNotificationVisible = useMutationEmitted(store.currentReport.moneySums);

const updateSum = (value, code) => {
  store.currentReport.moneySums[code] = Math.abs(value);
};
</script>
