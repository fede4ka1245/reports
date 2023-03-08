<template>
  <section class="content container">
    <text-header class="item">
      Хотите сообщить об ошибке или оставить отзыв о работе приложения?
    </text-header>
    <q-btn
      class="item"
      color="orange"
      icon="telegram"
      label="Написать фидбэк"
      no-caps
      @click="onFeedbackButtonClick"
    />
    <app-informer class="item">
      <p>
        Вы будете перенаправлены в телеграм, где сможете прикрепить необходимые
        скриншоты или видео, и отправить сообщение об ошибке или пожелании нам.
        <br />
        Мы обязательно на него ответим!
      </p>
    </app-informer>
  </section>
</template>

<script setup>
import TextHeader from "@/components/textHeader/TextHeader";
import { reactive } from "vue";
import AppInformer from "@/components/appInformer/AppInformer";

const errorData = reactive({
  name: "",
  description: "",
});

const onFeedbackButtonClick = () => {
  window.open(process.env.VUE_APP_TELEGRAM_FEEDBACK);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item {
  margin-bottom: 30px;
}
</style>
