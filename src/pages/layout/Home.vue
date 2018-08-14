<template>
  <div class="home">
    <!-- 1. Header Part -->
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <a class="sidebar-toggle mr-3" href="#">
        <i class="fas fa-bars"></i>
      </a>
      <a class="navbar-brand" href="#">TMUH-ARMS 生殖醫學個案管理系統</a>

      <div class="navbar-collapse collapse">
        <ul class="navbar-nav ml-auto">
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
    </nav>

    <!-- 2. 側邊抽屜 -->
    <div class="d-flex">
      <div class="sidebar sidebar-dark bg-dark">
        <!--  2.* 無樣式清單 -->
        <ul class="list-unstyled">
          <!--  2.1 儀表板-->
          <li>
            <a href="#">
              <i class="fas fa-tachometer-alt"></i>
              儀表板
            </a>
          </li>

          <!--  2.2 個案管理-->
          <li>
            <a href="#care_manager" data-toggle="collapse">
              <i class="fas fa-briefcase-medical"></i>
              個案管理
            </a>
            <ul id="care_manager" class="list-unstyled collapse">
              <li>
                <!--  2.2.1  個案新增精靈-->
                <a href="#">
                  <i class="fas fa-file-medical"></i>
                  新增受術者精靈
                </a>
              </li>
              <!--  2.2.2  列示所有個案-->
              <li>
                <a href="#">
                  <i class="fas fa-copy"></i>
                  列示所有個案
                </a>
              </li>
              <!--  2.2.3  個案組態管理-->
              <li>
                <a href="#">
                  <i class="fas fa-users-cog"></i>
                  個案組態管理
                </a>
              </li>
            </ul>
          </li>
          <!--  2.2 End for 個案管理系統-->

          <!--  2.3  實驗室管理-->
          <li>
            <a href="#lab_manager" data-toggle="collapse">
              <i class="fas fa-vials"></i>
              實驗室管理
            </a>
            <ul id="lab_manager" class="list-unstyled collapse">
              <li>
                <!--  2.3.1  冷凍管理-->
                <a href="#">
                  <i class="fas fa-microscope"></i>
                  冷凍管理
                </a>
              </li>
              <!--  2.3.2  環境監控-->
              <li>
                <a href="#">
                  <i class="fas fa-file-video"></i>
                  環境監控
                </a>
              </li>
              <!--  2.2.3  數據管理-->
              <li>
                <a href="#">
                  <i class="fas fa-database"></i>
                  數據管理
                </a>
              </li>
            </ul>
          </li>
          <!--  2.3 End for 實驗室管理-->

          <!--  2.4 上傳報表作業-->
          <li>
            <a href="#report_manager" data-toggle="collapse">
              <i class="fas fa-file-upload"></i>
              上傳報表作業
            </a>
            <ul id="report_manager" class="list-unstyled collapse">
              <li>
                <!--  2.4.1  上傳作業-->
                <a href="#">
                  <i class="fas fa-upload"></i>
                  上傳作業
                </a>
              </li>
              <!--  2.4.2  報表作業-->
              <li>
                <a href="#">
                  <i class="fas fa-print"></i>
                  報表作業
                </a>
              </li>
            </ul>
          </li>
          <!--  2.4 End for 上傳報表作業-->

          <!--  2.5 平台管理作業-->
          <li>
            <a href="#platform_manager" data-toggle="collapse">
              <i class="fas fa-layer-group"></i>
              平台管理作業
            </a>
            <ul id="platform_manager" class="list-unstyled collapse">
              <li>
                <!--  2.5.1  使用者管理-->
                <a href="#">
                  <i class="fas fa-users-cog"></i>
                  使用者管理
                </a>
              </li>

              <!--  2.5.2  帳號管理-->
              <li>
                <a href="#">
                  <i class="fas fa-user"></i>
                  帳號管理
                </a>
              </li>

              <!--  2.5.3  組織管理-->
              <li>
                <a href="#">
                  <i class="fas fa-hospital"></i>
                  組織管理
                </a>
              </li>

              <!--  2.5.4  組態設定-->
              <li>
                <a href="#">
                  <i class="fas fa-cogs"></i>
                  組態設定
                </a>
              </li>
            </ul>
          </li>
          <!--  2.5 End for 平台管理作業-->

          <!--  2.6 關於我們-->
          <li>
            <a href="#">
              <i class="fas fa-user-tie"></i>
              關於我們
            </a>
          </li>
          <!--  2.6 End for 關於我們-->
        </ul>
        <!--  2.* End for 無樣式清單 -->
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


<style scoped>
.img-responsive {
  height: 15px;
  width: 15px;
}
</style>

