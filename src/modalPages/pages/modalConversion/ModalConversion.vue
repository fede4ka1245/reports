<template>
  <text-header class="item">Добавить конвертацию</text-header>
  <div class="flex row justify-between items-center item">
    <section class="sum">
      <q-select
        v-model="conversion.from.moneyCode"
        label="валюта"
        :options="props.moneyCodes"
        outlined
      />
      <q-input v-model="conversion.from.sum" outlined label="Сумма" />
    </section>
    <section>
      <span class="to"></span>
    </section>
    <section class="sum">
      <q-select
        v-model="conversion.to.moneyCode"
        label="валюта"
        :options="store.currentReport.moneyCodes"
        outlined
      />
      <q-input v-model="conversion.to.sum" outlined label="Сумма" />
    </section>
  </div>
  <q-input
    v-model="conversion.comment"
    type="textarea"
    outlined
    label="Расчет и комментарии"
    class="item"
  />
  <q-input v-model="conversion.date" outlined label="Дата" class="item" />
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="onConversionConfirm"
    class="item"
  />
</template>

<script setup>
import { closeModalPage } from "@/modalPages/utils/closeModalPage";
import { store } from "@/store/store";
import { reactive } from "vue";
import { getFormattedCurrentDate } from "@/helpers/getFormattedCurrentDate";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import TextHeader from "@/components/textHeader/TextHeader";

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
