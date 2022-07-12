<template>
  <section class="content">
    <text-header class="item">
      Хотите сообщить об ошибке или оставить отзыв о работе приложения?
    </text-header>
    <q-input
      v-model="errorData.description"
      type="textarea"
      outlined
      label="Текст фидбэка"
      class="item"
    />
    <q-input v-model="errorData.name" outlined label="Твое имя" class="item" />
    <app-informer>
      <p>
        Далее вы будете перенаправлены в почтовое приложение вашего телефона,
        где сможете прикрепить необходимые скриншоты или видео, и отправить письмо нам.
        <br>
        Мы обязательно его прочтем!
      </p>
    </app-informer>
    <form-confirmation
      :dismiss-handler="clearForm"
      :confirm-handler="sendEmail"
    />
  </section>
</template>

<script setup>
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import TextHeader from "@/components/textHeader/TextHeader";
import { EmailComposer } from "capacitor-email-composer";
import { reactive } from "vue";
import AppInformer from "@/components/appInformer/AppInformer";

const errorData = reactive({
  name: "",
  description: "",
});

const sendEmail = () => {
  const email = {
    to: ["marina@vpoxod.ru"],
    subject: "app feedback",
    body: `Пользователь: ${errorData.name} <br> Пишет: ${errorData.description}`,
    isHtml: true,
  };
  EmailComposer.open(email);
};

const clearForm = () => {
  errorData.name = "";
  errorData.email = "";
  errorData.description = "";
};
</script>
