<template>
  <q-select
    ref="reportInput"
    :options="data.filteredRoutes"
    option-label="name"
    class="item"
    outlined
    use-input
    label="Маршрут"
    :model-value="props.hike.name"
    :error="props.isNameError"
    @update:model-value="onRouteUpdate"
    @filter="filterSearch"
  >
  </q-select>
  <q-select
    :options="data.hikes"
    :option-label="getDateOptionLabel"
    :model-value="props.hike?.dates"
    :error="props.isDateError"
    class="item"
    outlined
    label="Сроки"
    popup-content-style="width: 50vh"
    @update:model-value="onDateUpdate"
    @filter="filterSearch"
  />
</template>

<script setup>
import { reactive, ref } from "vue";
import { cachedRequestRoutes } from "@/api/cachedRequests";

const reportInput = ref();

const props = defineProps({
  hike: {
    type: Object,
    required: true,
  },
  updateHikeName: {
    type: Function,
    required: true,
  },
  updateHikeInformation: {
    type: Function,
    required: true,
  },
  isNameError: {
    type: Boolean,
    default: () => false,
  },
  isDateError: {
    type: Boolean,
    default: () => false,
  },
});

const onRouteUpdate = (targetRoute) => {
  setTimeout(() => reportInput.value.blur(), 0);
  if (!targetRoute?.name) {
    props.updateHikeName("");
    props.updateHikeInformation("", "");
    data.hikes = [];
    return;
  }

  props.updateHikeName(targetRoute?.name);
  props.updateHikeInformation("", "");
  data.hikes = targetRoute.hikes;
};

const onDateUpdate = (targetHike) => {
  props.updateHikeInformation(
    [targetHike.beginDate, targetHike.endDate].join(" - "),
    targetHike.id
  );
};

const getDateOptionLabel = (optionHike) => {
  if (!optionHike) {
    return "";
  } else if (!optionHike.beginDate) {
    return optionHike;
  }

  return [optionHike?.beginDate, optionHike?.endDate].join(" - ");
};

const data = reactive({
  routes: [],
  filteredRoutes: [],
  hikes: [],
});

async function filterSearch(input, update) {
  if (data.routes.length) {
    data.filteredRoutes = data.routes.filter((route) =>
      route.name.toLowerCase().includes(input.toLowerCase())
    );
    update();

    return;
  }

  data.routes = await cachedRequestRoutes();
  data.filteredRoutes = [...data.routes];
  update();

  if (props.hike.name) {
    data.hikes = data.routes.find(
      (route) => route.name === props.hike.name
    ).hikes;
  }
}
</script>
