<template>
  <section class="content">
    <text-header class="item">
      Хотите сообщить об ошибке или оставить отзыв о работе приложения?
    </text-header>
    <q-input type="textarea" outlined label="Текст" class="item" />
    <q-input outlined label="Твое имя" class="item" />
    <q-input outlined label="E-mail для связи с тобой" class="item" />
    <form-confirmation />
  </section>
</template>

<script setup>
import FormConfirmation from "@/components/fromConfirmation/FormConfirmation";
import TextHeader from "@/components/textHeader/TextHeader";
</script>
