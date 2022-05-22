<script setup>
import { closeModalPage } from "@/modalPages/utils/closeModalPage";
import { store } from "@/store/store";
import { reactive } from "vue";
import { getFormattedCurrentDate } from "@/utils/getFormattedCurrentDate";
const { saveData } = store.modalPagesStore.props;
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";

const conversion = reactive({
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
});
</script>

<template>
  <h6>Добавить конвертацию</h6>
  <div class="flex row justify-between items-center">
    <section class="sum">
      <q-select
        v-model="conversion.from.moneyCode"
        :options="store.currentReportStore.moneyCodes"
        outlined
      />
      <q-input v-model="conversion.from.sum" outlined label="сумма" />
    </section>
    <section>
      <span class="to"></span>
    </section>
    <section class="sum">
      <q-select
        v-model="conversion.to.moneyCode"
        :options="store.currentReportStore.moneyCodes"
        outlined
      />
      <q-input v-model="conversion.to.sum" outlined label="сумма" />
    </section>
  </div>
  <section>
    <q-input
      v-model="conversion.comment"
      type="textarea"
      outlined
      label="расчет и комментарии"
    />
    <q-input v-model="conversion.date" outlined label="дата" />
  </section>
  <form-confirmation
    :dismiss-handler="closeModalPage"
    :confirm-handler="
      () => {
        closeModalPage();
        saveData(conversion);
      }
    "
  />
</template>

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
