<template>
  <router-view></router-view>
  <div class="tabbar-margin"></div>
  <app-tabbar />
</template>

<script setup>
import AppTabbar from "./components/appTabbar/AppTabbar";
</script>

<style>
body {
  background-color: #f5f2ec;
}

.tabbar-margin {
  margin: 3em;
}
</style>
