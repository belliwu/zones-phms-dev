<template>
  <div class="headerNavs ml-auto">

    <ul class="navbar-nav">
      <li class="nav-item my-auto text-white" v-if="email">{{email}}</li>

      <li class="nav-item" v-if="email">
        <a href="#" class="nav-link">
          <i class="fas fa-envelope"></i> 5</a>
      </li>

      <li class="nav-item" v-if="email">
        <a href="#" class="nav-link">
          <i class="fas fa-bell"></i> 3</a>
      </li>

      <li class="nav-item dropdown">
        <a href="#" id="dd_user" class="nav-link dropdown-toggle" data-toggle="dropdown">
          <i class="fas fa-user-circle fa-lg"></i>
        </a>

        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd_user">
          <router-link class="dropdown-item" to="/myInfo" v-if="email">
            <i class="fas fa-user"></i>
            個人資料
          </router-link>

          <router-link class="dropdown-item" to="/signup" v-if="!email">
            <i class="fas fa-user-plus"></i>
            註冊
          </router-link>

          <router-link class="dropdown-item" to="/login" v-if="!email">
            <i class="fas fa-sign-in-alt"></i>
            簽到
          </router-link>

          <router-link class="dropdown-item" to="/logout" v-if="email">
            <i class="fas fa-sign-out-alt"></i>
            登出
          </router-link>
        </div>
        <!-- End for "User" dropdown menu -->
      </li>
      <!-- End for "header" navs dropown menud -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "headerNavs",
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
</style>

