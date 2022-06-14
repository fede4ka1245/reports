<template>
  <section class="content">
    <text-header class="item">
      Хотите сообщить об ошибке или оставить отзыв о работе приложения?
    </text-header>
    <q-input
      v-model="errorData.description"
      type="textarea"
      outlined
      label="Текст"
      class="item"
    />
    <q-input v-model="errorData.name" outlined label="Твое имя" class="item" />
    <q-input
      v-model="errorData.email"
      outlined
      label="E-mail для связи с тобой"
      class="item"
    />
    <form-confirmation :confirm-handler="sendEmail" />
  </section>
</template>

<script setup>
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import TextHeader from "@/components/textHeader/TextHeader";
import { EmailComposer } from "capacitor-email-composer";
import { reactive } from "vue";

const errorData = reactive({
  name: "",
  email: "",
  description: "",
});

const sendEmail = () => {
  const email = {
    to: ["marina@vpoxod.ru"],
    subject: "app feedback",
    body: `имя: ${errorData.name} <br> email: ${errorData.email} <br> ошибка: ${errorData.description}`,
    isHtml: true,
  };
  EmailComposer.open(email);
};
</script>
