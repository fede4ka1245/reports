<template>
  <q-select
    ref="select"
    :options="data.filteredRoutes"
    option-label="name"
    class="item"
    outlined
    use-input
    label="Событие"
    :model-value="props.hike.name"
    menu-self="center middle"
    @update:model-value="
      (targetRoute) => {
        props.updateHikeName(targetRoute.name);
        props.updateHikeInformation('', '');
        data.hikes = targetRoute.hikes;
      }
    "
    @filter="filterSearch"
  >
    <template #append>
      <q-btn round dense flat icon="close" @click="() => select.hidePopup()" />
    </template>
  </q-select>
  <q-select
    :options="data.hikes"
    :option-label="
      (optionHike) => {
        if (!optionHike) {
          return '';
        } else if (!optionHike.beginDate) {
          return optionHike;
        }

        return optionHike?.beginDate + '-' + optionHike?.endDate;
      }
    "
    :model-value="props.hike.dates"
    class="item"
    outlined
    label="Дата"
    @update:model-value="
      (targetHike) => {
        props.updateHikeInformation(
          targetHike.beginDate + '-' + targetHike.endDate,
          targetHike.id
        );
      }
    "
  />
</template>

<script setup>
import { reactive, ref } from "vue";
import { getRoutes } from "@/api/getRoutes";
import { defineProps } from "vue";

const select = ref();

const props = defineProps({
  hike: Object,
  updateHikeName: Function,
  updateHikeInformation: Function,
});

const data = reactive({
  routes: [],
  filteredRoutes: [],
  hikes: [],
});

async function filterSearch(input, update) {
  if (data.routes.length) {
    data.filteredRoutes = data.routes.filter((route) =>
      route.name.toLowerCase().includes(input)
    );
    update();

    return;
  }

  data.routes = await getRoutes();
  data.filteredRoutes = [...data.routes];
  update();

  if (props.hike.name) {
    data.hikes = data.routes.find(
      (route) => route.name === props.hike.name
    ).hikes;
  }
}
</script>

<style scoped></style>
