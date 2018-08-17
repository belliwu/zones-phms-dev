<template>
  <div id="app">
    <!-- 1. Header Part -->
    <app-header></app-header>

    <!-- 2. Container Part -->
    <app-container></app-container>
  </div>
</template>

<script>
import Header from "views/layout/Header";
import Container from "views/layout/Container";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-container": Container
  }
};
</script>

<style>
#app {
  font-family: "Microsoft Jhenghei", "微軟正黑體";
}
</style>
