<template>
  <div class="myHeader">
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <div class="navbar-collapse collapse">
        <!-- 1. logo element -->
        <app-logo></app-logo>

        <!-- 2. Header navs -->
        <app-headerNavs></app-headerNavs>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from "pages/layout/Logo";
import HeaderNavs from "pages/layout/HeaderNavs";

export default {
  name: "myHeader",
  components: {
    "app-logo": Logo,
    "app-headerNavs": HeaderNavs
  }
};
</script>

<style scoped>
</style>


