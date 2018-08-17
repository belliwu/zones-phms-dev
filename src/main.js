// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import axios from "axios";
axios.defaults.baseURL = "https://tmuh-arms-6b123.firebaseio.com";
// import store from "./store/firebase-store";

// Import relatvie CSS files
require("static/css/bootstrap.min.css");
require("static/css/bootadmin.min.css");
require("static/css/all.css");
require("static/css/datatables.min.css");
require("static/css/fullcalendar.min.css");

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
