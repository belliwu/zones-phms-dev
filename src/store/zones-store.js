import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios/zones-firebase.js";
import globalAxios from "axios";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  //1. State Object is vuex core
  //userProfile is defined as below
  // jwtToken, jwtUserid, userId, email, active
  state: {
    user: {
      jwtToken: null, // login OK , firebase will return IdToken
      jwtUserId: null, // firebase Authentication useId
      userId: null, // Accountmngr userId
      email: null // Include email and password of user
    },
    feedback: null
  },

  //2. Store any data into State Object , have to by mutation
  mutations: {
    // Store idToken and userId after signup
    authUser(state, authData) {
      state.user.jwtToken = authData.jwtToken;
      state.user.jwtUserId = authData.jwtUserId;
      state.user.userId = authData.userId;
    },

    // Store all user information
    storeUser(state, user) {
      state.user = user;
    },

    feedback(state, myFeedback) {
      state.feedback = myFeedback;
    },

    clearAuthData(state) {
      state.user.jwtToken = null;
      state.user.jwtUserId = null;
      state.user.userId = null;
      state.user.email = null;
    }
  },

  //3. Provide interfaces to store data into State Object for application
  actions: {
    signup({ commit, dispatch }, signupData) {
      commit("clearAuthData");
      axios
        .post("/signupNewUser?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI", {
          email: signupData.email,
          password: signupData.password,
          returnSecureToken: true
        })
        .then(response => {
          console.log("BELLIWU>>> 2. Singup RESPONSE : ", response);

          // Store idToken and userId of firebase into State.user Object
          console.log(
            "BELLIWU>>> 3. Signup.authUser() to store state.user ..."
          );
          commit("authUser", {
            jwtToken: response.data.idToken, //from firebase idToken
            jwtUserId: response.data.localId //from firebase userId
          });

          signupData.token = response.data.idToken;

          console.log("BELLIWU>>> 4. Ready dispatch Signup user ...");
          // Store signupData to Remote AccountMngr microservice
          dispatch("signupUser", signupData);
        })
        .catch(error => console.log(code));
    },

    // Store signupData to remote AccountMngr microservice
    signupUser({ commit, state }, signupData) {
      if (!state.user.jwtToken) {
        console.log("BELLIWU>>> 5. SignupUser jwtToken is NULL");
        return;
      }
      console.log(
        "BELLIWU>>> 5. SignupUser FIRE api '/user/signup/signupData' ..."
      );
      globalAxios
        .post("/user/signup", signupData)
        .then(response => {
          console.log("BELLIWU>>> 6. SingupUser RESPONSE : ", response);
          console.log(
            "BELLIWU>>> 7. SingupUser RESPONSE userId : ",
            response.data.userId
          );
          commit("authUser", {
            jwtToken: signupData.token, //from firebase idToken
            jwtUserId: state.user.jwtUserId, //from firebase userId
            userId: response.data.userId //from AccountMngr userId
          });

          //Redirect to Dashboard page
          router.replace("/dashboard");
          console.log("BELLIWU>>> 8. Redirect to Dashboard page");
        })
        .catch(error => console.log(error));
    },

    login({ commit, dispatch }, loginData) {
      axios
        .post("/verifyPassword?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI", {
          email: loginData.email,
          password: loginData.password,
          returnSecureToken: true
        })
        .then(response => {
          console.log("BELLIWU>>> 1. Firebase Login RESPONSE : ", response);
          commit("authUser", {
            jwtToken: response.data.idToken,
            jwtUserId: response.data.localId
          });
          dispatch("activeUser", loginData);
        })
        .catch(error => console.log(error));
    },

    // Active user for AccountManager
    activeUser({ commit, state }, loginData) {
      if (!state.user.jwtToken) {
        console.log("BELLIWU>>> 2. Login ActiveUser() jwtToken is NULL");
        return;
      }

      globalAxios
        .post("/user/login", loginData)
        .then(response => {
          console.log("BELLIWU>>> 3. AccountMngr Login RESPONSE: ", response);
          let data = response.data;
          if (data.cause === "no_signup") {
            let myFeedback = "你還沒有註冊, 請註冊 !";
            commit("feedback", myFeedback);
            commit("clearAuthData");
            router.replace("/signup");
            return;
          }
          let user = {
            jwtToken: data.token,
            jwtUserId: null,
            userId: data.userId,
            email: data.email
          }; // Accountmngr userId // Include email and password of user
          commit("storeUser", user);
          console.log("BELLIWU>>> 4. Store user login information");

          // //Redirect to DASHBOARD page
          router.replace("/dashboard");
          console.log("BELLIWU>>> 5. Redirect to dashboard page");
        })
        .catch(error => {
          console.log(error);
        });
    }, //for activeUser

    logout({ commit, state }) {
      console.log("BELLIWU>>> 1 Submit Logout with param : ", state.user.email);
      globalAxios
        .post("/user/logout/", { email: state.user.email })
        .then(response => {
          console.log("BELLIWU>>> 2. Logout RESPONSE : ", response);

          commit("clearAuthData");

          //Redirect to Login page
          router.replace("/login");
          console.log("BELLIWU>>> 3. Redirect to LOGIN page");
        })
        .catch(error => console.log(error));
    },

    // Called for Dashboard
    fetchUser({ commit, state }) {
      if (!state.user.jwtToken) {
        console.log(
          "BELLIWU>>> 1. Dashboard fetchUser() state.user.jwtToken == NULL"
        );
        return;
      }
      console.log(
        "BELLIWU>>> 1. Dashboard fetchUser() state.user.userId :",
        state.user.userId
      );
      globalAxios
        .get("/user/" + state.user.userId)
        .then(response => {
          console.log(
            "BELLIWU>>> 2.  Fetch User by userId response : ",
            response
          );
          const data = response.data;
          const user = {
            jwtToken: state.user.jwtToken,
            jwtUserId: state.user.jwtUserId,
            userid: data.id,
            email: data.email,
            password: data.password,
            active: data.active
          };
          console.log("BELLIWU>>> 3. Fetch User data : ", user);

          commit("storeUser", user);
        })
        .catch(error => console.log("BELLIWU>>> ", error));
    } // fir fetchUser
  }, //for actions

  getters: {
    user(state) {
      return state.user;
    },

    isAuthenticated(state) {
      return state.user.jwtToken !== null;
    },

    feedback(state) {
      return state.feedback;
    }
  }
});
