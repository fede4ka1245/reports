<template>
  <payments
    :payments="store.allReports.incomingPayments"
    :money-codes="getMoneyCodes()"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { getMoneyCodes } from "@/helpers/reports/getMoneyCodes";
import Payments from "@/components/paymentsInformation/PaymentsInformation";
</script>
