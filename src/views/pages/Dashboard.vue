<template>
  <div class="dashboard">
    <h1>That is the Dasboard !</h1>
    <p>You should only get here if you are authenticated !</p>
    <p v-if="email">Your email address: {{ email }}</p>
  </div>
</template>

<script>
import axios from "@/axios/axios-firebase.js";

export default {
  computed: {
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 20px auto;
}

p {
  color: red;
}
</style>
