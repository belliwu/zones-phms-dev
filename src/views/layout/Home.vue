<template>
  <div class="home">
    <!-- 1. Header Part -->
    <app-header></app-header>

    <!-- 2. 側邊抽屜 -->
    <app-aside></app-aside>
  </div>
</template>

<script>
import Header from "views/layout/Header";
import Aside from "views/layout/Aside";

export default {
  name: "home",
  components: {
    "app-header": Header,
    "app-aside": Aside
  }
};
</script>

<style scoped>
</style>

