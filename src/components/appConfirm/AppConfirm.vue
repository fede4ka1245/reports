<template>
  <q-dialog v-model="store.propmt.isOpen" persistent>
    <q-card>
      <q-card-section
        style="
          width: 450px;
          max-width: calc(100vw - 48px);
          min-height: 40px;
          margin: 16px 0;
        "
        class="row items-center"
      >
        <span class="q-ml-sm">{{ store.propmt.text }}</span>
      </q-card-section>

      <q-card-actions class="btn-container">
        <q-btn
          v-close-popup
          class="btn-1"
          flat
          label="Подтверидть"
          color="primary"
          @click="store.propmt.onSuccess"
        />
        <q-btn
          v-close-popup
          class="btn-2"
          flat
          label="Отменить"
          color="red"
          @click="store.propmt.onCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { store } from "@/store/store";
</script>

<style scoped>
.btn-container {
  display: flex;
}

.btn-1,
.btn-2 {
  flex: 1;
}

.btn-2 {
  margin-left: 5px;
}
</style>
