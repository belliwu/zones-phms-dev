<template>
  <div id="dashboard">
    <h1>That is the Dasboard !</h1>
    <p>You should only get here if you are authenticated !</p>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  created: {}
};
</script>

<style scoped>
h1,
p {
  text-align: center;
  margin-top: 20px auto;
}

p {
  color: red;
}
</style>
