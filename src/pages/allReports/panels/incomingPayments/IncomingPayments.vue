<template>
  <payments
    :payments="store.allReportsStore.incomingPayments"
    :money-codes="getMoneyCodes()"
  />
</template>

<script setup>
import { store } from "@/store/store";
import { getMoneyCodes } from "@/modules/getMoneyCodes";
import Payments from "@/components/payments/Payments";
</script>
