<template>
  <div class="myNavbar ml-auto">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="fas fa-envelope"></i> 5</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="fas fa-bell"></i> 3</a>
      </li>
      <li class="nav-item dropdown">
        <a href="#" id="dd_user" class="nav-link dropdown-toggle" data-toggle="dropdown">
          <i class="fas fa-user-circle fa-lg"></i>
          Belli Wu
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd_user">
          <a href="#" class="dropdown-item">
            <i class="fas fa-user"></i>
            個人資料
          </a>
          <a href="#" class="dropdown-item">
            <i class="fas fa-sign-in-alt"></i>
            簽到
          </a>
          <a href="#" class="dropdown-item">
            <i class="fas fa-sign-out-alt"></i>
            登出
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "headerNavs"
};
</script>

<style scoped>
</style>

