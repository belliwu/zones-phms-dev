import Vue from "vue";
import Router from "vue-router";

import Home from "views/layout/Home";
import Admin from "@/components/test/Admin";
import Login from "@/components/auth/firebase/Login";
import Signup from "@/components/auth/firebase/Signup";
import Error404 from "views/common/Error404";
import Inbuilding from "views/common/Inbuilding";

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
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "*",
      name: "Inbuilding",
      hidden: true,
      component: Inbuilding
    },
    {
      path: "/404*",
      name: "404",
      hidden: true,
      component: Error404
    }
  ]
});
