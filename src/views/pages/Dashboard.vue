<template>
  <div class="dashboard">
    <h1>這是系統儀表版，顯示工作或系統重要信息 !</h1>
    <p>若你已經被授權，你應該可以到達此地 !</p>
    <p v-if="email">你的帳號: {{ email }}</p>
  </div>
</template>

<script>
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
