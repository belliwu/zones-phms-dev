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
      email: null   // Include email and password of user
    },
    feedback: null
  },

  //2. Store any data into State Object , have to by mutation
  mutations: {
    // Store idToken and userId after signup
    authUser(state, authData)
    {
      state.user.jwtToken = authData.jwtToken;
      state.user.jwtUserId = authData.jwtUserId;
      state.user.userId = authData.userId;
    },

    // Store all user information
    storeUser(state, user)
    {
      state.user = user;
    },

    feedback(state, myFeedback)
    {
      state.feedback = myFeedback;
    },

    resetFeedback(state)
    {
      state.feedback = null;
    },

    clearAuthData(state)
    {
      state.user.jwtToken = null;
      state.user.jwtUserId = null;
      state.user.userId = null;
      state.user.email = null;
    },

    clearLoginData(state)
    {
      state.user.userId = null;
      state.user.email = null;
    }
  },

  //3. Provide interfaces to store data into State Object for application
  actions: {
    signup({ commit, dispatch }, signupData)
    {
      axios
        .post("/signupNewUser?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI", {
          email: signupData.email,
          password: signupData.password,
          returnSecureToken: true
        })
        .then(response =>
        {
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
        .catch(error =>
        {
          let myError = error.response.data.error;
          console.log("BELLIWU>>> 2. Firebase error code : ", myError.code);
          console.log("BELLIWU>>> 2. Firebase error message : ", myError.message);

          commit("feedback", "帳號已存在， 請重新登錄 !");
        });
    },

    // Store signupData to remote AccountMngr microservice
    signupUser({ commit, state }, signupData)
    {
      if (!state.user.jwtToken)
      {
        console.log("BELLIWU>>> 5. SignupUser jwtToken is NULL");
        return;
      }
      console.log(
        "BELLIWU>>> 5. SignupUser FIRE api '/user/signup/signupData' ..."
      );
      globalAxios
        .post("/user/signup", signupData)
        .then(response =>
        {
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
        .catch(error =>
        {
          console.log("BELLIWU>>> 6. User signup RESPONSE : ", error);
          commit("feedback", "系統或網路故障，客服電話: 02-6607-2992");
        });
    },

    login({ commit, dispatch }, loginData)
    {
      axios
        .post("/verifyPassword?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI", {
          email: loginData.email,
          password: loginData.password,
          returnSecureToken: true
        })
        .then(response =>
        {
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
    activeUser({ commit, state }, loginData)
    {
      if (!state.user.jwtToken)
      {
        console.log("BELLIWU>>> 2. Login ActiveUser() jwtToken is NULL");
        return;
      }

      globalAxios
        .post("/user/login", loginData)
        .then(response =>
        {
          console.log("BELLIWU>>> 3. AccountMngr Login RESPONSE: ", response);
          let data = response.data;
          if (data.cause === "no_signup")
          {
            commit("feedback", "你還沒有註冊, 請註冊 !");
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
        .catch(error =>
        {
          console.log("BELLIWU>>> 3. Login User RESPONSE : ", error);
          commit("feedback", "系統或網路故障，客服電話: 02-6607-2992");
        });
    }, //for activeUser

    logout({ commit, state })
    {
      console.log(
        "BELLIWU>>> 1. Submit Logout with param : ",
        state.user.email
      );
      globalAxios
        .post("/user/logout/", { email: state.user.email })
        .then(response =>
        {
          console.log("BELLIWU>>> 2. Logout RESPONSE : ", response);

          commit("clearLoginData");
          commit("resetFeedback");

          //Redirect to Login page
          router.replace("/login");
          console.log("BELLIWU>>> 3. Redirect to LOGIN page");
        })
        .catch(error => console.log(error));
    },

    delUser({ commit, state })
    {
      axios
        .post("/deleteAccount?key=AIzaSyAwO0lOWwdLbSEyQDz5N9AJKuBIKRbpuBI", {
          idToken: state.user.jwtToken
        })
        .then(response =>
        {
          console.log("BELLIWU>>> 1. DeletUser RESPONSE from firebase : ", response);

          console.log(
            "BELLIWU>>> 2. Ready fire Delete User API to AccountMngar with parameter : ",
            state.user.email
          );

          globalAxios
            .delete("/user", { data: { email: state.user.email } })
            .then(response =>
            {
              console.log("BELLIWU>>> 3. Delete User response", response);
              commit("clearAuthData");
              commit("resetFeedback");
            })
            .catch(error =>
            {
              console.log("BELLIWU>>> 3. Delete User response", error);
              // commit("feedback", error)
            });

          console.log("BELLIWU>>> 4. Clear Auth Data");
          commit("clearAuthData");

          console.log("BELLIWU>>> 5. Redirect Singup Page");
          router.replace("/signup");
        })
        .catch(error =>
        {
          let myError = error.response.data.error;
          console.log("BELLIWU>>> 1. Firebase error code : ", myError.code);
          console.log("BELLIWU>>> 1. Firebase error message : ", myError.message);

          //Redirect to Login page
          router.replace("/login");
          console.log("BELLIWU>>> 3. Redirect to LOGIN page");
        });
    },

    // Called for Dashboard
    fetchUser({ commit, state })
    {
      if (!state.user.jwtToken)
      {
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
        .then(response =>
        {
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
    user(state)
    {
      return state.user;
    },

    isAuthenticated(state)
    {
      return state.user.jwtToken !== null && state.user.email !== null;
    },

    feedback(state)
    {
      return state.feedback;
    },
  }
});
