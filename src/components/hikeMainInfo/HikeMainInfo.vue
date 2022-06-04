<template>
  <q-select
    :options="data.routes"
    option-label="name"
    class="item"
    outlined
    use-input
    label="Событие"
    :model-value="props.model.name"
    @update:model-value="
      (target) => {
        updateModel({ ...props.model, name: target.name, hikes: target.hikes });
      }
    "
    @filter="filter"
  />
  <q-select
    :options="datesOptions"
    :option-label="
      (item) => (item.beginDate ? item.beginDate + '-' + item.endDate : item)
    "
    :model-value="props.model.date"
    class="item"
    outlined
    label="Дата"
    @update:model-value="
      (target) => {
        updateModel({
          ...props.model,
          id: target.id,
          date: target.beginDate + '-' + target.endDate,
          hikes: target.hikes,
        });
      }
    "
  />
</template>

<script setup>
import { reactive, computed } from "vue";
import { getRoutes } from "@/api/getRoutes";
import { defineProps } from "vue";

const props = defineProps({
  model: Object,
  updateModel: Function,
});

const data = reactive({
  routes: [],
});
let routes = [];

async function filter(inputValue, update) {
  if (data.routes.length) {
    data.routes = routes.filter((route) =>
      route.name.toLowerCase().includes(inputValue)
    );
    update();
    return;
  }

  routes = await getRoutes();

  update(() => {
    data.routes = routes;
  });
}

const datesOptions = computed(() => {
  return props.model.hikes;
});
</script>

<style scoped></style>
