<template>
  <div class="d-flex">
    <!-- 1. Aside draer part -->
    <app-aside></app-aside>

    <!-- 2. Contener Part -->
    <app-content></app-content>
  </div>
</template>


<script>
import Aside from "views/layout/Aside";
import Content from "views/layout/Content";

export default {
  name: "container",
  components: {
    "app-aside": Aside,
    "app-content": Content
  }
};
</script>


<style scoped>
</style>
