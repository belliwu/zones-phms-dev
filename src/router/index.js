import Vue from "vue";
import Router from "vue-router";

import Home from "pages/layout/Home";
import Admin from "@/components/Admin";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin
    }
  ]
});
