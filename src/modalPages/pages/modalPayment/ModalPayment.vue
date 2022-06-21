<template>
  <text-header class="item">Добавить/передать оплату</text-header>
  <q-input
    v-if="props?.type === 'members'"
    v-model="paymentData.payment.name"
    outlined
    label="ФИО"
    class="item"
  />
  <q-select
    v-if="props?.type === 'instructors'"
    v-model="paymentData.payment.name"
    :options="instrutorsOprions"
    class="item"
    outlined
    use-input
    label="ФИО инструктора/куратора"
    @filter="filter"
  />
  <payment-input
    :code="paymentData.payment.moneyCode"
    :codes="props.moneyCodes"
    :sum="paymentData.payment.sum"
    :update-code="(code) => (paymentData.payment.moneyCode = code)"
    :update-sum="(sum) => (paymentData.payment.sum = sum)"
    class="item"
  />
  <q-input
    v-model="paymentData.payment.comment"
    type="textarea"
    outlined
    label="Комментарий"
    class="item"
  />
  <q-input
    v-model="paymentData.payment.date"
    outlined
    label="Дата"
    class="item"
  />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onPaymentConfirm"
    class="item"
  />
</template>

<script setup>
import { closeModalPage } from "@/modalPages/utils/closeModalPage";
import { store } from "@/store/store";
import { reactive, computed } from "vue";
import { getFormattedCurrentDate } from "@/helpers/getFormattedCurrentDate";

import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import PaymentInput from "@/components/paymentInput/PaymentInput";
import TextHeader from "@/components/textHeader/TextHeader";
import { getInstructors } from "@/api";

const onPaymentConfirm = () => {
  closeModalPage();
  props.saveData(paymentData.payment);
};

const format = (instructors) => {
  return Array.from(
    instructors.map((instructor) => {
      const firstName = instructor?.firstName || "";
      const middleName = instructor?.middleName || "";
      const lastName = instructor?.lastName || "";

      instructor.name = `${firstName} ${middleName} ${lastName}`;

      return instructor;
    })
  );
};

const props = store.modalPages.props;

const payment = {
  name: String(),
  sum: "",
  moneyCode: String(),
  comment: String(),
  date: getFormattedCurrentDate(),
};

const paymentData = reactive({
  payment: props?.payment || payment,
  instructors: [],
});
let instructors = [];

async function filter(inputValue, update) {
  if (paymentData.instructors.length) {
    paymentData.instructors = instructors.filter((instructor) =>
      (instructor.firstName + " " + instructor.middleName)
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    );
    update();
    return;
  }

  instructors = format(await getInstructors());

  update(() => {
    paymentData.instructors = instructors;
  });
}

const instrutorsOprions = computed(() => {
  return paymentData.instructors.map((instructor) => instructor.name);
});
</script>
