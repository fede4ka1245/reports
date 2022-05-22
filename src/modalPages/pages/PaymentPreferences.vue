<script setup>
import { closeModalPage } from "@/modalPages/utils/closeModalPage";
import { store } from "@/store/store";
import { reactive } from "vue";
import { getFormattedCurrentDate } from "@/utils/getFormattedCurrentDate";
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
const { saveData } = store.modalPagesStore.props;

const payment = reactive({
  name: String(),
  sum: "",
  moneyCode: String(),
  comment: String(),
  date: getFormattedCurrentDate(),
});
</script>

<template>
  <div>
    <h6>Добавить/передать оплату</h6>
    <q-input v-model="payment.name" outlined label="ФИО" />
    <section class="payment">
      <q-input v-model="payment.sum" class="sum" outlined label="сумма" />
      <q-select
        v-model="payment.moneyCode"
        :options="store.currentReportStore.moneyCodes"
        class="code"
        outlined
      />
    </section>
    <section>
      <q-input
        v-model="payment.comment"
        type="textarea"
        outlined
        label="комментарий"
      />
      <q-input v-model="payment.date" outlined label="дата" />
    </section>
    <form-confirmation
      :dismiss-handler="closeModalPage"
      :confirm-handler="
        () => {
          closeModalPage();
          saveData(payment);
        }
      "
    />
  </div>
</template>

<style scoped>
.payment {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.sum {
  width: 70%;
}

.code {
  width: 30%;
}
</style>
