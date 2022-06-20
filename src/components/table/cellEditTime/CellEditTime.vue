<template>
  <q-td>
    <q-btn round flat color="grey" icon="more_horiz">
      <q-menu>
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
});
</script>

<style scoped></style>
