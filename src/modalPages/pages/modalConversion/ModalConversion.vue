<template>
  <text-header class="item">Добавить конвертацию</text-header>
  <div class="flex row justify-between items-center item">
    <section class="sum">
      <q-select
        v-model="conversion.from.moneyCode"
        label="Валюта"
        :options="props.moneyCodes"
        :error="
          (!conversion.from.moneyCode && state.isError) ||
          (!!conversion.to.moneyCode &&
            conversion.to.moneyCode === conversion.from.moneyCode)
        "
        outlined
      />
      <q-input
        v-model="conversion.from.sum"
        :error="!conversion.from.sum && state.isError || conversion.from.sum < 0"
        outlined
        label="Сумма"
        type="number"
      />
    </section>
    <section>
      <span class="to"></span>
    </section>
    <section class="sum">
      <q-select
        v-model="conversion.to.moneyCode"
        :error="
          (!conversion.to.moneyCode && state.isError) ||
          (!!conversion.to.moneyCode &&
            conversion.to.moneyCode === conversion.from.moneyCode)
        "
        label="Валюта"
        :options="store.currentReport.moneyCodes"
        outlined
      />
      <q-input
        v-model="conversion.to.sum"
        :error="!conversion.to.sum && state.isError || conversion.to.sum < 0"
        outlined
        label="Сумма"
        type="number"
      />
    </section>
  </div>
  <q-input
    v-model="conversion.comment"
    :error="!conversion.comment && state.isError"
    type="textarea"
    outlined
    label="Расчет и комментарии"
    class="item"
  />
  <input-date
    :date="conversion.date"
    :on-date-change="onDateChange"
    :error="!conversion.date && state.isError"
  />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onConversionConfirm"
    :is-confirm-button-disabled="isConfirmButtonDisabled"
    :on-disabled-button-click="activateError"
    class="item"
  />
</template>

<script setup>
import { closeModalPage } from "@/modalPages/helpers/closeModalPage";
import { store } from "@/store/store";
import { computed, reactive } from "vue";
import { getFormattedCurrentDate } from "@/helpers/reports/getFormattedCurrentDate";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import TextHeader from "@/components/textHeader/TextHeader";
import InputDate from "@/components/inputDate/InputDate";

const props = store.modalPages.props;

const onConversionConfirm = () => {
  closeModalPage();
  props?.saveData(conversion);
};

const defaultConversion = {
  from: {
    moneyCode: "",
    sum: "",
  },
  to: {
    moneyCode: "",
    sum: "",
  },
  comment: "",
  date: getFormattedCurrentDate(),
};

const conversion = reactive(props.conversion || defaultConversion);
const isConfirmButtonDisabled = computed(() => {
  return !(
    conversion.from.moneyCode &&
    conversion.from.sum &&
    conversion.to.moneyCode &&
    conversion.to.sum &&
    conversion.date &&
    conversion.comment &&
    conversion.to.moneyCode !== conversion.from.moneyCode &&
    conversion.to.sum >= 0 &&
    conversion.from.sum >= 0
  );
});

const state = reactive({ isError: false });
const activateError = () => {
  if (isConfirmButtonDisabled.value) {
    state.isError = true;
  }
};

const onDateChange = (date) => {
  conversion.date = date;
};
</script>

<style scoped>
.to {
  border: solid gray;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  height: 2em;
  width: 2em;
  transform: rotate(-45deg);
}

.sum {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  flex-direction: column;
  width: 40%;
}
</style>
