// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import store from "@/store/zones-store";

// NOTE: JWT Server uses axios.baseURL and Backend Server uses
// axiox.defaults.baseUTL.
// axios.defaults.baseURL = "https://tmuh-arms-6b123.firebaseio.com";
axios.defaults.baseURL = "http://localhost:8081";

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
  store,
  components: { App },
  template: "<App/>"
});
