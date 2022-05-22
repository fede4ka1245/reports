<script setup>
import AppTabbar from "./components/appTabbar/AppTabbar";
import ModalRoot from "@/modalPages/modalRoot/ModalRoot";
</script>

<template>
  <router-view></router-view>
  <div>
    <modal-root />
  </div>
  <div class="tabbar-margin"></div>
  <app-tabbar />
</template>

<style>
body {
  background-color: #f5f2ec;
}

.tabbar-margin {
  margin: 3em;
}
</style>
