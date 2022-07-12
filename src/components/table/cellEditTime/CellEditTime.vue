<template>
  <q-td>
    <q-btn :disable="isDisabled" round flat color="grey" icon="more_horiz">
      <q-menu style="width: 150px">
        <q-list style="min-width: 100px">
          <q-item v-close-popup clickable @click="props.edit(props.pageIndex)">
            Изменить дату
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-td>
</template>

<script setup>
const props = defineProps({
  edit: {
    type: Function,
    required: true,
  },
  pageIndex: {
    type: Number,
    required: true,
  },
  moneyCode: {
    type: String,
    required: true,
  },
});

const isDisabled = props.moneyCode === "RUB";
</script>

<style scoped></style>
