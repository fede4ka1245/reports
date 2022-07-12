<template>
  <section>
    <q-btn color="orange" outline class="btn" @click="props.dismissHandler">
      Отмена
    </q-btn>
    <q-btn
      :disable="isConfirmButtonDisabled"
      color="orange"
      class="btn"
      @click="props.confirmHandler"
    >
      Сохранить
    </q-btn>
  </section>
</template>

<script setup>
const props = defineProps({
  dismissHandler: {
    type: Function,
    required: true,
  },
  confirmHandler: {
    type: Function,
    required: true,
  },
  isConfirmButtonDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  margin: 1em 0 1em 0;
}

.btn {
  width: 49%;
}
</style>
