<template>
  <div class="myLogo">
    <a class="sidebar-toggle mr-3" href="#">
      <i class="fas fa-bars"></i>
    </a>
    <a class="navbar-brand" href="#">{{logo_title}}</a>
  </div>
</template>

<script>
export default {
  name: "myLogo",
  data() {
    return {
      logo_title: "TMUH-ARMS 生殖醫學個案管理系統"
    };
  }
};
</script>

<style scoped>
</style>

