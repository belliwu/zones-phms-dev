import Vue from "vue";
import Router from "vue-router";
import store from "@/store/firebase-store";

import Login from "@/components/auth/firebase/Login";
import Signup from "@/components/auth/firebase/Signup";
import Dashboard from "@/views/pages/Dashboard";
import Error404 from "views/common/Error404";
import Inbuilding from "views/common/Inbuilding";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      redirect: {
        name: "Login"
      }
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
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
      // beforeEnter(to, from, next) {
      //   if (store.state.idToken) next(); //for firebase
      //   else next("/login");
      // }
    }
  ]
});
