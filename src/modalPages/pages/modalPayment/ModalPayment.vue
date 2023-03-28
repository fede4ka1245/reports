<template>
  <text-header class="item">Добавить/передать оплату</text-header>
  <q-input
    v-if="props?.type === 'members'"
    :model-value="paymentData.payment.name"
    outlined
    label="ФИО"
    :error="!paymentData.payment.name && state.isError"
    class="item"
    @update:model-value="onMemberNameInputChange"
  />
  <q-select
    v-if="props?.type === 'instructors'"
    :options="paymentData.instructors"
    :model-value="paymentData.payment.name"
    :option-label="getInstructorSelectLabel"
    class="item"
    :error="!paymentData.payment.name && state.isError"
    outlined
    use-input
    label="ФИО инструктора/куратора"
    @update:model-value="onInstructorUpdate"
    @filter="filter"
  />
  <payment-input
    :code="paymentData.payment.moneyCode"
    :codes="props.moneyCodes"
    :sum="paymentData.payment.sum"
    :sum-error="
      (!paymentData.payment.sum && state.isError) || paymentData.payment.sum < 0
    "
    :money-code-error="!paymentData.payment.moneyCode && state.isError"
    :update-code="(code) => (paymentData.payment.moneyCode = code)"
    :update-sum="(sum) => (paymentData.payment.sum = sum)"
    class="item"
  />
  <q-input
    v-model="paymentData.payment.comment"
    :error="!paymentData.payment.comment && state.isError"
    type="textarea"
    outlined
    label="Комментарий"
    class="item"
  />
  <input-date
    :date="paymentData.payment.date"
    :on-date-change="onDateChange"
    :error="!paymentData.payment.date && state.isError"
  />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onPaymentConfirm"
    :is-confirm-button-disabled="isConfirmButtonDisabled"
    :on-disabled-button-click="activateError"
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
import { toCamelCase } from "@/helpers/toCamelCase";

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

const state = reactive({ isError: false });
const activateError = () => {
  if (isConfirmButtonDisabled.value) {
    state.isError = true;
  }
};

const onInstructorUpdate = (instructor) => {
  paymentData.payment.id = instructor || "";
  paymentData.payment.name = instructor?.name || "";
  paymentData.payment.instructorId = instructor?.id || "";
};

const getInstructorSelectLabel = (instructor) => instructor.name || instructor;

const isConfirmButtonDisabled = computed(() => {
  return !(
    paymentData.payment.sum &&
    paymentData.payment.date &&
    paymentData.payment.moneyCode &&
    paymentData.payment.comment &&
    (paymentData.payment.name ||
      (props?.type !== "instructors" && props?.type !== "members")) &&
    paymentData.payment.sum >= 0
  );
});

const onDateChange = (date) => {
  paymentData.payment.date = date;
};

const onMemberNameInputChange = (name) => {
  paymentData.payment.name = toCamelCase(name);
};

async function filter(inputValue, update) {
  if (paymentData.instructors.length) {
    paymentData.instructors = instructors.filter((instructor) =>
      `${instructor.firstName} ${instructor.middleName} ${instructor.lastName}`
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
