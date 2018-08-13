<template>
  <div class="home">
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <a class="sidebar-toggle mr-3" href="#">
        <i class="fa fa-bars"></i>
      </a>
      <a class="navbar-brand" href="#">TMUH-ARMS 生殖醫學個案管理系統</a>

      <div class="navbar-collapse collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fa fa-envelope"></i> 5</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fa fa-bell"></i> 3</a>
          </li>
          <li class="nav-item dropdown">
            <a href="#" id="dd_user" class="nav-link dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-user"></i>
              Belli Wu</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd_user">
              <a href="#" class="dropdown-item">Profile</a>
              <a href="#" class="dropdown-item">登出</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div class="d-flex">
      <div class="sidebar sidebar-dark bg-dark">
        <ul class="list-unstyled">
          <li>
            <a href="#">
              <i class="fa fa-fw fa-tachometer-alt"></i>
              儀表板
            </a>
          </li>
          <li>
            <a href="#sm_expand_1" data-toggle="collapse">
              <i class="fa fa-fw fa-link"></i> Expandable Menu Item
            </a>
            <ul id="sm_expand_1" class="list-unstyled collapse">
              <li>
                <a href="#">Submenu Item</a>
              </li>
              <li>
                <a href="#">Submenu Item</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-fw fa-link"></i> Menu Item</a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-fw fa-link"></i> Menu Item</a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-fw fa-link"></i> Menu Item</a>
          </li>
        </ul>
      </div>

      <div class="content p-4">
        <h2 class="mb-4">Blank/Starter</h2>

        <div class="card mb-4">
          <div class="card-body">
            This is a blank page you can use as a starting point.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>

