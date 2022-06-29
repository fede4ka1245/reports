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
      :options="paymentData.instructors"
      :model-value="paymentData.payment.name"
      :option-label="getInstructorSelectLabel"
      @update:model-value="onInstructorUpdate"
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
  <input-date :date="paymentData.payment.date" :on-date-change="onDateChange" />
  <form-confirmation
      :dismiss-handler="closeModalPage"
      :confirm-handler="onPaymentConfirm"
      :is-confirm-button-disabled="isConfirmButtonDisabled"
      class="item"
  />
</template>

<script setup>
import { closeModalPage } from "@/modalPages/helpers/closeModalPage";
import { store } from "@/store/store";
import { reactive, computed } from "vue";
import { getFormattedCurrentDate } from "@/helpers/reports/getFormattedCurrentDate";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import PaymentInput from "@/components/paymentInput/PaymentInput";
import TextHeader from "@/components/textHeader/TextHeader";
import { cachedRequestInstructors } from "@/api/cachedRequests";
import InputDate from "@/components/inputDate/InputDate";

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
  sum: String(),
  moneyCode: String(),
  comment: String(),
  date: getFormattedCurrentDate(),
  instructorId: String(),
  id: "",
};


const paymentData = reactive({
  payment: props?.payment || payment,
  instructors: [],
});
let instructors = [];

const onInstructorUpdate = (instructor) => {
  paymentData.payment.id = instructor
  paymentData.payment.name = instructor.name;
  paymentData.payment.instructorId = instructor.id;
}

const getInstructorSelectLabel = (instructor) => instructor.name || instructor

const isConfirmButtonDisabled = computed(() => {
  return !(paymentData.payment.sum && paymentData.payment.date && paymentData.payment.moneyCode)
})

const onDateChange = (date) => {
  paymentData.payment.date = date;
};

async function filter(inputValue, update) {
  if (paymentData.instructors.length) {
    paymentData.instructors = instructors.filter((instructor) =>
        (`${instructor.firstName} ${instructor.middleName} ${instructor.lastName}`)
            .toLowerCase()
            .includes(inputValue.toLowerCase())
    );
    update();
    return;
  }

  instructors = format(await cachedRequestInstructors());

  update(() => {
    paymentData.instructors = instructors;
  });
}
</script>
