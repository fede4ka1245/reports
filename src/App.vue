<template>
  <section class="app-content">
    <app-tabbar />
  </section>
  <router-view></router-view>
</template>

<script setup>
import AppTabbar from "./components/appTabbar/AppTabbar";
</script>

<style>
body {
  background-color: #f5f2ec;
}

.app-content {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
}
</style>
