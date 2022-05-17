<script setup>
import { ref } from "vue";
import { routes } from "@/router/router"

const tabs = [
  {
    name: 0,
    icon: "campaign",
    label: "Текущий",
    link: routes[0].path
  },
  {
    name: 1,
    icon: "folder",
    label: "Все отчеты",
    link: routes[1].path
  },
  {
    name: 2,
    icon: "campaign",
    label: "Фидбэк",
    link: routes[2].path
  }
]

const page = ref(tabs[0].name);
</script>

<template>
  <div class="app">
    <q-tabs
        v-model="page"
        narrow-indicator
        dense
        align="justify"
        class="text-orange"
    >
      <q-tab
          v-for="tab in tabs"
          :name="tab.name"
          :icon="tab.icon"
          :label="tab.label"
          @click="this.$router.push(tab.link)"
      >

      </q-tab>
    </q-tabs>
  </div>
</template>

<style scoped>
.app {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f2ec;
}
</style>