<template>
  <div class="inbuilding">
    <img src="static/images/InBuilding_1.png" alt="">
    <h1>{{message}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "工程中 ..."
    };
  }
};
</script>

<style scoped>
.inbuilding {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 100px;
}
h1 {
  margin-top: 20px;
}
</style>
