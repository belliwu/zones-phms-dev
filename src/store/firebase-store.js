import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios/axios-firebase.js";
import globalAxios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
  //1. State Object is vuex core
  state: {
    idToken: null, //login OK , firebase will return IdToken
    userId: null, //firebase databaser user record Id
    user: null
  },

  //2. Store any data into State Object , have to by mutation
  mutations: {
    // Store idToken and userId after signup
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    // Store all user information
    storeUser(state, user) {
      state.user = user;
    },

    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },

  //3. Provide interfaces to store data into State Object for application
  actions: {
    signup({ commit, dispatch }, signupData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/signupNewUser?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI", {
            email: signupData.email,
            password: signupData.password,
            returnSecureToken: true
          })
          .then(response => {
            console.log("BELLIWU>>> 1. Singup response : ", response);

            // Store idToken and userId into State Object
            console.log("BELLIWU>>> 2. authUser() to store state ...");
            commit("authUser", {
              token: response.data.idToken,
              userId: response.data.localId
            });

            // Store signupData into firebase
            dispatch("storeUser", signupData);

            console.log("BELLIWU>>> 3. Singup Promise resolve");
            resolve();
          })
          .catch(error => {
            console.log("BELLIWU>>> 3. Singup Promise reject: ", error);
            reject();
          });
      });
    },

    login({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/verifyPassword?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI", {
            email: loginData.email,
            password: loginData.password,
            returnSecureToken: true
          })
          .then(response => {
            console.log("BELLIWU>>> 1. Login response : ", response);
            commit("authUser", {
              token: response.data.idToken,
              userId: response.data.localId
            });
            console.log("BELLIWU>>> 2. Login Promise resolve");
            resolve();
          })
          .catch(error => {
            console.log("BELLIWU>>> 3. Login Promise reject: ", error);
            reject();
          });
      });
    },

    logout({ commit }) {
      commit("clearAuthData");
      console.log("BELLIWU>>> 1. Commit logout action");
      // Have to setup user active="false" in sprongboot
    },

    storeUser({ commit, state }, userData) {
      if (!state.idToken) return;
      console.log("BELLIWU>>> Signup storeUser() -> state.idToken");
      globalAxios
        .post("/users.json" + "?auth=" + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },

    fetchUser({ commit, state }) {
      console.log("BELLIWU>>> 1. Dashboard fetchUser() -> state.idToken");
      if (!state.idToken) return;
      globalAxios
        .get("/users.json" + "?auth=" + state.idToken)
        .then(res => {
          console.log("BELLIWU>>> 2.  Fetch Users response : ", res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log("BELLIWU>>> 3. Fetch Users data : ", users);

          // Bug : user[0] all fetch first user from firebase.
          // But It wull be not same user if exist many users
          commit("storeUser", users[0]);
        })
        .catch(error => console.log("BELLIWU>>> ", error));
    }
  },

  //4. Provide interfaces to access data into State Object for application
  getters: {
    user(state) {
      return state.user;
    },

    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
});

export default store;
