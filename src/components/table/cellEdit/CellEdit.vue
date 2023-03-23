<template>
  <q-td>
    <q-btn round flat color="grey" icon="more_horiz">
      <q-menu style="width: 150px">
        <q-list>
          <q-item v-close-popup clickable @click="props.fix"> Изменить </q-item>
          <q-item v-close-popup clickable @click="onDeleteClick">
            Удалить
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-td>
</template>

<script setup>
import { appConfirm } from "@/components/appConfirm/appConfirm";

const onDeleteClick = async () => {
  const result = await appConfirm("Вы уверены, что хотите удалить значение?");

  if (result) {
    props.delete();
  }
};

const props = defineProps({
  fix: {
    type: Function,
    default: undefined,
  },
  delete: {
    type: Function,
    default: undefined,
  },
});
</script>
